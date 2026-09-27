import {
  getDeveloperData,
  getPlayGround,
  getSettingsBoard,
  getScoreBoard,
} from "./main_page.js";

function startMainLoading() {
  var root = document.getElementById("root");
  if (!root || document.getElementById("main-loading")) return;

  var overlay = document.createElement("div");
  overlay.id = "main-loading";

  var text = document.createElement("div");
  text.className = "loader-text";
  text.textContent = "JUMP GAME";

  var track = document.createElement("div");
  track.className = "loader-track";

  var bar = document.createElement("div");
  bar.className = "loader-bar";

  track.appendChild(bar);
  overlay.appendChild(text);
  overlay.appendChild(track);
  root.appendChild(overlay);
}

function stopMainLoading() {
  var overlay = document.getElementById("main-loading");
  if (!overlay) return;
  overlay.classList.add("hidden");
  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 450);
}

function startIntro() {
  var root = document.getElementById("root");
  if (!root || document.getElementById("intro")) return;

  var overlay = document.createElement("div");
  overlay.id = "intro";

  var inner = document.createElement("div");
  inner.className = "intro-inner";

  var dino = document.createElement("div");
  dino.className = "intro-dino";
  dino.textContent = "🦖";

  var title = document.createElement("div");
  title.className = "intro-title";
  title.textContent = "JUMP GAME";

  var sub = document.createElement("div");
  sub.className = "intro-sub";
  sub.textContent = "GET READY";

  inner.appendChild(dino);
  inner.appendChild(title);
  inner.appendChild(sub);
  overlay.appendChild(inner);
  root.appendChild(overlay);
}

function endIntro() {
  var overlay = document.getElementById("intro");
  var page = document.querySelector(".main-page");
  if (!overlay) {
    if (page) page.classList.remove("is-hidden");
    return;
  }
  overlay.classList.add("hidden");
  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (page) page.classList.remove("is-hidden");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  var playBtn = document.querySelector('[data-action="play"]');
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      getPlayGround();
    });
  }
  var devBtn = document.querySelector('[data-action="developer"]');
  if (devBtn) {
    devBtn.addEventListener("click", function () {
      getDeveloperData();
    });
  }
  var scoreBtn = document.querySelector('[data-action="scores"]');
  if (scoreBtn) {
    scoreBtn.addEventListener("click", function () {
      getScoreBoard();
    });
  }
  startMainLoading();
  setTimeout(function () {
    stopMainLoading();
    startIntro();
    setTimeout(function () {
      endIntro();
    }, 4000);
  }, 2000);
});
