import { selectShips } from "./input-ships";
import { ship } from "../ship";
import { point } from "../point";
import { show, hide } from "./popup";

const createEmptyGrid = (classList, componentClassName) => {
  const newGrid = document.createElement("main");
  classList.forEach(className => newGrid.classList.add(className));
  let i = 0;
  while(i < 100){
    const component = document.createElement("div");
    component.setAttribute('key', i);
    component.className = componentClassName;
    newGrid.appendChild(component);
    i++;
  }
  return newGrid;
}
const createCoordinate = (key, playerBoard, shipsInput) => {
  let shipCoordinate = point(parseInt(key / 10), parseInt(key % 10));
  const coordinate = document.createElement("div");
  let alignment = getCurrentAlignment();
  let shipLength = shipsInput.getNextSelectedShip();
  coordinate.setAttribute("key", key);
  shipLength = shipsInput.getNextSelectedShip();
  coordinate.classList.add("grid-coordinate");
  coordinate.addEventListener("mouseover", () => {
    alignment = getCurrentAlignment();
    shipLength = shipsInput.getNextSelectedShip();
    if (
      isAvalidCoordinate(
        playerBoard,
        shipsInput,
        shipCoordinate,
        alignment,
        shipLength
      )
    ) {
      remvoeClassNameToTheShip("invalid", key, alignment, shipLength);
      addClassNameToTheShip("hover", key, alignment, shipLength);
    } else {
      addClassNameToTheShip("invalid", key, alignment, shipLength);
    }
  });
  coordinate.addEventListener("mouseout", () => {
    remvoeClassNameToTheShip("hover", key, alignment, shipLength);
  });
  coordinate.addEventListener("click", () => {
    if (dropTheShip(playerBoard, shipLength, shipCoordinate, alignment)) {
      addClassNameToTheShip("ship", key, alignment, shipLength);
      shipsInput.updateSelectedShip();
      document.querySelector('.ships-input-prompt').setAttribute("name", `${shipsInput.getShipName()}`)
      if(shipsInput.isOutOfShips()){
        hide('shipdropping');
        show('header-name');
        show("game-start");
      }
    }
  });
  return coordinate;
};

const dropTheShip = (playerBoard, shipLength, shipCoordinate, alignment) => {
  let newShip = ship(shipLength, shipCoordinate, alignment);
  return playerBoard.placeShip(shipCoordinate, newShip);
};
const isAvalidCoordinate = (
  playerBoard,
  shipsInput,
  shipCoordinate,
  alignment,
  shipLength
) => {
  return playerBoard.isValidPlace(shipCoordinate, alignment, shipLength);
};

const addClassNameToTheShip = (className, key, alignment, selectedShip) => {
  let arr = getShipsCoordinates(key, alignment, selectedShip);
  arr.map((coordinate) => {
    if (coordinate) coordinate.classList.add(className);
  });
};
const remvoeClassNameToTheShip = (className, key, alignment, selectedShip) => {
  let arr = getShipsCoordinates(key, alignment, selectedShip);
  arr.map((coordinate) => {
    if (coordinate) coordinate.classList.remove(className);
  });
};
const getShipsCoordinates = (key, alignment, selectedShip) => {
  let arr = [];
  let inc = alignment == "h" ? 1 : 10;
  while (selectedShip--) {
    arr.push(document.querySelector(`[key = "${key}"]`));
    key += inc;
  }
  return arr;
};

const createGrid = (size, playerGameBoard, classList) => {
  const shipsGridContainer = document.createElement('main');
  shipsGridContainer.classList.add("ships-input-grid")
  if(classList){
    classList.forEach(className => {
      shipsGridContainer.classList.add(className);
    })
  }
  let shipsInput = selectShips();
  for (let i = 0; i < size; i++) {
    shipsGridContainer.appendChild(
      createCoordinate(i, playerGameBoard, shipsInput)
    );
  }
  return shipsGridContainer;
};
const getCurrentAlignment = () => {
  const rotateShipBtn = document.querySelector(".rotate-ship");
  return rotateShipBtn.getAttribute("value");
};
export { createGrid, createEmptyGrid };
