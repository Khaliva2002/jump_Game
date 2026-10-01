import createCactus, { checkCactusCollision } from "./cactus.js";

//obstacles
const _createCactus = createCactus;

let managerFileRunning = false;
const obstacles = ["cactus"];

var activeObstacles = {};
var obstacleSeq = 0;
var worldSpeed = 250;
var moveRaf = null;
var lastTick = 0;

function addObstacle(name, docElement) {
  obstacleSeq++;
  var id = name + "_" + Date.now() + "_" + obstacleSeq;
  activeObstacles[id] = {
    name: name,
    docElement: docElement,
    createdAt: Date.now(),
  };
  return id;
}

function removeObstacle(id) {
  if (!activeObstacles[id]) return;
  var item = activeObstacles[id];
  if (item.docElement && item.docElement.parentNode) {
    item.docElement.parentNode.removeChild(item.docElement);
  }
  delete activeObstacles[id];
}

function tick(now) {
  if (!managerFileRunning) return;
  if (!lastTick) lastTick = now;
  var dt = (now - lastTick) / 1000;
  lastTick = now;
  var scene = document.getElementById("playScene");
  var limit = scene ? scene.clientWidth + 60 : 600;
  for (var id in activeObstacles) {
    var item = activeObstacles[id];
    var el = item.docElement;
    if (!el) continue;
    if (typeof item.x !== "number") item.x = 0;
    item.x -= worldSpeed * dt;
    el.style.transform = "translateX(" + item.x + "px)";
    if (item.x <= -limit) {
      removeObstacle(id);
      continue;
    }
    var playerEl = document.getElementById("scenePlayer");
    if (!item.hit && checkCactusCollision(el, playerEl)) {
      item.hit = true;
      console.log("تصادم");
    }
  }
  moveRaf = requestAnimationFrame(tick);
}

function startMoving() {
  if (moveRaf) return;
  lastTick = 0;
  moveRaf = requestAnimationFrame(tick);
}

function stopMoving() {
  if (moveRaf) {
    cancelAnimationFrame(moveRaf);
    moveRaf = null;
  }
  lastTick = 0;
}

function cancelEveryThing() {
  stopMoving();
  for (var id in activeObstacles) {
    removeObstacle(id);
  }
  activeObstacles = {};
  obstacleSeq = 0;
  worldSpeed = 250;
  moveRaf = null;
  lastTick = 0;
  managerFileRunning = false;
  obstacles.length = 0;
  obstacles.push("cactus");
}

document.addEventListener("START_OBSTACLES", function (state) {
  if (managerFileRunning) return;
  managerFileRunning = true;
  startMoving();
  setTimeout(function () {
    var el = _createCactus();
    addObstacle("cactus", el);
  }, 3000);
});

document.addEventListener("STOP_OBSTACLES", function () {
  if (!managerFileRunning) return;
  managerFileRunning = false;
  cancelEveryThing();
});
