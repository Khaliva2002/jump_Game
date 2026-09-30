import BCONFIG from "./config/buttons.js";
import { currentStats, startGame } from "./playG.js";
import { runSound } from "./sounds.js";

let clickSoundID = null;
function initEvents() {
  window.addEventListener("mousedown", (event) => {
    if (!currentStats.isReady) return;
    if (BCONFIG.currentJump.code != event.button) return;
    if (currentStats.gameStarted) {
      console.log("jump");
    } else {
      console.log("start");
      startGame();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!currentStats.isReady) return;
    if (BCONFIG.currentJump.code != event.code) return;
    if (currentStats.gameStarted) {
      console.log("jump");
    } else {
      console.log("start");
      startGame();
    }
  });

  window.addEventListener("click", () => {
    clickSoundID = runSound("click.mp3");
  });
}

window.addEventListener("load", () => {
  initEvents();
});
