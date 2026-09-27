const nofityTypes = {
  success: { color: "#2f7d32", bg: "#dcfce7" },
  error: { color: "#b91c1c", bg: "#fee2e2" },
  warning: { color: "#92400e", bg: "#fef3c7" },
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
