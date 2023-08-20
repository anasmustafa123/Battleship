import { ship } from "../scripts/ship";
import { point } from "../scripts/point";

test("ship --> isSunk --> normal case", () => {
  let spoint = point(0, 0);
  let alignment = "h"; 
  let ship1 = ship(3, spoint, alignment);
  expect(ship1.isSunk()).toBe(false);
  let hitPoint1 = point(0, 0);
  let hitPoint3 = point(0, 1);
  let hitPoint4 = point(0, 2);
  expect(ship1.isHit(hitPoint1)).toBe(true);
  expect(ship1.isHit(hitPoint3)).toBe(true);
  expect(ship1.isHit(hitPoint4)).toBe(true);
  expect(ship1.isSunk()).toBe(true);
});

test("ship --> isHit ---> normalcase", () => {
  let spoint = point(0, 0);
  let alignment = "v";
  let ship1 = ship(3, spoint, alignment);
  let hitPoint1 = point(0, 0);
  let hitPoint3 = point(2, 0);
  let hitPoint4 = point(3, 0);
  expect(ship1.isHit(hitPoint1)).toBe(true);
  expect(ship1.isHit(hitPoint3)).toBe(true);
  expect(ship1.isHit(hitPoint4)).toBe(false);
});

test("ship --> isHit ---> cascading points", () => {
  let spoint = point(3, 3);
  let alignment = "h";
  let hitPoint1 = point(3, 5);
  let ship1 = ship(5, spoint, alignment);
  expect(ship1.isHit(hitPoint1)).toEqual(true);
  expect(ship1.isHit(hitPoint1)).toEqual(null);
});

test("ship --> isHit ---> cascading points", () => {
  let spoint = point(0, 5);
  let alignment = "h";
  let hitPoint1 = point(2, 6); 
  let ship1 = ship(5, spoint, alignment);
  expect(ship1.isHit(hitPoint1)).toEqual(false);
  expect(ship1.isHit(hitPoint1)).toEqual(false);
});

test("ship --> hitCount --> normaltest", () => {
  let spoint = point(0, 0);
  let alignment = "h";
  let ship1 = ship(3, spoint, alignment);
  expect(ship1.getHitCount()).toBe(0);
  let hitPoint1 = point(0, 0);
  ship1.isHit(hitPoint1);
  expect(ship1.getHitCount()).toBe(1);
  let hitPoint3 = point(0, 3);
  ship1.isHit(hitPoint3);
  expect(ship1.getHitCount()).toBe(1);
});
