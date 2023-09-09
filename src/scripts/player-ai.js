import { player } from "./player";
import { point } from "./point";
import { styleElement } from "./dom/GameGridEventListner";
import { nearestPoints } from "./nearestPoints";
const ai = () => {
  let lastResult = null;
  let gameEnemy;
  let currentGame;
  let grid;
  let possiblePoints;
  let goodMovesCount = 0;
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
    let query = parseInt(Math.random() * pointsArr.length);
    let queryValue = pointsArr[query];
    let queryPoint = coordinateToPoint(queryValue);
    pointsArr = pointsArr.filter((value) => {
      return value != queryValue;
    });
    console.log(
      `random point: ${queryPoint.x}, ${queryPoint.y} queryValue: ${queryValue}`
    );
    return queryPoint;
  };
  const coordinateToPoint = (coordinate) =>
    point(parseInt(coordinate / 10), parseInt(coordinate % 10));
  const requestAnAttack = () => {
    let randomPoint;
    if (possiblePoints.isEmpty()) {
      randomPoint = ChooseRandomAttackPoint();
    } else {
      let randomCoordinate = possiblePoints.getLastPoint(goodMovesCount);
      if (randomCoordinate == null) {
        randomPoint = ChooseRandomAttackPoint();
        goodMovesCount = 0;
      } else {
        goodMovesCount--;
        randomPoint = coordinateToPoint(randomCoordinate);
      }
    }
    lastResult = gameEnemy.enemyAttack(randomPoint);
    while (lastResult === null) {
      randomPoint = ChooseRandomAttackPoint();
      lastResult = gameEnemy.enemyAttack(randomPoint);
    }
    if (lastResult) {
      possiblePoints.clearRedundant(randomPoint, goodMovesCount);
      goodMovesCount = possiblePoints.addAdjacentPoints(
        randomPoint.x * 10 + randomPoint.y,
        pointsArr
      );
      let queryValue = randomPoint.x * 10 + randomPoint.y;
      pointsArr = pointsArr.filter((value) => {
        return value != queryValue;
      });
    } else {
      goodMovesCount = goodMovesCount > 0 ? goodMovesCount - 1 : goodMovesCount;
    }
    if (grid) {
      styleElement(grid, randomPoint, lastResult);
    }
    currentGame.continueGame();
    return lastResult;
  };
  const restart = () => {
    lastResult = null;
    goodMovesCount = 0;
    pointsArr = fillArray(100);
    proto.board.clearBoard();
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
    possiblePoints = nearestPoints();
  };
  const getLastAttackResult = () => lastResult;

  return Object.assign(proto, {
    getLastAttackResult,
    requestAnAttack,
    enemyAttack,
    isLost,
    setGame,
    restart,
  });
};
export { ai };
