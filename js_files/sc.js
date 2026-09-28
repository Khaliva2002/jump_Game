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
