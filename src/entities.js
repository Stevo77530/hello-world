import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";

export class Enemy {
  constructor({ scene, pos, speed = 2.1, hp = 45, color = 0x894646, boss = false }) {
    this.scene = scene;
    this.speed = speed;
    this.hp = hp;
    this.maxHp = hp;
    this.attackCooldown = 0;
    this.isBoss = boss;
    this.alive = true;

    this.group = new THREE.Group();
    this.group.position.copy(pos);

    if (boss) {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 4.2, 1.6),
        new THREE.MeshStandardMaterial({ color: 0x746460, roughness: 0.95 })
      );
      body.position.y = 2.1;
      const hat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0xe8e8e8 })
      );
      hat.position.y = 4.65;
      const tie = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 1.2, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x2d2d2d })
      );
      tie.position.set(0, 2.3, 0.87);
      const clipboard = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 1.1, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x4f3f34 })
      );
      clipboard.position.set(1.15, 2.3, 0.35);
      this.group.add(body, hat, tie, clipboard);
    } else {
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.6, 0.45),
        new THREE.MeshStandardMaterial({ color, roughness: 0.88 })
      );
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0x9b8a72, roughness: 0.8 })
      );
      torso.position.y = 1;
      head.position.y = 2;
      this.group.add(torso, head);
    }

    this.scene.add(this.group);
  }

  hit(amount) {
    if (!this.alive) return false;
    this.hp -= amount;
    if (this.hp <= 0) {
      this.alive = false;
      this.group.visible = false;
      this.scene.remove(this.group);
      return true;
    }
    return false;
  }

  update(dt, playerPos) {
    if (!this.alive) return { didAttack: false, kind: null };

    const toPlayer = new THREE.Vector3().subVectors(playerPos, this.group.position);
    const dist = toPlayer.length();
    if (dist > 0.4) {
      toPlayer.normalize();
      this.group.position.addScaledVector(toPlayer, this.speed * dt);
    }
    this.group.lookAt(playerPos.x, this.group.position.y, playerPos.z);

    this.attackCooldown -= dt;
    if (dist < (this.isBoss ? 4.8 : 1.75) && this.attackCooldown <= 0) {
      if (this.isBoss) {
        const roll = Math.random();
        this.attackCooldown = 1.35;
        if (roll < 0.25) return { didAttack: true, kind: "Clipboard Slam", damage: 16 };
        if (roll < 0.5) return { didAttack: true, kind: "Ratchet Lash", damage: 11 };
        if (roll < 0.75) return { didAttack: true, kind: "Chain Sweep", damage: 14 };
        return { didAttack: true, kind: "Static Burst", damage: 10 };
      }
      this.attackCooldown = 0.95;
      return { didAttack: true, kind: "Melee", damage: 8 };
    }

    return { didAttack: false, kind: null };
  }
}

export function makePickup(scene, position, type = "ammo") {
  const color = type === "ammo" ? 0xe8b64c : 0x58be80;
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2 })
  );
  mesh.position.copy(position);
  mesh.position.y = 0.55;
  mesh.userData = { type, active: true };
  scene.add(mesh);
  return mesh;
}
