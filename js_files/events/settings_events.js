import { saveThemeOnClient } from "../settings.js";

document.addEventListener("THEME_CHANGED", function () {
  saveThemeOnClient();
});
