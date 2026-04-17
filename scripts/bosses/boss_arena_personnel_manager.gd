extends Node3D

enum BossPhase {
	PHASE_1,
	PHASE_2
}

var current_phase: BossPhase = BossPhase.PHASE_1

func start_intro() -> void:
	print("[BOSS INTRO] Your crew change request has been reviewed.")
	print("[BOSS INTRO] We're short-handed, so fuck you.")

func set_phase_two() -> void:
	current_phase = BossPhase.PHASE_2
	print("[BOSS] No one leaves short-handed.")

func kill_boss() -> void:
	print("[BOSS DEATH] Fine… cover your own shift…")
