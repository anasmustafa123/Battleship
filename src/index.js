import { ai } from "./scripts/player-ai";
import { human } from "./scripts/player-human";
import { game } from "./scripts/game";
import "./styles/game.css";
import { createGrid, createEmptyGrid } from "./scripts/dom/createPlayerGrid";
import { addAllEventListeners } from "./scripts/dom/addEventListners";
import { startTheGame } from "./scripts/dom/startTheGame";
import { show, hide } from "./scripts/dom/popup";

addAllEventListeners();
let backgroundSong = new Audio("./assets/sounds/background_song.mp3");
backgroundSong.volume=0.4; 
let player1Name;
document
  .querySelector("form.introduction-container")
  .addEventListener("submit", (e) => {
    e.preventDefault(); 
    backgroundSong.play();
    player1Name = document.getElementById("playerName").value;
    hide("introduction-container");
    show("ships-input-container");
    show("shipdropping");
    show("grids-container");
  });
backgroundSong.addEventListener("ended", () => {
  backgroundSong.currentTime = 0;
  backgroundSong.play();
});

let player1 = human(player1Name);
let player2 = ai();
const gridsContainer = document.querySelector('.grids-container');
let player1tempGrid = createGrid(100, player1.board, ['player-grid']);
console.log(player1tempGrid)
gridsContainer.appendChild(player1tempGrid);
let player2Grid = createEmptyGrid(["ships-input-grid", "enemy-grid", "hide"],'grid-coordinate')
gridsContainer.appendChild(player2Grid);
console.log(player1tempGrid.childNodes)


let startBtn = document.querySelector("button.game-start");
startBtn.addEventListener("click", () => {
  player2.dropRandomShips([0, 0, 1, 2, 1, 1]);
  let player1Grid = startTheGame();
  let player1Gridx = document.querySelector('.ships-input-grid.player-grid');
  let player2Gridx = document.querySelector('.ships-input-grid.enemy-grid');
  console.log(player2Gridx)
  console.log(player1Gridx)
  let newGame = game(player1, player2Gridx, player2, player1Grid);
  newGame.startGame(newGame);
})
