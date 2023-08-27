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
      console.log('player1 won')
    }
    if(player1.isLost()){
      console.log('player2 won')
    }
    console.log({turn});
    if (turn === 1) {
      if (!player2.isLost()) {
        console.log('player1 make a move')
        player1.requestAnAttack();
      }
    } else if (turn === 2) {
      if (!player1.isLost()) {
        console.log('player2  make a move')
        player2.requestAnAttack();
      }
    }
  };
  const continueGame = () => {
    turn = turn === 1 ? 2 : 1;
    nexMove();
  };
  return { continueGame, startGame };
};
export {game};
