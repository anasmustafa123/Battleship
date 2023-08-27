import { hide, show } from "./popup";
const addAllEventListeners = () => {
  /* ship alignment event listneres  */
  const shipPlacementToggleBtn = document.querySelector(".rotate-ship");
  shipPlacementToggleBtn.addEventListener("click", () => {
    if (shipPlacementToggleBtn.getAttribute("value") == "h") {
      shipPlacementToggleBtn.setAttribute("value", "v");
      shipPlacementToggleBtn.querySelector(".sticky-rotate").textContent =
        "vertical";
    } else {
      shipPlacementToggleBtn.setAttribute("value", "h");
      shipPlacementToggleBtn.querySelector(".sticky-rotate").textContent =
        "horizontal";
    }
  });

  /* start the game window */
  let startBtn = document.querySelector("button.game-start");
  startBtn.addEventListener("click", () => {
    hide("game-start");
    const targetObject = document.querySelector(".grids-container").firstElementChild;
    console.log(targetObject)
    const clonedObject = targetObject.cloneNode(true);
    console.log(clonedObject)
    targetObject.parentNode.replaceChild(clonedObject, targetObject);
    show("enemy-grid");
    let player1Grid = document.querySelector(".grids-container").firstElementChild;
    console.log(player1Grid)
    player1Grid.classList.add("gameon");
  });
};
export { addAllEventListeners };
