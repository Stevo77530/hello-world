# Capt. Stevo’s Crewchange

Retro Doom-like FPS prototype in Godot.

## Premise
You are Capt. Stevo, a cybernetic tugboat captain trapped in a corrupted maritime-industrial nightmare. Work systems, authority systems, and routine spaces have become hostile. Your only goal: make crew change and get home.

## Gameplay Goal
Fight from your vessel through dock infrastructure and reach the departure gate.

Immediate objective in Level 1: **GET OFF THE BOAT**.

## Current Vertical Slice Scope
This repo is intentionally scoped to a single vertical slice foundation:
- Intro cinematic trigger flow (scripted placeholder implementation)
- Player placeholder scene/script (Digime/Cyberbeast identity maintained in docs)
- Level 1 stub: **Off the Boat**
- Boss arena stub: **The Personnel Manager**
- Documentation locks for tone, dialogue, scope, and asset staging

## Controls / Feature Goals (Placeholder)
Planned default FPS controls in Godot:
- Move: `W/A/S/D`
- Look: Mouse
- Fire: Left Mouse
- Alt/Interact: `E`
- Jump: `Space`
- Sprint: `Shift`

Feature targets for the vertical slice:
- Fast movement + readable combat spaces
- Clear objective and encounter pacing over first ~3 minutes
- One regular enemy family (Dock Corrupted)
- One level-end boss encounter with 2 phases

## Next Steps
1. Convert graybox scenes into a playable whitebox loop with spawn points.
2. Implement basic weapon firing + hit feedback placeholders.
3. Add Dock Corrupted prototype AI (rush + ranged variant).
4. Script boss gate intro and phase transition logic.
5. Replace temporary VO/text triggers with proper timeline/cutscene control.
