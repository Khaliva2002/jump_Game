export let sc = 0;
export const val = 1;
export const t = 1;
export const scr = 1;

export function cSC(line) {
  if (line === "a ") _pSC();
  if (line === " m") _mSC();
}
function _pSC() {
  sc += val;
}
function _mSC() {
  sc -= val;
}
export function rts() {
  return sc;
}
export function ssz() {
  sc = 0;
  document.dispatchEvent(new CustomEvent("STD"));
}

export function esc(value) {
  var score = document.getElementById("playScore");
  if (!score) return;
  var text = String(value);
  while (text.length < 5) text = "0" + text;
  score.textContent = text;
}

var st = null;
export function sse() {
  var _0x1a2b = st && clearInterval(st),
    _0x3c4d = typeof t == "number" && t > 0 ? t * 1e3 : 1e3;
  st = setInterval(function () {
    (cSC("a "), esc(rts()));
  }, _0x3c4d);
  document.addEventListener(
    "STD",
    function () {
      if (st) {
        clearInterval(st);
        st = null;
      }
    },
    { once: true },
  );
}
