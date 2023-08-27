import { selectShips } from "../scripts/dom/input-ships";

test("select a ship ---> all ships there", () => {
  let inputShips = selectShips();
  expect(inputShips.getNextSelectedShip()).toEqual(5);
  expect(inputShips.isOutOfShips()).toBe(false);
}); 

test("select a ship ---> removing some ships", () => {
  let inputShips = selectShips();
  expect(inputShips.getNextSelectedShip()).toEqual(5);
  expect(inputShips.updateSelectedShip()).toBe(5);
  expect(inputShips.getNextSelectedShip()).toEqual(4);
  expect(inputShips.updateSelectedShip()).toBe(4);
  expect(inputShips.isOutOfShips()).toBe(false);
});

test("outofships --> select all ships", () => {
  let inputShips = selectShips();
  expect(inputShips.getNextSelectedShip()).toEqual(5);
  expect(inputShips.updateSelectedShip()).toBe(5);
  expect(inputShips.getNextSelectedShip()).toEqual(4);
  expect(inputShips.updateSelectedShip()).toBe(4);
  expect(inputShips.getNextSelectedShip()).toEqual(3);
  expect(inputShips.updateSelectedShip()).toBe(3);
  expect(inputShips.getNextSelectedShip()).toEqual(3);
  expect(inputShips.updateSelectedShip()).toBe(3);
  expect(inputShips.getNextSelectedShip()).toEqual(2);
  expect(inputShips.updateSelectedShip()).toBe(2);
  expect(inputShips.isOutOfShips()).toBe(true); 
});

test ('get ship name', () => {
  let inputShips = selectShips();
  expect (inputShips.getShipName(inputShips.getNextSelectedShip())).toBe('Carrier');
  inputShips.updateSelectedShip();
  expect (inputShips.getShipName(inputShips.getNextSelectedShip())).toBe('BattleShip');
  inputShips.updateSelectedShip()
  expect (inputShips.getShipName(inputShips.getNextSelectedShip())).toBe('Cruiser');
  inputShips.updateSelectedShip()
  expect (inputShips.getShipName(inputShips.getNextSelectedShip())).toBe('Submarine');
  inputShips.updateSelectedShip()
  expect (inputShips.getShipName(inputShips.getNextSelectedShip())).toBe('Destroyer');
})