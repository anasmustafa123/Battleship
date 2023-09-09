import { show, hide } from "./popup";
const startTheGame = () => {
  hide("game-start");
  const targetObject =
    document.querySelector(".grids-container").firstElementChild;
  const clonedObject = targetObject.cloneNode(true);
  targetObject.parentNode.replaceChild(clonedObject, targetObject);
  show("enemy-grid");
  let player1Grid =
    document.querySelector(".grids-container").firstElementChild;
  player1Grid.classList.add("gameon");
  return player1Grid;
};
export { startTheGame };
