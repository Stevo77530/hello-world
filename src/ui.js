const hud = document.getElementById("hud");
const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlay-message");
const subtitle = document.getElementById("subtitle");
const objective = document.getElementById("objective");
const signal = document.getElementById("signal");
const health = document.getElementById("health");
const ammo = document.getElementById("ammo");

let subtitleTimer;
let signalTimer;

export const UI = {
  showHUD(show) {
    hud.classList.toggle("hidden", !show);
  },
  setOverlay(text, visible = true) {
    overlayMessage.textContent = text;
    overlay.classList.toggle("visible", visible);
    overlay.classList.toggle("hidden", !visible);
  },
  setObjective(text) {
    objective.textContent = `Objective: ${text}`;
  },
  setHealth(value) {
    health.textContent = `HP: ${Math.max(0, Math.floor(value))}`;
  },
  setAmmo(loaded, reserve) {
    ammo.textContent = `Shells: ${loaded} / ${reserve}`;
  },
  subtitle(text, ms = 1800) {
    clearTimeout(subtitleTimer);
    subtitle.textContent = text;
    subtitle.classList.add("visible");
    subtitleTimer = setTimeout(() => subtitle.classList.remove("visible"), ms);
  },
  signal(text, ms = 1800) {
    clearTimeout(signalTimer);
    signal.textContent = text;
    signalTimer = setTimeout(() => (signal.textContent = ""), ms);
  },
  damageFlash() {
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 130);
  },
};
