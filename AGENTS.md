# AGENTS.md — Capt. Stevo’s Crewchange Project Rules

## Project North Star
Build **vertical slices first**. Every addition must strengthen a playable, testable slice before expanding outward.

## Scope Rules (Non-Negotiable)
1. **No scope explosion.** Do not add campaign-wide systems when a level-local solution works.
2. **Placeholders before polish.** Use temporary meshes, audio barks, UI blocks, and graybox spaces before final assets.
3. **Modular structure.** Prefer small scenes/scripts with clear ownership over monolithic files.
4. **Readable hierarchy.** Keep folders, scene names, and script names explicit and consistent.

## Creative Direction Lock
- Tone: dark industrial nightmare-maritime with dry humor.
- Avoid goofy parody, slapstick, or meme-heavy writing.
- Corrupt familiar workplace/maritime language into threat language.

## Narrative/Dialogue Locks (Do Not Rewrite)
### Opening cinematic sequence (required order)
1. Black screen.
2. Phone call (woman): **“Something’s wrong… hurry… come home…”**
3. Call breaks into static.
4. Dead dial tone.
5. Static whisper: **“You’re never making crew change, Captain.”**
6. Capt. Stevo: **“What the fuck?”**
7. Something shatters outside the boat.
8. Shotgun rack SFX.
9. Fade into gameplay objective: **GET OFF THE BOAT**.

### Mandatory world signal phrases
- NO CREW CHANGE
- CREW CHANGE DENIED
- RELIEF UNAVAILABLE
- CAPTAIN REMAINS ABOARD
- RETURN TO VESSEL
- HOME STATUS: REVOKED
- TRANSIT INTERRUPTED
- ROUTE INVALID

## Level/Boss Structure Rules
- Every level should eventually end with a boss encounter.
- **Level 1 (“Off the Boat”) has no miniboss.**
- Level 1 boss is locked as **The Personnel Manager**.
- Preserve locked intro/boss lines and thematic framing around denied relief.

## Character Identity Rule
Capt. Stevo is the Digime/Cyberbeast protagonist identity source. Do not replace with a generic marine archetype.

## Technical Direction
- Engine priority: **Godot**.
- Keep repo Godot-first in foldering and scene/script scaffolding.
- Do not divert implementation effort to Phaser/three.js paths.

## Anti-Bloat Checklist
Before creating new content, verify:
- Does this directly improve the current vertical slice?
- Can this be represented with placeholders right now?
- Is this required for Level 1 completion?
- Does it preserve locked tone/dialogue/theme?

If any answer is “no,” defer it.
