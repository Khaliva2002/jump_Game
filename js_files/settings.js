import BCONFIG, { changeJumpButton, changeStopGameButton } from "./config/buttons.js";
import { setPlayerNotReady } from "./playG.js";

function getCurrentTheme() {
  if (document.documentElement.classList.contains("dark")) return "dark";
  return "light";
}

function changeTheme(value) {
  if (value === getCurrentTheme()) return;
  if (value === "dark") {
    document.documentElement.classList.add("dark");
  } else if (value === "light") {
    document.documentElement.classList.remove("dark");
  }
  var label = document.getElementById("settingsThemeValue");
  if (label) label.textContent = getCurrentTheme();
  document.dispatchEvent(new CustomEvent("THEME_CHANGED"));
}

function saveThemeOnClient() {
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("dark", true);
  } else {
    localStorage.removeItem("dark");
  }
}

export default function displaySettings(AValue) {
  setPlayerNotReady();
  var board = document.querySelector(".play-board");
  if (!board) return;
  board.innerHTML = "";

  var wrap = document.createElement("div");
  wrap.className = "settings-board";

  var top = document.createElement("div");
  top.className = "settings-top";

  var title = document.createElement("h2");
  title.className = "settings-title";
  title.textContent = "Settings";

  var row = document.createElement("p");
  row.className = "settings-row";

  var key = document.createElement("span");
  key.textContent = "Default color: ";

  var value = document.createElement("span");
  value.id = "settingsThemeValue";
  value.className = "settings-value";
  value.textContent = getCurrentTheme();

  row.appendChild(key);
  row.appendChild(value);
  top.appendChild(title);
  top.appendChild(row);

  var jumpRow = document.createElement("p");
  jumpRow.className = "settings-row";

  var jumpKey = document.createElement("span");
  jumpKey.textContent = "Jump button: ";

  var jumpValue = document.createElement("span");
  jumpValue.id = "settingsJumpValue";
  jumpValue.className = "settings-value";
  jumpValue.textContent = BCONFIG.currentJump.name;

  jumpRow.appendChild(jumpKey);
  jumpRow.appendChild(jumpValue);
  top.appendChild(jumpRow);

  var stopRow = document.createElement("p");
  stopRow.className = "settings-row";

  var stopKey = document.createElement("span");
  stopKey.textContent = "Stop button: ";

  var stopValue = document.createElement("span");
  stopValue.id = "settingsStopValue";
  stopValue.className = "settings-value";
  stopValue.textContent = BCONFIG.currentStopGame.name;

  stopRow.appendChild(stopKey);
  stopRow.appendChild(stopValue);
  top.appendChild(stopRow);

  var divider = document.createElement("div");
  divider.className = "settings-divider";

  var bottom = document.createElement("div");
  bottom.className = "settings-actions";

  var darkBtn = document.createElement("button");
  darkBtn.type = "button";
  darkBtn.className = "menu-btn";
  darkBtn.textContent = "dark";
  darkBtn.setAttribute("data-value", "dark");
  darkBtn.addEventListener("click", function () {
    changeTheme(darkBtn.getAttribute("data-value"));
  });

  var lightBtn = document.createElement("button");
  lightBtn.type = "button";
  lightBtn.className = "menu-btn";
  lightBtn.textContent = "light";
  lightBtn.setAttribute("data-value", "light");
  lightBtn.addEventListener("click", function () {
    changeTheme(lightBtn.getAttribute("data-value"));
  });

  bottom.appendChild(darkBtn);
  bottom.appendChild(lightBtn);

  var divider2 = document.createElement("div");
  divider2.className = "settings-divider";

  var jumpLabel = document.createElement("p");
  jumpLabel.className = "settings-row";
  jumpLabel.textContent = "jump :";

  var jumpActions = document.createElement("div");
  jumpActions.className = "settings-actions";

  for (var j = 0; j < BCONFIG.jump.length; j++) {
    (function (btnData) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-btn";
      if (btnData.name === BCONFIG.currentJump.name) btn.classList.add("is-active");
      btn.textContent = btnData.name;
      btn.setAttribute("data-value", btnData.name);
      btn.addEventListener("click", function () {
        changeJumpButton(btn.getAttribute("data-value"));
        BCONFIG.currentJump = btnData;
        var label = document.getElementById("settingsJumpValue");
        if (label) label.textContent = btnData.name;
        var all = jumpActions.querySelectorAll(".menu-btn");
        for (var k = 0; k < all.length; k++) all[k].classList.remove("is-active");
        btn.classList.add("is-active");
      });
      jumpActions.appendChild(btn);
    })(BCONFIG.jump[j]);
  }

  var divider3 = document.createElement("div");
  divider3.className = "settings-divider";

  var stopLabel = document.createElement("p");
  stopLabel.className = "settings-row";
  stopLabel.textContent = "stopGame :";

  var stopActions = document.createElement("div");
  stopActions.className = "settings-actions";

  for (var s = 0; s < BCONFIG.stopGame.length; s++) {
    (function (btnData) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-btn";
      if (btnData.name === BCONFIG.currentStopGame.name) btn.classList.add("is-active");
      btn.textContent = btnData.name;
      btn.setAttribute("data-value", btnData.name);
      btn.addEventListener("click", function () {
        changeStopGameButton(btn.getAttribute("data-value"));
        BCONFIG.currentStopGame = btnData;
        var label = document.getElementById("settingsStopValue");
        if (label) label.textContent = btnData.name;
        var all = stopActions.querySelectorAll(".menu-btn");
        for (var k = 0; k < all.length; k++) all[k].classList.remove("is-active");
        btn.classList.add("is-active");
      });
      stopActions.appendChild(btn);
    })(BCONFIG.stopGame[s]);
  }

  wrap.appendChild(top);
  wrap.appendChild(divider);
  wrap.appendChild(bottom);
  wrap.appendChild(divider2);
  wrap.appendChild(jumpLabel);
  wrap.appendChild(jumpActions);
  wrap.appendChild(divider3);
  wrap.appendChild(stopLabel);
  wrap.appendChild(stopActions);
  board.appendChild(wrap);
  return AValue;
}

export { getCurrentTheme, changeTheme, saveThemeOnClient };

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dark") !== null) {
    changeTheme("dark");
  }
});
