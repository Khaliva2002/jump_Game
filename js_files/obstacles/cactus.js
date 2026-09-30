function createCactus() {
  var cactus = document.createElement("div");
  cactus.className = "scene-cactus";
  var scene = document.getElementById("playScene");
  if (scene) scene.appendChild(cactus);
  return cactus;
}

export { createCactus };
export default createCactus;
