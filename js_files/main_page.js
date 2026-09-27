import displayDevData from "./dev.js";
import { printNotify } from "./notfications.js";
import displayPlayGround from "./playG.js";
import displaySettings from "./settings.js";

var currentDisplay = null;

function getPlayGround() {
  if (currentDisplay === "pg") return;
  var cd = displayPlayGround("pg");
  currentDisplay = cd;
}

function getDeveloperData() {
  if (currentDisplay === "dg") return;
  var cd = displayDevData("dg");
  currentDisplay = cd;
}

function getScoreBoard() {
  printNotify("You are offline current time", "warning");
}

function getSettingsBoard() {
  if (currentDisplay === "sg") return;
  var cd = displaySettings("sg");
  currentDisplay = cd;
}

export { getDeveloperData, getPlayGround, getScoreBoard, getSettingsBoard };
