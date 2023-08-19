import { point } from "../scripts/point";

test ('point', () => {
    expect(point(2,3)).toEqual({x: 2, y:3});
})