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
    if(ships[selectedShip] > 0){
        ships[selectedShip]--;
        return selectedShip;
    };
    return false;
  };
  const getShipName = () => {
    if(ships[3] == 1){return "Submarine"}
    let shipNames = {
      5: "Carrier",
      4: "BattleShip",
      3: "Cruiser",
      2: "Destroyer"
    }
    return shipNames[getNextSelectedShip()];
  }
  return { getNextSelectedShip, isOutOfShips, updateSelectedShip, getShipName };
};
export { selectShips };
