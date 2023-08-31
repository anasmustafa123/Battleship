import { show, hide } from "../scripts/dom/popup";
import { createGrid, createEmptyGrid } from "./dom/createPlayerGrid";
const game = (p1, pl1Grid, p2, pl2Grid) => {
  let turn = 1;
  let player1 = p1;
  let player2 = p2;
  const startGame = (game) => {
    player1.setGame(player2, game, pl1Grid);
    player2.setGame(player1, game, pl2Grid);
    nexMove();    
 }
  const nexMove = () => {
    if(player2.isLost()){
      gameover(1);
    }
    if(player1.isLost()){
      gameover(2);
    }
    console.log({turn});
    if (turn === 1) {
      if (!player2.isLost()) {
        player1.requestAnAttack();
      }
    } else if (turn === 2) {
      if (!player1.isLost()) {
        player2.requestAnAttack();
      }
    }
  };
  const continueGame = () => {
    turn = turn === 1 ? 2 : 1;
    nexMove();
  };
  const gameover = (result) => {
    const gameOverHeading = document.querySelector('.gameover-box h1');
    if(result === 1){
      gameOverHeading.textContent = `Congratulation You Won`;
    }else if(result === 2){
      gameOverHeading.textContent =`You Lost`;
    }
    show('gameover');

  }
  const playAgainBtn = document.querySelector('button.play-again');
  playAgainBtn.addEventListener('click', () => { 
    player1.board.clearBoard();
    player2.board.clearBoard()
    const player1Grid = document.querySelector('.ships-input-grid.player-grid');
    const player2OldGrid = document.querySelector('.ships-input-grid.enemy-grid');
    const player2NewGrid =  createEmptyGrid(["ships-input-grid", "enemy-grid", "hide"],'grid-coordinate');
    player2OldGrid.parentNode.replaceChild(player2NewGrid, player2OldGrid);
    let newplayerGrid  = createGrid(100, player1.board, ['player-grid']);
    player1Grid.parentNode.replaceChild(newplayerGrid, player1Grid);
    hide('gameover');
    hide('ships-input-grid.enemy-grid');
    hide('header-name');
    show('shipdropping'); 
  })
  return { continueGame, startGame };
};
export {game};
