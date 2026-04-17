# Capt. Stevo's Crewchange — Level 1 Prototype

Playable browser prototype for **Level 1: Off the Boat** using HTML/CSS/JS + three.js.

## Quick Start

### Option A: Python local server
```bash
python3 -m http.server 8080
```
Then open: <http://localhost:8080>

### Option B: Node serve (if installed)
```bash
npx serve .
```

## Controls
- **Mouse**: Look around
- **W / A / S / D**: Move
- **Left click**: Fire shotgun
- **R**: Reload
- **P**: Pause/resume
- **Enter**: Restart after death/win

## Implemented Level 1 Flow
1. Locked intro subtitle sequence + audio placeholders
2. Cabin spawn and objective boot-up
3. Corridor push
4. Hatch/deck transition
5. Deck traversal
6. Gangway drop to dock level
7. First Dock Corrupted encounter
8. Dock yard progression
9. Exit gate encounter trigger
10. Boss fight with The Personnel Manager
11. End-of-level win state

## Project Structure
- `index.html` — page + HUD layers
- `style.css` — visual style + overlays
- `src/main.js` — game loop, controls, progression, combat
- `src/level.js` — level geometry, signage, triggers
- `src/entities.js` — enemy + pickup entities
- `src/ui.js` — UI and subtitles
- `src/audio.js` — simple synthesized placeholder SFX
- `PROJECT_NOTES.md` — implementation notes and next steps
- `assets/`, `audio/`, `ui/`, `docs/` — prepared folders for expansion

## Notes
- All visuals are placeholder geometry/materials.
- Prototype is intentionally scoped to one playable level only.
