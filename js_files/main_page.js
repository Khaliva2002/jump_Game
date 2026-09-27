import displayDevData from "./dev.js";
import displayPlayGround from "./playG.js";

var currentDisplay = null;

function getPlayGround() {
  if (currentDisplay === "pg") return;
  const cd = displayPlayGround("pg");
  currentDisplay = cd;
}

function getDeveloperData() {
  if (currentDisplay === "dg") return;
  const cd = displayDevData("dg");
  currentDisplay = cd;
}

function getScoreBoard() {}

function getSettingsBoard() {}

export { getDeveloperData, getPlayGround, getScoreBoard, getSettingsBoard };
