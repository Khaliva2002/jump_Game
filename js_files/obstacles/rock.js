function createRock() {
  var rock = document.createElement("div");
  rock.className = "scene-rock";
  var scene = document.getElementById("playScene");
  if (scene) scene.appendChild(rock);
  return rock;
}

export { createRock };
export default createRock;
