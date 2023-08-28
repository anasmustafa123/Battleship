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
    let queryPoint = coordinateToPoint(queryValue);
    pointsArr = pointsArr.filter((value) => {
      return value != queryValue;
    });
    return queryPoint;
  };
  const coordinateToPoint = (coordinate) => point(parseInt(coordinate / 10), parseInt(coordinate % 10))
  const requestAnAttack = () => {
    let randomPoint;
    console.log("randomPoint")
    if(possiblePoints.isEmpty()){
      console.log("------> empty")
      randomPoint = ChooseRandomAttackPoint();
    }else{
      console.log("------> not empty")
      let randomCoordinate = possiblePoints.getLastPoint();
      console.log({randomCoordinate})
      randomPoint = coordinateToPoint(randomCoordinate);
      console.log({randomPoint})
    }
    lastResult = gameEnemy.enemyAttack(randomPoint);
    if(lastResult){ console.log("started")
    /* possiblePoints.clearAll();  */
    possiblePoints.addAdjacentPoints(randomPoint.x*10 + randomPoint.y, pointsArr);
    let queryValue = randomPoint.x*10 + randomPoint.y;
    pointsArr = pointsArr.filter((value) => {
      return value != queryValue;
    });
    }
    while(lastResult === null){
      randomPoint = ChooseRandomAttackPoint();
      lastResult = gameEnemy.enemyAttack(randomPoint);
    }

    /* let randomPoint = ChooseRandomAttackPoint();
    lastResult = gameEnemy.enemyAttack(randomPoint); 
    while(lastResult === null){
      randomPoint = ChooseRandomAttackPoint();
      lastResult = gameEnemy.enemyAttack(randomPoint);*/
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
    possiblePoints = nearestPoints();
    console.log(possiblePoints)
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
