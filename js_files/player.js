import { currentStats } from "./playG.js";
function makePlayerRun() {
  var player = document.getElementById("scenePlayer");
  if (!player) return;
  player.innerHTML = "";
  player.classList.add("is-running");

  var classes = [
    "skel-head",
    "skel-spine",
    "skel-rib r1",
    "skel-rib r2",
    "skel-rib r3",
    "skel-arm left",
    "skel-arm right",
    "skel-pelvis",
    "skel-leg left",
    "skel-leg right",
  ];
  for (var i = 0; i < classes.length; i++) {
    var part = document.createElement("div");
    part.className = classes[i];
    player.appendChild(part);
  }

  currentStats.playerState = "run";
}

function makePlayerStop() {
  var player = document.getElementById("scenePlayer");
  if (!player) return;
  player.innerHTML = "";
  player.classList.remove("is-running");

  var classes = [
    "skel-head",
    "skel-spine",
    "skel-rib r1",
    "skel-rib r2",
    "skel-rib r3",
    "skel-arm left",
    "skel-arm right",
    "skel-pelvis",
    "skel-leg left",
    "skel-leg right",
  ];
  for (var i = 0; i < classes.length; i++) {
    var part = document.createElement("div");
    part.className = classes[i];
    player.appendChild(part);
  }

  currentStats.playerState = "stop";
}

function makePlayerJump() {
  var player = document.getElementById("scenePlayer");
  if (!player) return;
  if (player.classList.contains("is-jumping")) return;
  var prevState = currentStats.playerState;
  currentStats.playerState = "jump";
  player.classList.add("is-jumping");
  setTimeout(function () {
    player.classList.remove("is-jumping");
    currentStats.playerState = prevState;
  }, 600);
}

export { makePlayerRun, makePlayerStop, makePlayerJump };
