import { player } from "./player";
import { gridEventListner } from "./dom/GameGridEventListner";
const human = (name) => {
  let gameEnemy;
  let currentGame;
  let turn = false;
  let lastResult = null;
  let proto = Object.create(player(name));
  const enemyAttack = (attackPoint) => {
    let result = proto.board.receiveAttack(attackPoint);
    return result;
  };
  const restart = () => {
    turn = false;
    lastResult = null;
    proto.board.clearBoard();
  };
  const isLost = () => {
    return proto.board.isAllSank();
  };
  const setGame = (enemy, game, playerGrid) => {
    gameEnemy = enemy;
    currentGame = game;
    if (playerGrid) {
      gridEventListner(playerGrid, makeAnAttack, continueGame);
    }
  };
  const requestAnAttack = () => {
    turn = true;
  };
  const makeAnAttack = (attackPoint) => {
    if (turn) {
      lastResult = gameEnemy.enemyAttack(attackPoint);
      return lastResult;
    } else {
      return null;
    }
  };
  const continueGame = () => {
    turn = false;
    currentGame.continueGame();
  };
  const getLastAttackResult = () => lastResult;
  /*here: addEventListners & check if turn is true */
  return Object.assign(proto, {
    getLastAttackResult,
    requestAnAttack,
    makeAnAttack,
    enemyAttack,
    isLost,
    setGame,
    restart,
  });
};
export { human };
