# PROJECT_NOTES

## Implemented Features
- Single-level FPS prototype in browser with first-person camera and pointer-lock controls.
- Locked intro sequence matching requested narrative beats and tone.
- Objective updates that guide player from cabin to boss arena.
- Shotgun combat loop with ammo, reload, damage, and enemy hit logic.
- Health system with death state + restart.
- Dock Corrupted basic AI that chases and attacks.
- One pickup type each for ammo and health.
- Boss encounter: **The Personnel Manager** with intro intercom lines, gate event, multiple attack labels, and death line.
- Win state after boss defeat and crossing the gate.
- Environmental signal phrases embedded as signs and HUD glitches.

## Placeholder / Temporary Implementation
- Enemy and boss visuals are primitive geometry (box/sphere/cylinder composites).
- Audio is generated placeholder tones/noise, not authored SFX or VO.
- Collision is lane/bounds-based, not full navmesh or robust physics.
- Weapon uses simplified ray/spread logic without pellet simulation or decals.
- Boss attacks are state labels + damage patterns, not unique animation rigs.

## Build Next (Suggested)
1. Replace placeholder sounds with real SFX and voiced/subtitled lines.
2. Add proper collision mesh and interactable doors/hatches.
3. Upgrade enemy pathing with obstacle avoidance.
4. Implement muzzle flash, hit reactions, and boss telegraph VFX.
5. Add level lighting pass (volumetric fog, flickers, stronger atmosphere).
6. Expand HUD messaging/intercom sequencing system.
7. Add minimal save/checkpoint at boss gate.
