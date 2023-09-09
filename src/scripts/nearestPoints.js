import { point } from "./point";

const nearestPoints = () => {
  let heap = [];
  let lastPoint = point(-1, -1);
  let guessedAlignment = null;
  const isExist = (point, pointsArr) => {
    return pointsArr.find((element) => element == point);
  };
  const addAdjacentPoints = (thePoint, pointsArr) => {
    let newPoints = [thePoint + 1, thePoint + 10, thePoint - 1, thePoint - 10];
    let count = 0;
    newPoints.forEach((newPoint) => {
      if (newPoint < 100 && newPoint > 0 && isExist(newPoint, pointsArr)) {
        heap.push(newPoint);
        count++;
      }
    });
    return count;
  };
  const getLastPoint = (goodMovesCount) => {
    if (goodMovesCount == 0 || guessedAlignment == null)
      return heap.splice(heap.length - 1, 1);
    for (let i = heap.length - 1; i > heap.length - goodMovesCount - 1; i--) {
      if (guessedAlignment == "h") {
        if (parseInt(heap[i] / 10) == lastPoint.x) {
          let lastHitPoint = heap.splice(i, 1);
          return lastHitPoint;
        }
      } else if (guessedAlignment == "v") {
        if (parseInt(heap[i] % 10) == lastPoint.y) {
          let lastHitPoint = heap.splice(i, 1);
          return lastHitPoint;
        }
      }
    }
    popAll(goodMovesCount);
    return null;
  };
  const popAll = (len) => {
    heap.splice(heap.length - len - 1, len);
  };
  const clearRedundant = (lastHitPoint, goodMovesCount) => {
    if (lastHitPoint.x == lastPoint.x) guessedAlignment = "h";
    else if (lastHitPoint.y == lastPoint.y) guessedAlignment = "v";
    else guessedAlignment = null;
    lastPoint = lastHitPoint;
    for (let i = heap.length - 1; i > heap.length - goodMovesCount - 1; i--) {
      if (guessedAlignment == "h" && parseInt(heap[i] / 10) != lastHitPoint.x) {
        heap[i] = -1;
      } else if (
        guessedAlignment == "v" &&
        parseInt(heap[i] % 10) != lastHitPoint.y
      ) {
        heap[i] = -1;
      }
    }
    heap = heap.filter((value) => {
      return value != -1;
    });
  };
  const isEmpty = () => heap.length == 0;
  return {
    isExist,
    addAdjacentPoints,
    getLastPoint,
    popAll,
    isEmpty,
    clearRedundant,
  };
};
export { nearestPoints };
