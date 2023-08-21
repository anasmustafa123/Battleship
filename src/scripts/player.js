import { gameBoard } from "./game-board";

const player = (name) => {
  let playerBoard = gameBoard();
  let proto = {
    attack(attackPoint, player) {
      return player.enemyAttack(attackPoint);
    },
  };
  return Object.create(proto, { name: { value: name }, board: {value: playerBoard}  });
};
export { player };
