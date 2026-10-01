function createCactus() {
  var cactus = document.createElement("div");
  cactus.className = "scene-cactus";
  var scene = document.getElementById("playScene");
  if (scene) scene.appendChild(cactus);
  return cactus;
}

function checkCactusCollision(cactusEl, playerEl) {
  if (!cactusEl || !playerEl) return false;
  if (!document.body.contains(cactusEl)) return false;
  if (!document.body.contains(playerEl)) return false;
  var c = cactusEl.getBoundingClientRect();
  var p = playerEl.getBoundingClientRect();
  var cx = c.left + c.width * 0.15;
  var cw = c.width * 0.7;
  var cy = c.top + c.height * 0.1;
  var ch = c.height * 0.9;
  var px = p.left + p.width * 0.15;
  var pw = p.width * 0.7;
  var py = p.top + p.height * 0.1;
  var ph = p.height * 0.9;
  return cx < px + pw && cx + cw > px && cy < py + ph && cy + ch > py;
}

export { createCactus, checkCactusCollision };
export default createCactus;
