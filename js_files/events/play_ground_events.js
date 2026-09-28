import { makePlayerRun, makeScreenRun, removeHint, sse } from "../playG.js";
import SCORE_CONFIG from "../config/score.js";
import { val, t } from "../sc.js";

document.addEventListener("GAME_STARTED", () => {
  removeHint();
  makePlayerRun();
  makeScreenRun();
  sse();
});

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
