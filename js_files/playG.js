export default function displayPlayGround(AValue) {
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

  var cactus = document.createElement("div");
  cactus.className = "scene-cactus";

  scene.appendChild(sun);
  scene.appendChild(cloud1);
  scene.appendChild(cloud2);
  scene.appendChild(ground);
  scene.appendChild(player);
  scene.appendChild(cactus);

  var hint = document.createElement("div");
  hint.className = "play-hint";
  hint.textContent = "Press SPACE to jump";

  stage.appendChild(hud);
  stage.appendChild(scene);
  stage.appendChild(hint);
  board.appendChild(stage);
  return AValue;
}
