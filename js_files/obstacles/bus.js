function createBus() {
  var bus = document.createElement("div");
  bus.className = "scene-bus";
  var scene = document.getElementById("playScene");
  if (scene) scene.appendChild(bus);
  return bus;
}

function checkBusCollision(busEl, playerEl) {
  if (!busEl || !playerEl) return null;
  if (!document.body.contains(busEl)) return null;
  if (!document.body.contains(playerEl)) return null;
  var b = busEl.getBoundingClientRect();
  var p = playerEl.getBoundingClientRect();
  var bx = b.left + b.width * 0.08;
  var bw = b.width * 0.84;
  var by = b.top + b.height * 0.08;
  var bh = b.height * 0.92;
  var px = p.left + p.width * 0.15;
  var pw = p.width * 0.7;
  var py = p.top + p.height * 0.1;
  var ph = p.height * 0.9;
  var overlap = bx < px + pw && bx + bw > px && by < py + ph && by + bh > py;
  if (!overlap) return null;
  var landedDepth = py + ph - by;
  if (landedDepth <= 14) return "top";
  return "side";
}

function explodeBus(busEl) {
  if (!busEl) return;
  var current = busEl.style.transform || "";
  var m = /translateX\((-?\d+\.?\d*)px\)/.exec(current);
  busEl.style.setProperty("--boom-x", (m ? m[1] : 0) + "px");
  busEl.style.transform = "";
  busEl.classList.add("bus-boom");
  setTimeout(function () {
    if (busEl.parentNode) busEl.parentNode.removeChild(busEl);
  }, 550);
}

export { createBus, checkBusCollision, explodeBus };
export default createBus;
