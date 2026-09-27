const spaceButton = { name: "Space", code: "Space" };
const enterButton = { name: "Enter", code: "Enter" };
const backSpaceButton = { name: "Back-Space", code: "Backspace" };
const escapeButton = { name: "escape", code: "Escape" };
const leftClick = { name: "Left-Click", code: 0 };
const rightClick = { name: "Right-Click", code: 2 };

export default BCONFIG = {
  jump: [spaceButton, enterButton, leftClick, rightClick],
  stopGame: [escapeButton, backSpaceButton],
};
