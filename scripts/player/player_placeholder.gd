extends CharacterBody3D

@export var move_speed: float = 6.5

func _physics_process(_delta: float) -> void:
	# Placeholder movement stub for future FPS controller integration.
	var input_vector := Vector2(
		Input.get_action_strength("move_right") - Input.get_action_strength("move_left"),
		Input.get_action_strength("move_back") - Input.get_action_strength("move_forward")
	)

	var direction := (transform.basis * Vector3(input_vector.x, 0.0, input_vector.y)).normalized()
	velocity.x = direction.x * move_speed
	velocity.z = direction.z * move_speed
	move_and_slide()
