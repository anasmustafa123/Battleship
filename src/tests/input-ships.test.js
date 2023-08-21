import { selectShips } from "../scripts/dom/input-ships";

test("select a ship ---> all ships there", () => {
  let inputShips = selectShips();
  expect(inputShips.getNextSelectedShip()).toEqual(5);
  expect(inputShips.isOutOfShips()).toBe(false);
});

test("select a ship ---> removing some ships", () => {
  let inputShips = selectShips();
  inputShips.ships[5]--;
  expect(inputShips.getNextSelectedShip()).toEqual(4);
  inputShips.ships[4]--;
  expect(inputShips.getNextSelectedShip()).toEqual(3);
  expect(inputShips.isOutOfShips()).toBe(false);
});

test("outofships --> select all ships", () => {
  let inputShips = selectShips();
  inputShips.ships[5]--;
  inputShips.ships[4]--;
  inputShips.ships[3]--;
  inputShips.ships[3]--;
  inputShips.ships[2]--;
  expect(inputShips.isOutOfShips()).toBe(true);
});
