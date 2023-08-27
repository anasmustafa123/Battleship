import { show, hide } from "./popup";
const startTheGame = () => {
  return new Promise((resolve, reject) => {
    /* start the game window */
    let startBtn = document.querySelector("button.game-start");
    startBtn.addEventListener("click", () => {
      hide("game-start");
      const targetObject =
        document.querySelector(".grids-container").firstElementChild;
      const clonedObject = targetObject.cloneNode(true);
      targetObject.parentNode.replaceChild(clonedObject, targetObject);
      show("enemy-grid");
      let player1Grid = document.querySelector(".grids-container").firstElementChild;
      player1Grid.classList.add("gameon");
      resolve(player1Grid);
    });
  });
};
export { startTheGame };
