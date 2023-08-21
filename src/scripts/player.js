import { gameBoard } from "./game-board";

const player = (name) => {
  let playerBoard = gameBoard();
  let proto = {
    attack(attackPoint, player) {
      return player.board.receiveDamage(attackPoint);
    },
  };
  return Object.create(proto, { name: { value: name }, board: {value: playerBoard}  });
};
export { player };
