import BCONFIG from "./config/buttons.js";

const currentStats = {
  isReady: false,
  gameStarted: false,
  playerState: "stop",
};
function setIntialStats() {
  currentStats.isReady = false;
  currentStats.gameStarted = false;
  currentStats.playerState = "stop";
}

function startGame() {
  currentStats.gameStarted = true;
  document.dispatchEvent(new CustomEvent("GAME_STARTED"));
  return;
}
function stopGame() {}
function endGame() {}

function setPlayerReady() {
  currentStats.isReady = true;
}
function setPlayerNotReady() {
  setIntialStats();
}

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

function removeHint() {
  var hint = document.querySelector(".play-hint");
  if (!hint) return;
  if (hint.parentNode) hint.parentNode.removeChild(hint);
}

function makeScreenRun() {
  var scene = document.getElementById("playScene");
  if (!scene) return;
  scene.classList.add("is-screen-running");
}

export default function displayPlayGround(AValue) {
  setPlayerReady();
  var board = document.querySelector(".play-board");
  if (!board) return;
  board.innerHTML = "";

  var stage = document.createElement("div");
  stage.className = "play-stage";

  var hud = document.createElement("div");
  hud.className = "play-hud";

  var score = document.createElement("span");
  score.className = "hud-score";
  score.id = "playScore";
  score.textContent = "00000";

  var hi = document.createElement("span");
  hi.className = "hud-hi";
  hi.id = "playHi";
  hi.textContent = "HI 00000";

  hud.appendChild(score);
  hud.appendChild(hi);

  var scene = document.createElement("div");
  scene.className = "play-scene";
  scene.id = "playScene";

  var sun = document.createElement("div");
  sun.className = "scene-sun";

  var cloud1 = document.createElement("div");
  cloud1.className = "scene-cloud c1";

  var cloud2 = document.createElement("div");
  cloud2.className = "scene-cloud c2";

  var ground = document.createElement("div");
  ground.className = "scene-ground";

  var player = document.createElement("div");
  player.className = "scene-player";
  player.id = "scenePlayer";

  var skHead = document.createElement("div");
  skHead.className = "skel-head";

  var skSpine = document.createElement("div");
  skSpine.className = "skel-spine";

  var skRib1 = document.createElement("div");
  skRib1.className = "skel-rib r1";

  var skRib2 = document.createElement("div");
  skRib2.className = "skel-rib r2";

  var skRib3 = document.createElement("div");
  skRib3.className = "skel-rib r3";

  var skArmL = document.createElement("div");
  skArmL.className = "skel-arm left";

  var skArmR = document.createElement("div");
  skArmR.className = "skel-arm right";

  var skPelvis = document.createElement("div");
  skPelvis.className = "skel-pelvis";

  var skLegL = document.createElement("div");
  skLegL.className = "skel-leg left";

  var skLegR = document.createElement("div");
  skLegR.className = "skel-leg right";

  player.appendChild(skHead);
  player.appendChild(skSpine);
  player.appendChild(skRib1);
  player.appendChild(skRib2);
  player.appendChild(skRib3);
  player.appendChild(skArmL);
  player.appendChild(skArmR);
  player.appendChild(skPelvis);
  player.appendChild(skLegL);
  player.appendChild(skLegR);

  scene.appendChild(sun);
  scene.appendChild(cloud1);
  scene.appendChild(cloud2);
  scene.appendChild(ground);
  scene.appendChild(player);

  var hint = document.createElement("div");
  var hintContentForPC = `press <span class='button-new'> ${BCONFIG.currentJump.name}</span> to start`;
  var hintContentForMobile = "MOBILE";
  hint.className = "play-hint";
  hint.innerHTML = hintContentForPC;

  scene.appendChild(hint);
  stage.appendChild(hud);
  stage.appendChild(scene);
  board.appendChild(stage);
  return AValue;
}

export {
  currentStats,
  makePlayerRun,
  makePlayerStop,
  startGame,
  setPlayerReady,
  setPlayerNotReady,
  removeHint,
  makeScreenRun,
};
