import { ai } from "./scripts/player-ai";
import { human } from "./scripts/player-human";
import { game } from "./scripts/game";
import "./styles/game.css";
import { createGrid } from "./scripts/dom/createPlayerGrid";
import { addAllEventListeners } from "./scripts/dom/addEventListners";
import { startTheGame } from "./scripts/dom/startTheGame";
import { show, hide } from "./scripts/dom/popup";
addAllEventListeners();

/* document.querySelector('section.introduction-container button.proceed').addEventListener('click', () => {
    hide('introduction-container');
    show('shipdropping');
    show('grids-container');
}) */

let player1 = human("anas");
let player2 = ai();
let player1tempGrid = createGrid(100, player1.board);
player2.dropRandomShips([0, 0, 1, 2, 1, 1]);
let player2Grid = player1tempGrid.cloneNode(true);
player2Grid.classList.add("enemy-grid", "hide");
document.querySelector(".grids-container").appendChild(player2Grid);

startTheGame().then((player1Grid) => {
    let newGame = game(player1, player2Grid, player2, player1Grid); 
    newGame.startGame(newGame);
});
