import { point } from "./point";
import { ship } from "./ship";
const RandomShips = () => {
  let board = Array(100).fill(0);
  const getRandomAlignment = () => {
    let randomAlignment = Math.ceil(Math.random() * 4);
    return randomAlignment == 1 || randomAlignment == 2 ? "h" : "v";
  };
  const dropRandomShipsCoordinates = (shipSizes, gameBoard) => {
    /* inputships: ships [0, 0, 1, 2, 1, 1] */
    /* gameboard :  isValidPlace */
    shipSizes.filter((value, index) => {
      while (shipSizes[index]--) {
        placeRandomShip(
          index,
          getRandomPoint(index),
          getRandomAlignment(),
          gameBoard
        );
      }
    });
  };
  const placeRandomShip = (shipLength, sPoint, alignment, gameBoard) => {
    while (!gameBoard.isValidPlace(sPoint, alignment, shipLength)) {
      sPoint = getRandomPoint(shipLength);
    }
    if (!gameBoard.placeShip(sPoint, ship(shipLength, sPoint, alignment))) {
    }
  };
  const filterBoard = (shipLength, alignment) => {
    return board.filter((value, index) => {
      if (alignment == "v") {
        let x = index > 9 ? Math.floor(index / 10) : 0;
        return x + shipLength <= 10;
      } else {
        let y = index > 9 ? Math.floor(index % 10) : index;
        return y + shipLength <= 10;
      }
    });
  };
  const getRandomPoint = (shipLength) => {
    let filteredBoard = filterBoard(shipLength);
    let randomIndex = Math.floor(Math.random() * filteredBoard.length);
    return point(Math.floor(randomIndex / 10), Math.floor(randomIndex % 10));
  };
  return {
    filterBoard,
    getRandomPoint,
    dropRandomShipsCoordinates,
    placeRandomShip,
  };
};

export { RandomShips };
