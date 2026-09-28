import { makePlayerRun, makeScreenRun, removeHint, sse } from "../playG.js";

document.addEventListener("GAME_STARTED", () => {
  removeHint();
  makePlayerRun();
  makeScreenRun();
  sse();
});
