import { gameBoard } from "./game-board";
import { RandomShips } from "./randomShips";
const player = (name) => {
  let playerBoard = gameBoard();
  let proto = {
    dropRandomShips(shipsNumber){
      RandomShips().dropRandomShipsCoordinates(shipsNumber, playerBoard)
    }
  };
  return Object.create(proto, { name: { value: name }, board: {value: playerBoard}  });
};
export { player };
