import { point } from "../point";
const gridEventListner = (playerGrid, checker, continutheGame) => {
  playerGrid.querySelectorAll(".grid-coordinate").forEach((element) => {
    element.addEventListener("click", () => {
      let key = parseInt(element.getAttribute("key"));
      let attackPoint = point(parseInt(key / 10), parseInt(key % 10));
      let result = checker(attackPoint);
      if (result != null) {
        styleTheResult(element, result);
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
export { gridEventListner, styleElement };
