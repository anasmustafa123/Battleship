import { player } from "./player";
const human = (name) => {
  let gameEnemy;
  let currentGame;
  let turn = false;
  let lastResult = null;
  let proto = Object.create(player("name"));
  const enemyAttack = (attackPoint) => {
    let result = proto.board.receiveAttack(attackPoint);
    return result;
  };
  const isLost = () => {
    return proto.board.isAllSank();
  };
  const setGame = (enemy, game) => {
    gameEnemy = enemy;
    currentGame = game;
  };
  const requestAnAttack = () => {
    turn = true;
  };
  const makeAnAttack = (attackPoint) => {
    lastResult = proto.attack(attackPoint, gameEnemy);
    turn = false;
    /* here: game.nextMove() */
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
  });
};
export { human };