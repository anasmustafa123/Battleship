import { gameBoard } from "../scripts/game-board";
import { ship } from "../scripts/ship";
import { point } from "../scripts/point";

test("place a ship", () => {
  let gameBoard1 = gameBoard();
  let sPoint1 = point(4, 6);
  let sPoint2 = point(0, 7);
  expect(gameBoard1.placeShip(sPoint1, ship(6, sPoint1, "v"))).toEqual(true);
  expect(gameBoard1.placeShip(sPoint2, ship(3, sPoint2, "h"))).toEqual(true);
});

test("recive an attack ----> normal_vertical - miss", () => {
  let gameBoard1 = gameBoard(); 
  let attackPoint1 = point(7, 6);
  expect(gameBoard1.receiveAttack(attackPoint1)).toBe(false);
});

test("recive an attack ----> normal_vertical -- hit", () => {
  let gameBoard1 = gameBoard();
  let attackPoint1 = point(7, 6);
  let sPoint1 = point(5, 6);
  expect(gameBoard1.placeShip(sPoint1, ship(5, sPoint1, "v"))).toBe(true);
  expect(gameBoard1.receiveAttack(attackPoint1)).toEqual(5);
});

test("recive an attack ----> normal_h -- hit", () => {
  let gameBoard1 = gameBoard();
  let sPoint2 = point(0, 5);
  let attackPoint4 = point(0, 6);
  expect(gameBoard1.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);
  expect(gameBoard1.receiveAttack(attackPoint4)).toEqual(4);
});

test("recive an attack ----> attacking the same point", () => {
  let gameBoard1 = gameBoard();
  let sPoint2 = point(0, 5);
  let attackPoint4 = point(0, 6);
  let attackPoint5 = point(3, 8);
  expect(gameBoard1.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);
  expect(gameBoard1.receiveAttack(attackPoint4)).toEqual(4);
  expect(gameBoard1.receiveAttack(attackPoint4)).toEqual(null);
  expect(gameBoard1.receiveAttack(attackPoint5)).toEqual(false);
});

test("all sank --> empty ", () => {
  let gameBoard1 = gameBoard();
  expect(gameBoard1.isAllSank()).toBe(true);
});

test("all sank --> 1 ship ", () => {
  let gameBoard1 = gameBoard();
  let sPoint2 = point(0, 5);
  expect(gameBoard1.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);
  expect(gameBoard1.isAllSank()).toBe(false);
});
test("all sank --> 1 ship ", () => {
  let gameBoard1 = gameBoard();
  let sPoint2 = point(0, 5);
  expect(gameBoard1.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);

  expect(gameBoard1.receiveAttack(point(0, 5))).toEqual(4);
  expect(gameBoard1.receiveAttack(point(0, 6))).toEqual(4);
  expect(gameBoard1.receiveAttack(point(0, 7))).toEqual(4);
  expect(gameBoard1.receiveAttack(point(0, 8))).toEqual(4);
  expect(gameBoard1.receiveAttack(point(0, 9))).toEqual(false);
  expect(gameBoard1.receiveAttack(point(0, 9))).toEqual(null);
  expect(gameBoard1.isAllSank()).toBe(true);
});
