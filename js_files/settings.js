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

  wrap.appendChild(top);
  wrap.appendChild(divider);
  wrap.appendChild(bottom);
  board.appendChild(wrap);
  return AValue;
}

export { getCurrentTheme, changeTheme, saveThemeOnClient };

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dark") !== null) {
    changeTheme("dark");
  }
});
