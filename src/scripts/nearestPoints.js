import { point } from "./point";

const nearestPoints = () => {
  let heap = [];
  let tempHeap = [];
  const isExist = (point, pointsArr) => {
    return pointsArr.find((element) => element == point);
  };
  const addAdjacentPoints = (thePoint, pointsArr) => {
    let newPoints = [thePoint + 1, thePoint + 10, thePoint - 1, thePoint - 10];
    newPoints.forEach((newPoint) => {
      console.log(isExist(newPoint, pointsArr))
      if (newPoint < 100 && newPoint > 0 && isExist(newPoint, pointsArr)) {
        heap.push(newPoint);
      }
    });
  };
  const getLastPoint = () => heap.splice(heap.length - 1, 1);
  const clearAll = () => {
    heap.splice(0, heap.length);
  };
  const isEmpty = () => heap.length == 0;
  return { isExist, addAdjacentPoints, getLastPoint, clearAll, isEmpty };
};
export { nearestPoints };
