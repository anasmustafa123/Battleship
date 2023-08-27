import { player } from "./player";
import { point } from "./point";
import { styleElement } from "./dom/GameGridEventListner";
const ai = () => {
  let lastResult = null;
  let gameEnemy;
  let currentGame;
  let grid;
  const fillArray = (len) => {
    let pointsArr = [];
    for (let i = 0; i < len; i++) {
      pointsArr.push(i);
    }
    return pointsArr;
  };
  let pointsArr = fillArray(100);
  let proto = Object.create(player("ai"));
  const ChooseRandomAttackPoint = () => {
    let query = Math.floor(Math.random() * (pointsArr.length-1));
    let queryValue = pointsArr[query];
    let queryPoint = point(parseInt(queryValue / 10), parseInt(queryValue % 10));
    pointsArr = pointsArr.filter((value) => {
      return value != queryValue;
    });
    return queryPoint;
  };
  const requestAnAttack = () => {
    let randomPoint = ChooseRandomAttackPoint();
    lastResult = gameEnemy.enemyAttack(randomPoint);
    while(lastResult === null){
      randomPoint = ChooseRandomAttackPoint();
      lastResult = gameEnemy.enemyAttack(randomPoint);
    }
    if (grid) {
      styleElement(grid, randomPoint, lastResult)
    }
    currentGame.continueGame();
    return lastResult;
  };
  
  const enemyAttack = (attackPoint) => {
    let result = proto.board.receiveAttack(attackPoint);
    return result;
  };
  const isLost = () => {
    return proto.board.isAllSank();
  };
  const setGame = (enemy, game, playerGrid) => {
    gameEnemy = enemy;
    currentGame = game;
    grid = playerGrid;
  };
  const getLastAttackResult = () => lastResult;

  return Object.assign(proto, {
    getLastAttackResult,
    requestAnAttack,
    enemyAttack,
    isLost,
    setGame,
  });
};
export { ai };
