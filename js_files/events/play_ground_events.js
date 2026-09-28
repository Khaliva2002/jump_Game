import { makePlayerRun, makeScreenRun, removeHint } from "../playG.js";

document.addEventListener("GAME_STARTED", () => {
  removeHint();
  makePlayerRun();
  makeScreenRun();
});
