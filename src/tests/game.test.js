import { human } from "../scripts/player-human";
import { ai } from "../scripts/player-ai";
import { game } from "../scripts/game";
import { point } from "../scripts/point";
import { ship } from "../scripts/ship";

test("game ---> pl1 hitting the water", () => {
  let player1 = human('anas'); 
  let player2 = ai(); 
  let sPoint2 = point(0, 5);
  let newGame = game(player1, player2);
  newGame.startGame(newGame);
  player1.makeAnAttack(sPoint2);
  expect(player1.getLastAttackResult()).toBe(false); 
});

test("game ---> pl1 hitting pl2 ship", () => {
    let player1 = human('anas'); 
    let player2 = ai(); 
    let sPoint2 = point(0, 5);
    let newGame = game(player1, player2);
    newGame.startGame(newGame);
    expect(player2.board.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);
    player1.makeAnAttack(sPoint2);
    expect(player1.getLastAttackResult()).toBe(4); 
});

test("game ---> pl1 hitting same coordinates twise", () => {
    let player1 = human('anas'); 
    let player2 = ai(); 
    let sPoint2 = point(0, 5);
    let newGame = game(player1, player2);
    newGame.startGame(newGame);
    expect(player2.board.placeShip(sPoint2, ship(4, sPoint2, "h"))).toBe(true);
    player1.makeAnAttack(sPoint2);
    expect(player1.getLastAttackResult()).toBe(4); 
    player1.makeAnAttack(sPoint2);
    expect(player1.getLastAttackResult()).toBe(null); 
});