const selectShips = () => {
  let ships = [0, 0, 1, 2, 1, 1];
  let outOfShips = false;
  const getNextSelectedShip = () => {
    let key = 5;
    while (ships[key] == 0 && key > 0) {
      key--;
    }
    if (key == 0) {
      outOfShips = true;
    }
    return key;
  };
  const isOutOfShips = () => {
    getNextSelectedShip();
    return outOfShips;
  };
  return { getNextSelectedShip, isOutOfShips, ships };
};
export { selectShips };
