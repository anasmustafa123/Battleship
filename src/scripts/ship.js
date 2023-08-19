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
      if (alignment == "h") {
        if (hitPoint.x != sPoint.x) returnValue = false;
      } else if (alignment == "v") {
        if (hitPoint.y != sPoint.y) returnValue = false;
      }
      if (pointDistance >= 0 && pointDistance < length) {
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
  return { length, isHit, isSunk, getHitCount };
};

export { ship };
