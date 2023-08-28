import { point } from "../point";
let hitSound = new Audio("../../assets/sounds/sank.mp3");
let missSound = new Audio("../../assets/sounds/miss.wav");
const gridEventListner = (playerGrid, checker, continutheGame) => {
  playerGrid.querySelectorAll(".grid-coordinate").forEach((element) => {
    element.addEventListener("click", () => {
      let key = parseInt(element.getAttribute("key"));
      let attackPoint = point(parseInt(key / 10), parseInt(key % 10));
      let result = checker(attackPoint);
      if (result != null) {
        styleTheResult(element, result);
        makeAttackSound(result);
        continutheGame();
      }
    });
  });
};
const styleElement = (playerGrid, attackPoint, result) => {
  let key = attackPoint.x * 10 + attackPoint.y;
  let element = playerGrid.querySelector(`[key = "${key}"]`);
  styleTheResult(element, result);
};

const styleTheResult = (element, result) => {
  if (result) {
    element.classList.add("hit");
  } else if (result == false) {
    element.classList.add("miss");
  }
};
const makeAttackSound = (result) => {
  if (!result) {
    hitSound.pause();
    missSound.currentTime = 1.5;
    missSound.play();
  } else {
    missSound.pause();
    hitSound.currentTime = 0;
    hitSound.play();
  }
};
export { gridEventListner, styleElement };
