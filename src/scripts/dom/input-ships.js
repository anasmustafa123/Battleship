const selectShips = () => {
  let ships = [0, 0, 1, 2, 1, 1];
  let outOfShips = false;
  let selectedShip;
  const getNextSelectedShip = () => {
    let key = 5;
    while (ships[key] == 0 && key > 0) {
      key--;
    }
    if (key == 0) {
      outOfShips = true;
    }
    selectedShip = key;
    return key;
  };
  const isOutOfShips = () => {
    getNextSelectedShip();
    return outOfShips;
  };
  const removeSelectedShip = () => {
    if(ships[selectedShip] > 0){
        ships[selectedShip]--;
        return selectedShip;
    };
    return false;
  };
  return { getNextSelectedShip, isOutOfShips, removeSelectedShip };
};
export { selectShips };
