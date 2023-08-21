import { player } from "./player";
import { point } from "./point";

const ai = () => {
  let lastResult = null;
  let gameEnemy;
  let currentGame;
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
    let query = Math.floor(Math.random() * pointsArr.length);
    let queryPoint = point(parseInt(query / 10), parseInt(query % 10));
    pointsArr = pointsArr.filter((value) => {
      return value != query;
    });
    return queryPoint;
  };
  const requestAnAttack = () => {
    /* null: not a valid attack, false: miss,  lengthOfShip: hit */
    lastResult = proto.attack(ChooseRandomAttackPoint(), gameEnemy);
    /* here:  game.nextmove()*/
    return lastResult;
  };
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
  return { lastResult, requestAnAttack, enemyAttack, isLost, setGame };
};
export { ai };
