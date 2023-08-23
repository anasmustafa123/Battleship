const gameBoard = () => {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  let ships = {};
  const isValidPlace = (sPoint, alignment, length ) => {
    if (alignment == "h") {
      let y = sPoint.y;
      let len = length - 1;
      if (y + length > 10) return false;
      else {
        while (len >= 0) {
          if (board[sPoint.x][y + len] != null) {
            return false;
          }
          len--;
        }
        return true;
      }
    } else if (alignment == "v") {
      let len = length - 1;
      let x = sPoint.x;
      if (x + length > 10) return false;
      else {
        while (len >= 0) {
          if (board[x + len][sPoint.y] != null) {
            return false;
          }
          len--;
        }
        return true;
      }
    }
    return null;
  };
  const addAmove = (attackPoint, state) => {
    board[attackPoint.x][attackPoint.y] = state;
  };
  const placeShip = (sPoint, ship) => {
    let validPlace = isValidPlace(sPoint, ship.alignment, ship.length);
    if (validPlace) {
      let key = `${sPoint.x}:${sPoint.y}`;
      ships[key] = ship;
      let len = 0;
      while (len < ship.length) {
        let alignment = ship.alignment;
        if (alignment == "h") {
          board[sPoint.x][sPoint.y + len] = key;
        } else if (alignment == "v") {
          board[sPoint.x + len][sPoint.y] = key;
        }
        len++;
      }
      return true;
    }
    return false;
  };
  const attackTheShip = (attackPoint) => {
    let shipsArray = Object.values(ships);
    for (let i = 0; i < shipsArray.length; i++) {
      let ship = shipsArray[i];
      if (ship.isHit(attackPoint) == true) return;
    }
  };
  const receiveAttack = (attackPoint) => {
    if (board[attackPoint.x][attackPoint.y] == 0) return null;
    else if (board[attackPoint.x][attackPoint.y] == null) {
      addAmove(attackPoint, 0);
      return false;
    } else {
      let ship = ships[board[attackPoint.x][attackPoint.y]];
      addAmove(attackPoint, 0);
      attackTheShip(attackPoint);
      return ship.length;
    }
  };
  const isAllSank = () => {
    let shipsArray = Object.values(ships);
    for (let i = 0; i < shipsArray.length; i++) {
      let ship = shipsArray[i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };
  return { placeShip, receiveAttack, isAllSank, isValidPlace};
};

export { gameBoard };
