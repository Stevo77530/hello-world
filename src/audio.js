let ctx;

function context() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export function beep({ freq = 220, duration = 0.08, type = "square", gain = 0.04, when = 0 }) {
  const ac = context();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(ac.destination);
  const startAt = ac.currentTime + when;
  osc.start(startAt);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.stop(startAt + duration + 0.01);
}

export function staticBurst() {
  beep({ freq: 90, duration: 0.2, type: "sawtooth", gain: 0.03 });
  beep({ freq: 1200, duration: 0.08, type: "square", gain: 0.015, when: 0.03 });
}

export function shotgunRack() {
  beep({ freq: 180, duration: 0.06, type: "triangle", gain: 0.05 });
  beep({ freq: 440, duration: 0.03, type: "square", gain: 0.025, when: 0.05 });
}
