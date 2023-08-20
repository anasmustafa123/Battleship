const ship = (length, sPoint, alignment) => {
  let returnValue;
  let hitCount = 0;
  let grid = Array(length).fill(0);
  const getHitCount = () => hitCount;
  const distance = (hitPoint) => {
    return hitPoint.x - sPoint.x + (hitPoint.y - sPoint.y);
  };
  const isHit = (hitPoint) => {
    let pointDistance = distance(hitPoint);
    if (grid[pointDistance] == 1) returnValue = null;
    else {
      let valid = false;
      if (alignment == "h") {
        if (hitPoint.x != sPoint.x) returnValue = false;
        else valid = true;
      } else if (alignment == "v") {
        if (hitPoint.y != sPoint.y) returnValue = false;
        else valid = true;
      }
      if (pointDistance >= 0 && pointDistance < length && valid ) {
        returnValue = true;
      } else returnValue = false;
    }
    if (returnValue) {
      grid[pointDistance] = 1;
      hitCount++;
    }
    return returnValue;
  };
  const isSunk = () => {
    return hitCount === length ? true : false;
  };
  return { length, sPoint, alignment, isHit, isSunk, getHitCount };
};

export { ship };
