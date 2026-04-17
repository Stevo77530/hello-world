import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import { UI } from "./ui.js";
import { beep, shotgunRack, staticBurst } from "./audio.js";
import { buildLevel } from "./level.js";
import { Enemy, makePickup } from "./entities.js";

const root = document.getElementById("game-root");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07090b);
scene.fog = new THREE.Fog(0x07090b, 20, 180);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
root.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0x92a3b8, 0x1d2228, 0.8);
scene.add(light);
const dir = new THREE.DirectionalLight(0xe7d6bc, 0.38);
dir.position.set(25, 30, -10);
scene.add(dir);

const player = {
  pos: new THREE.Vector3(0, 1.65, 0),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  speed: 8,
  hp: 100,
  ammoLoaded: 6,
  ammoReserve: 24,
  canShootAt: 0,
  reloadUntil: 0,
  state: "intro",
};

const keys = {};
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
let level;
let pointerLocked = false;
let paused = false;
let bossSpawned = false;
let bossDefeated = false;
let winShown = false;

const enemies = [];
const pickups = [];
const objectiveTriggers = new Set();

function setupWorld() {
  level = buildLevel(scene);

  enemies.push(
    new Enemy({ scene, pos: new THREE.Vector3(74, -3, -1), speed: 2.2 }),
    new Enemy({ scene, pos: new THREE.Vector3(85, -3, 4), speed: 1.8 }),
    new Enemy({ scene, pos: new THREE.Vector3(100, -3, -6), speed: 2.3 })
  );

  pickups.push(makePickup(scene, new THREE.Vector3(58, -4, -2), "ammo"));
  pickups.push(makePickup(scene, new THREE.Vector3(106, -4, 7), "health"));
}

function setCamera() {
  camera.position.copy(player.pos);
  camera.rotation.order = "YXZ";
  camera.rotation.y = player.yaw;
  camera.rotation.x = player.pitch;
}

function attemptShoot() {
  const t = performance.now();
  if (t < player.canShootAt || t < player.reloadUntil || player.state !== "playing") return;
  if (player.ammoLoaded <= 0) {
    UI.subtitle("*click* Out of shells.");
    beep({ freq: 130, duration: 0.07, gain: 0.03 });
    player.canShootAt = t + 200;
    return;
  }

  player.ammoLoaded -= 1;
  UI.setAmmo(player.ammoLoaded, player.ammoReserve);
  beep({ freq: 210, duration: 0.05, type: "sawtooth", gain: 0.07 });
  beep({ freq: 90, duration: 0.1, type: "triangle", gain: 0.05, when: 0.02 });
  player.canShootAt = t + 680;

  const dirV = new THREE.Vector3();
  camera.getWorldDirection(dirV);
  raycaster.set(player.pos, dirV);
  for (const e of enemies) {
    if (!e.alive) continue;
    const toEnemy = new THREE.Vector3().subVectors(e.group.position, player.pos);
    const dist = toEnemy.length();
    if (dist > 22) continue;
    const angle = dirV.angleTo(toEnemy.normalize());
    if (angle < 0.18 + Math.random() * 0.08) {
      const dmg = e.isBoss ? 12 + Math.random() * 6 : 26 + Math.random() * 8;
      const died = e.hit(dmg);
      if (died) {
        UI.signal(e.isBoss ? "PERSONNEL MANAGER TERMINATED" : "Dock Corrupted down", 1300);
        if (e.isBoss) {
          bossDefeated = true;
          UI.subtitle('The Personnel Manager: "Fine... cover your own shift..."', 3000);
          UI.setObjective("Reach the road and escape");
        }
      }
    }
  }
}

function reload() {
  if (player.state !== "playing") return;
  if (player.ammoLoaded >= 6 || player.ammoReserve <= 0) return;
  const t = performance.now();
  if (t < player.reloadUntil) return;
  player.reloadUntil = t + 1400;
  UI.subtitle("Reloading...");
  beep({ freq: 330, duration: 0.05, gain: 0.04 });
  setTimeout(() => {
    const needed = 6 - player.ammoLoaded;
    const moved = Math.min(needed, player.ammoReserve);
    player.ammoLoaded += moved;
    player.ammoReserve -= moved;
    UI.setAmmo(player.ammoLoaded, player.ammoReserve);
    shotgunRack();
  }, 1350);
}

function damagePlayer(amount, text = "") {
  player.hp -= amount;
  UI.setHealth(player.hp);
  UI.damageFlash();
  if (text) UI.subtitle(text, 1000);
  if (player.hp <= 0) {
    player.state = "dead";
    UI.setOverlay("You were kept aboard forever. Press ENTER to restart.", true);
    UI.showHUD(false);
    document.exitPointerLock();
  }
}

function spawnBoss() {
  if (bossSpawned) return;
  bossSpawned = true;
  UI.subtitle('Intercom: "Your crew change request has been reviewed."', 2400);
  setTimeout(() => UI.subtitle('Intercom: "We\'re short-handed, so fuck you."', 2500), 2300);
  setTimeout(() => {
    level.gate.position.x = 138;
    enemies.push(new Enemy({ scene, pos: new THREE.Vector3(146, -3, 0), hp: 290, speed: 1.5, boss: true, color: 0x6f5b52 }));
    UI.setObjective("Defeat The Personnel Manager");
  }, 4000);

  const openAnim = setInterval(() => {
    if (level.gate.position.x < 141.5) level.gate.position.x += 0.2;
  }, 35);
  setTimeout(() => {
    clearInterval(openAnim);
    const close = setInterval(() => {
      if (level.gate.position.x > 138) level.gate.position.x -= 0.25;
      else clearInterval(close);
    }, 35);
  }, 2900);
}

function handlePickups() {
  for (const p of pickups) {
    if (!p.userData.active) continue;
    p.rotation.y += 0.02;
    if (p.position.distanceTo(player.pos) < 1.3) {
      p.userData.active = false;
      p.visible = false;
      if (p.userData.type === "ammo") {
        player.ammoReserve += 12;
        UI.signal("Picked up shells (+12)");
      } else {
        player.hp = Math.min(100, player.hp + 35);
        UI.signal("Field med-kit applied");
      }
      UI.setHealth(player.hp);
      UI.setAmmo(player.ammoLoaded, player.ammoReserve);
      beep({ freq: 520, duration: 0.06, gain: 0.03 });
    }
  }
}

function updateObjectiveFromPosition() {
  for (const t of level.triggers) {
    if (!objectiveTriggers.has(t.x) && player.pos.x > t.x) {
      objectiveTriggers.add(t.x);
      UI.setObjective(t.objective);
      const phrase = level.phrases[Math.floor(Math.random() * level.phrases.length)];
      UI.signal(phrase, 1800);
    }
  }
}

function updateEnemies(dt) {
  for (const e of enemies) {
    const result = e.update(dt, player.pos);
    if (!result.didAttack) continue;
    if (e.isBoss) {
      if (result.kind === "Static Burst") staticBurst();
      UI.subtitle(`The Personnel Manager: ${result.kind}!`, 900);
      damagePlayer(result.damage, "SYSTEM SHOCK");
    } else {
      if (Math.random() < 0.15) {
        const lines = ["No crew change...", "Remain aboard...", "Stay... aboard..."];
        UI.subtitle(`Dock Corrupted: ${lines[Math.floor(Math.random() * lines.length)]}`, 1000);
      }
      damagePlayer(result.damage);
    }
  }
}

function updateMovement(dt) {
  const move = new THREE.Vector3();
  if (keys.KeyW) move.z -= 1;
  if (keys.KeyS) move.z += 1;
  if (keys.KeyA) move.x -= 1;
  if (keys.KeyD) move.x += 1;
  move.normalize();

  const forward = new THREE.Vector3(Math.sin(player.yaw), 0, Math.cos(player.yaw));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);

  player.vel.set(0, 0, 0);
  player.vel.addScaledVector(forward, -move.z * player.speed * dt);
  player.vel.addScaledVector(right, move.x * player.speed * dt);
  player.pos.add(player.vel);

  // Keep player in playable lane.
  player.pos.x = THREE.MathUtils.clamp(player.pos.x, level.boundaries.minX, level.boundaries.maxX);
  player.pos.z = THREE.MathUtils.clamp(player.pos.z, level.boundaries.minZ, level.boundaries.maxZ);
  player.pos.y = player.pos.x < 52 ? 1.65 : -2.35;
}

function maybeWin() {
  if (winShown || !bossDefeated) return;
  if (player.pos.x > 152) {
    winShown = true;
    player.state = "won";
    UI.setOverlay("LEVEL CLEAR: OFF THE BOAT. Press ENTER to play again.", true);
    UI.showHUD(false);
    document.exitPointerLock();
  }
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.033);

  if (player.state === "playing" && !paused) {
    updateMovement(dt);
    updateObjectiveFromPosition();
    updateEnemies(dt);
    handlePickups();
    if (player.pos.x > 132 && !bossSpawned) spawnBoss();
    maybeWin();
  }

  setCamera();
  renderer.render(scene, camera);
}

function resetRun() {
  window.location.reload();
}

async function runIntro() {
  UI.setOverlay("Incoming call...");
  const sequence = [
    ["Woman: Something's wrong...", 1700],
    ["Woman: Hurry... come home...", 1700],
    ["[Call fractures into static]", 1300],
    ["[Dead dial tone]", 1200],
    ["Whisper: You're never making crew change, Captain.", 2000],
    ["Capt. Stevo: What the fuck?", 1300],
    ["[Something shatters outside the boat]", 1300],
    ["[Stevo racks his shotgun]", 1200],
  ];

  for (const [line, wait] of sequence) {
    UI.subtitle(line, wait - 150);
    if (line.includes("static")) staticBurst();
    if (line.includes("racks")) shotgunRack();
    await new Promise((r) => setTimeout(r, wait));
  }

  UI.setOverlay("GET OFF THE BOAT", false);
  UI.showHUD(true);
  UI.setObjective("GET OFF THE BOAT");
  player.state = "playing";
  beep({ freq: 280, duration: 0.09, gain: 0.06 });
  requestPointer();
}

function requestPointer() {
  renderer.domElement.requestPointerLock();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener("mousemove", (e) => {
  if (!pointerLocked || paused || player.state !== "playing") return;
  const sens = 0.002;
  player.yaw -= e.movementX * sens;
  player.pitch -= e.movementY * sens;
  player.pitch = THREE.MathUtils.clamp(player.pitch, -1.45, 1.45);
});

document.addEventListener("pointerlockchange", () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
  if (player.state === "playing" && !pointerLocked) {
    paused = true;
    UI.setOverlay("Paused. Click to resume.", true);
  }
});

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "KeyR") reload();
  if (e.code === "KeyP" && player.state === "playing") {
    paused = !paused;
    UI.setOverlay(paused ? "Paused. Click to resume." : "", paused);
  }
  if (e.code === "Enter" && (player.state === "dead" || player.state === "won")) resetRun();
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

document.addEventListener("mousedown", () => {
  if (player.state === "intro") {
    player.state = "intro-running";
    runIntro();
    return;
  }

  if (player.state === "playing" && !pointerLocked) {
    paused = false;
    UI.setOverlay("", false);
    requestPointer();
    return;
  }

  if (player.state === "playing") attemptShoot();
});

setupWorld();
setCamera();
animate();
