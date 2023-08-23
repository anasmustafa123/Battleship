const selectShips = () => {
  let ships = [0, 0, 1, 2, 1, 1];
  let selectedShip=5;
  const getNextSelectedShip = () => {
    let key = ships.length-1;
    while (ships[key] == 0 && key > 0) {
      key--;
    }
    selectedShip = key;
    return key;
  };
  const isOutOfShips = () => {
    return getNextSelectedShip() == 0;
  };
  const updateSelectedShip = () => {
    console.log(ships);
    if(ships[selectedShip] > 0){
        ships[selectedShip]--;
        return selectedShip;
    };
    return false;
  };
  return { getNextSelectedShip, isOutOfShips, updateSelectedShip };
};
export { selectShips };
