extends Node3D

@onready var intro_flow: Node = $IntroFlow
@onready var level_1: Node3D = $Level1OffTheBoat

func _ready() -> void:
	level_1.visible = false
	if intro_flow.has_signal("intro_completed"):
		intro_flow.intro_completed.connect(_on_intro_completed)
		intro_flow.call("start_intro")
	else:
		# Fallback for environments where intro flow script is replaced.
		_on_intro_completed()

func _on_intro_completed() -> void:
	level_1.visible = true
