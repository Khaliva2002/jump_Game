const developer = {
  name: "Abdelrhman Khalifa",
  age: "1-12-2002",
  text: "Indie game developer. I build fun browser games with HTML, CSS and JavaScript.",
  realAge: 0,
  calcAge: function () {
    var parts = this.age.split("-");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);
    var birth = new Date(year, month, day);
    var now = new Date();
    var result = now.getFullYear() - birth.getFullYear();
    var m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      result--;
    }
    this.realAge = result;
    return result;
  },
};

developer.calcAge();

export default function displayDevData(AValue) {
  var board = document.querySelector(".play-board");
  if (!board) return;

  if (window.__devTimer) {
    clearInterval(window.__devTimer);
    window.__devTimer = null;
  }

  board.innerHTML = "";

  var card = document.createElement("div");
  card.className = "dev-card edu-font";

  var title = document.createElement("h2");
  title.className = "dev-title";
  title.textContent = "Developer";

  var nameLine = document.createElement("p");
  nameLine.className = "dev-name";

  var textLine = document.createElement("p");
  textLine.className = "dev-text";

  var caret = document.createElement("span");
  caret.className = "dev-caret";
  caret.textContent = "|";
  textLine.appendChild(caret);

  card.appendChild(title);
  card.appendChild(nameLine);
  card.appendChild(textLine);
  board.appendChild(card);

  var nameStr = "Name: " + developer.name + " | Age: " + developer.realAge;
  var fullStr = nameStr + " " + developer.text;
  var i = 0;

  window.__devTimer = setInterval(function () {
    if (!document.body.contains(textLine)) {
      clearInterval(window.__devTimer);
      window.__devTimer = null;
      return;
    }
    i++;
    var shown = fullStr.slice(0, i);
    if (i <= nameStr.length) {
      nameLine.textContent = shown;
      textLine.childNodes[0].textContent = "";
    } else {
      nameLine.textContent = nameStr;
      textLine.childNodes[0].textContent = shown.slice(nameStr.length + 1);
    }
    if (i >= fullStr.length) {
      clearInterval(window.__devTimer);
      window.__devTimer = null;
    }
  }, 35);
  return AValue;
}
