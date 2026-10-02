import createCactus, { checkCactusCollision } from "./cactus.js";
import createRock from "./rock.js";
import createBus, { checkBusCollision, explodeBus } from "./bus.js";
import {
  cactus as cactusTimes,
  rock as rockTimes,
  bus as busTimes,
} from "./times.js";

//obstacles
const _createCactus = createCactus;
const _createRock = createRock;
const _createBus = createBus;

let managerFileRunning = false;
const obstacles = ["cactus", "rock", "bus"];

var activeObstacles = {};
var obstacleSeq = 0;
var worldSpeed = 250;
var moveRaf = null;
var lastTick = 0;
var obstaclesPaused = false;
var spawnPending = false;

function addObstacle(name, docElement) {
  obstacleSeq++;
  var id = name + "_" + Date.now() + "_" + obstacleSeq;
  activeObstacles[id] = {
    name: name,
    docElement: docElement,
    createdAt: Date.now(),
    speedMult: name === "bus" ? 1.1 : 1,
  };
  if (managerFileRunning && !obstaclesPaused) getNextObstacle();
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
    item.x -= worldSpeed * (item.speedMult || 1) * dt;
    el.style.transform = "translateX(" + item.x + "px)";
    if (item.x <= -limit) {
      removeObstacle(id);
      continue;
    }
    var playerEl = document.getElementById("scenePlayer");
    if (!item.hit && item.name === "bus") {
      var busRes = checkBusCollision(el, playerEl);
      if (busRes === "top") {
        item.hit = true;
        delete activeObstacles[id];
        explodeBus(el);
        continue;
      }
      if (busRes === "side") {
        item.hit = true;
        console.log("تصادم");
      }
      continue;
    }
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

function stopObsacles() {
  obstaclesPaused = true;
  stopMoving();
}

function countineObstacles() {
  if (!managerFileRunning) return;
  obstaclesPaused = false;
  startMoving();
  if (!spawnPending) getNextObstacle();
}

function parseTimeRange(str) {
  if (typeof str !== "string") return null;
  var parts = str.split("-");
  if (parts.length !== 2) return null;
  var min = parseInt(parts[0], 10);
  var max = parseInt(parts[1], 10);
  if (!isFinite(min) || !isFinite(max) || max < min) return null;
  return [min, max];
}

function getGapFor(pick, last) {
  var table = null;
  if (pick === "cactus") table = cactusTimes;
  if (pick === "rock") table = rockTimes;
  if (pick === "bus") table = busTimes;
  if (!table) return 1000;
  var row = null;
  for (var i = 0; i < table.length; i++) {
    if (table[i].name === last) {
      row = table[i];
      break;
    }
  }
  if (!row) return 0;
  var range = parseTimeRange(row.time);
  if (!range) return 1000;
  return range[0] + Math.random() * (range[1] - range[0]);
}

function getNextObstacle() {
  if (obstacles.length === 0) return;
  var pick = obstacles[Math.floor(Math.random() * obstacles.length)];
  var last =
    createdObstacles.length > 0
      ? createdObstacles[createdObstacles.length - 1].name
      : null;
  var gap = getGapFor(pick, last);
  if (isFirstSpawn && gap < 2500) gap = 2500;
  isFirstSpawn = false;
  spawnPending = true;
  setTimeout(function () {
    spawnPending = false;
    if (obstaclesPaused) return;
    var el = null;
    if (pick === "cactus") el = _createCactus();
    if (pick === "rock") el = _createRock();
    if (pick === "bus") el = _createBus();
    if (!el) return;
    trackCreatedObstacle(pick);
    addObstacle(pick, el);
  }, gap);
}

var createdObstacles = [];
var isFirstSpawn = true;

function trackCreatedObstacle(name) {
  createdObstacles.push({ name: name, at: Date.now() });
}

function cancelEveryThing() {
  stopMoving();
  for (var id in activeObstacles) {
    removeObstacle(id);
  }
  activeObstacles = {};
  obstacleSeq = 0;
  createdObstacles = [];
  isFirstSpawn = true;
  worldSpeed = 250;
  moveRaf = null;
  lastTick = 0;
  obstaclesPaused = false;
  spawnPending = false;
  managerFileRunning = false;
  obstacles.length = 0;
  obstacles.push("cactus");
  obstacles.push("rock");
  obstacles.push("bus");
}

document.addEventListener("START_OBSTACLES", function (state) {
  if (managerFileRunning) return;
  managerFileRunning = true;
  startMoving();
  spawnPending = true;
  setTimeout(function () {
    spawnPending = false;
    if (obstaclesPaused) return;
    var el = _createCactus();
    trackCreatedObstacle("cactus");
    addObstacle("cactus", el);
  }, 3000);
});

document.addEventListener("STOP_OBSTACLES", function () {
  if (!managerFileRunning) return;
  managerFileRunning = false;
  cancelEveryThing();
});

export { stopObsacles, countineObstacles };
