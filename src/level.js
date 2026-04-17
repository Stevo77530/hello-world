import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";

const phrases = [
  "NO CREW CHANGE",
  "CREW CHANGE DENIED",
  "RELIEF UNAVAILABLE",
  "CAPTAIN REMAINS ABOARD",
  "RETURN TO VESSEL",
  "HOME STATUS: REVOKED",
  "TRANSIT INTERRUPTED",
  "ROUTE INVALID",
];

function makeFloor(scene, width, depth, x, z, color = 0x20242a) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.2, depth),
    new THREE.MeshStandardMaterial({ color, roughness: 0.95 })
  );
  mesh.position.set(x, -0.1, z);
  scene.add(mesh);
}

function makeWall(scene, width, height, depth, x, y, z, color = 0x2b3138) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({ color, roughness: 0.9 })
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
}

function addSign(scene, text, x, y, z) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#d9a247";
  ctx.font = "bold 42px sans-serif";
  ctx.fillText(text, 16, 78);
  const tex = new THREE.CanvasTexture(canvas);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 1),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
}

export function buildLevel(scene) {
  makeFloor(scene, 16, 16, 0, 0, 0x262d32); // cabin
  makeWall(scene, 16, 3, 0.3, 0, 1.5, -8);
  makeWall(scene, 16, 3, 0.3, 0, 1.5, 8);
  makeWall(scene, 0.3, 3, 16, -8, 1.5, 0);

  makeFloor(scene, 14, 8, 16, 0, 0x1c2227); // corridor
  makeWall(scene, 0.3, 3, 8, 9, 1.5, 0);
  makeWall(scene, 0.3, 3, 8, 23, 1.5, 0);

  makeFloor(scene, 22, 16, 37, 0, 0x304149); // deck
  makeWall(scene, 2, 1.6, 16, 26, 0.8, 0, 0x55656f);
  addSign(scene, "RETURN TO VESSEL", 31, 2.4, -6.5);

  makeFloor(scene, 12, 10, 56, -4, 0x3b474f); // gangway lower
  makeFloor(scene, 80, 24, 98, -4, 0x313135); // dock yard

  for (let i = 0; i < 12; i++) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 2 + Math.random() * 4, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x3d3a37, roughness: 0.97 })
    );
    box.position.set(72 + Math.random() * 52, box.geometry.parameters.height / 2 - 4, -10 + Math.random() * 20);
    scene.add(box);
  }

  const gate = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 6, 20),
    new THREE.MeshStandardMaterial({ color: 0x555a63, roughness: 0.8 })
  );
  gate.position.set(138, -1, 0);
  scene.add(gate);

  addSign(scene, "CREW CHANGE DENIED", 15, 2.5, 3.7);
  addSign(scene, "RELIEF UNAVAILABLE", 41, 2.3, 6.8);
  addSign(scene, "CAPTAIN REMAINS ABOARD", 77, 2.6, -8.5);
  addSign(scene, "HOME STATUS: REVOKED", 113, 2.6, 8.5);

  const boundaries = { minX: -6.5, maxX: 162, minZ: -11.5, maxZ: 11.5, minY: -4, maxY: 2.5 };

  const triggers = [
    { x: 7, objective: "Reach the corridor and find deck access" },
    { x: 28, objective: "Push through the hatch to the deck" },
    { x: 49, objective: "Cross the gangway to dock level" },
    { x: 67, objective: "Survive first contact on the dock" },
    { x: 96, objective: "Move through the yard to the exit gate" },
    { x: 132, objective: "Get through the gate" },
  ];

  return { gate, triggers, phrases, boundaries };
}
