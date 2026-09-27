const spaceButton = { name: "Space", code: "Space" };
const enterButton = { name: "Enter", code: "Enter" };
const backSpaceButton = { name: "Back-Space", code: "Backspace" };
const escapeButton = { name: "escape", code: "Escape" };
const leftClick = { name: "Left-Click", code: 0 };
const rightClick = { name: "Right-Click", code: 2 };

const BCONFIG = {
  jump: [spaceButton, enterButton, leftClick, rightClick],
  stopGame: [escapeButton, backSpaceButton],
  currentJump: spaceButton,
  currentStopGame: escapeButton,
};

function changeJumpButton(nameButton) {
  const newButton = BCONFIG.jump.filter((e) => e.name == nameButton);
  if (newButton.length > 0) {
    const b = newButton[0];
    BCONFIG.currentJump = b;
  }
}
function changeStopGameButton(nameButton) {
  const newButton = BCONFIG.stopGame.filter((e) => e.name == nameButton);
  if (newButton.length > 0) {
    const b = newButton[0];
    BCONFIG.currentStopGame = b;
  }
}

export default BCONFIG;
export { changeJumpButton, changeStopGameButton };
