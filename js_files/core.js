import BCONFIG from "./config/buttons.js";
import { makePlayerJump } from "./player.js";
import { currentStats, startGame, stopGame, pauseGame } from "./playG.js";
import { runSound } from "./sounds.js";

const supportsTouch = navigator.maxTouchPoints > 0;

function initEvents() {
  window.addEventListener("mousedown", (event) => {
    if (!currentStats.isReady) return;
    if (BCONFIG.currentJump.code != event.button) return;
    if (currentStats.gameStarted) {
      makePlayerJump();
    } else {
      console.log("start");
      startGame();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!currentStats.isReady) return;
    if (BCONFIG.currentJump.code != event.code) return;
    if (currentStats.gameStarted) {
      makePlayerJump();
    } else {
      startGame();
    }
  });

  window.addEventListener("click", () => {
    runSound("click.mp3");
  });

  window.addEventListener("keydown", (event) => {
    if (BCONFIG.currentStopGame.code != event.code) return;
    if (currentStats.pasued === null) {
      stopGame();
      return;
    }
    if (currentStats.pasued === false) {
      stopGame();
      return;
    }
    if (currentStats.pasued === true) {
      pauseGame();
      return;
    }
  });

  window.addEventListener("click", () => {
    runSound("click.mp3");
  });

  // For  mobile
  window.addEventListener("pointerdown", (event) => {
    if (!supportsTouch) return;
    if (event.pointerType === "touch") {
      console.log("TOT");
      if (!currentStats.isReady) return;
      if (currentStats.gameStarted) {
        makePlayerJump();
      } else {
        startGame();
      }
    }
  });
}

window.addEventListener("load", () => {
  initEvents();
});
