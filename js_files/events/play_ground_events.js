import { removeHint, makeScreenRun } from "../playG.js";
import SCORE_CONFIG from "../config/score.js";
import { val, t } from "../sc.js";
import { createCactus } from "../obstacles/cactus.js";
import { makePlayerRun, makePlayerStop } from "../player.js";
import { sse } from "../sc.js";
import { runSound, stopSound } from "../sounds.js";

let gameSoundId = null;

document.addEventListener("GAME_STARTED", () => {
  removeHint();
  makePlayerRun();
  makeScreenRun();
  sse();
  gameSoundId = runSound("game.mp3", true);
  document.dispatchEvent(new CustomEvent("START_OBSTACLES"));
});

document.addEventListener("GAME_ENDED", () => {});

document.addEventListener("ck_s_c", () => {
  var cs = val;
  var isPlusMatch = cs === SCORE_CONFIG.mainPlus;
  var isTimeMatch = t === SCORE_CONFIG.time;
  if (!isPlusMatch || !isTimeMatch) {
    console.log("Hacked");
  }
});

setInterval(function () {
  document.dispatchEvent(new CustomEvent("ck_s_c"));
}, 10000);

function stopGameSound() {
  stopSound(gameSoundId);
}
export { stopGameSound };
