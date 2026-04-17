extends Node3D

@onready var boss_arena: Node3D = $BossArenaPersonnelManager

func _ready() -> void:
	print("[LEVEL1] Off the Boat loaded.")
	print("[LEVEL1] Objective: GET OFF THE BOAT")
	boss_arena.visible = false

func trigger_boss_arena() -> void:
	boss_arena.visible = true
	print("[LEVEL1] Departure gate denial event triggered.")
