extends Node

signal intro_completed

const INTRO_LINES: Array[String] = [
	"Something's wrong… hurry… come home…",
	"<static>",
	"<dead dial tone>",
	"You're never making crew change, Captain.",
	"What the fuck?",
	"<glass shatters outside>",
	"<shotgun rack>",
	"OBJECTIVE: GET OFF THE BOAT"
]

func start_intro() -> void:
	# Placeholder timeline. Replace with AnimationPlayer + audio buses.
	for line in INTRO_LINES:
		print("[INTRO] %s" % line)
	emit_signal("intro_completed")
