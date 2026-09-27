const nofityTypes = {
  success: { color: "#2f7d32", bg: "#dcfce7" },
  error: { color: "#e71212", bg: "#fee2e2" },
  warning: { color: "#f17a31", bg: "#fef3c7" },
  info: { color: "#1e40af", bg: "#dbeafe" },
};

var trash = [];

function printNotify(text, type) {
  var root = document.getElementById("root");
  if (!root) return;

  var box = document.getElementById("notify-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "notify-box";
    root.appendChild(box);
  }

  var style = nofityTypes[type] || nofityTypes.info;

  var item = document.createElement("div");
  item.className = "notify-item";
  item.textContent = text;
  item.style.color = style.color;
  item.style.backgroundColor = style.bg;
  item.style.borderColor = style.color;

  box.appendChild(item);

  setTimeout(function () {
    item.classList.add("is-gone");
    trash.push(item);
    setTimeout(function () {
      var pos = trash.indexOf(item);
      if (pos !== -1) trash.splice(pos, 1);
      if (item.parentNode) item.parentNode.removeChild(item);
    }, 450);
    if (trash.length >= 5) {
      deleteNotify();
    }
  }, 5000);
}

function deleteNotify() {
  while (trash.length > 0) {
    var item = trash.shift();
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  }
}

export { printNotify };
