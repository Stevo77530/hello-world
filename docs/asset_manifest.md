# Asset Manifest (Staged) — Capt. Stevo’s Crewchange

## Purpose
Track practical asset needs for the Level 1 vertical slice, separating immediate placeholder requirements from later production assets.

## Stage A — Placeholder Assets Needed Now (Vertical Slice Build)

### Player Assets
- Placeholder player mesh/capsule + collision
- First-person weapon placeholder (shotgun proxy)
- Basic muzzle flash sprite/mesh
- Hit reaction placeholder camera effect

### Enemy Assets
- Dock Corrupted placeholder humanoid mesh (2 variants via material tint)
- Simple attack animation placeholders (idle, walk, strike, hit, death)
- Personnel Manager blockout mesh with scale read and key silhouette pieces

### Environment Assets
- Graybox modular kit (walls, floors, stairs, railings)
- Vessel interior props (locker, control panel, hatch wheel)
- Deck props (containers, chain piles, hazard lights)
- Gate arena blockout pieces and collision volumes

### UI Assets
- Objective banner placeholder
- Crosshair placeholder
- Health/ammo bar placeholder
- Subtitle box for locked dialogue lines

### Audio Assets
- Temp phone ring + call ambience
- Static loops and radio stingers
- Shatter SFX
- Shotgun rack SFX
- Temp weapon shot impact sounds
- Temp enemy vocal grunts and boss bark placeholders

## Stage B — Future Assets Needed Later (Post-Slice)

### Player Assets (Production)
- Final Digime/Cyberbeast character model references
- Final weapon models/animations
- Hand/weapon sway and reload set

### Enemy Assets (Production)
- Dock Corrupted full rig + variant kits (worker/security/port staff)
- Boss final sculpt/material pass and unique animation set
- Optional lurker enemy concept/model/anim set

### Environment Assets (Production)
- High-detail maritime-industrial texture library
- Set-dressed dockyard storytelling props
- Animated machinery and hazard set pieces

### UI/UX (Production)
- Thematic HUD skin with corruption overlays
- Intercom signal phrase treatment system
- Boss health presentation with denial-language flavor

### Audio/Music (Production)
- Cast VO sessions for locked lines and combat barks
- Layered industrial-horror ambience stems
- Adaptive combat music with phase transitions

## Cutscene / Voice / Music Pipeline Notes
1. Keep locked lines version-controlled in text docs before recording.
2. Record scratch VO first to validate pacing and trigger timing.
3. Use naming convention:
   - `vo_intro_*`
   - `vo_boss_pm_*`
   - `sfx_ui_signal_*`
   - `mx_lvl1_*`
4. Store raw takes outside runtime folders; import only selected stems/wavs.
5. Defer final mastering and mix polish until gameplay timings are stable.
