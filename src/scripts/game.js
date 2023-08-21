const game = (p1, p2) => {
  let turn = 1;
  let player1 = p1;
  let player2 = p2;
  const startGame = (game) => {
    player1.setGame(player2, game);
    player2.setGame(player1, game);
    nexMove();
 }
  const nexMove = () => {
    if (turn === 1) {
      if (player2.lastResult != null) {
        /*here: result of player2 attack -- notneeded
           result fo player1 receiveAttack ---to update player1 ships-grid */
      }
      if (!player2.isLost()) {
        player1.requestAnAttack();
      } else {
        /* here end the game */
      }
    } else if (turn === 2) {
      if (player1.lastResult != null) {
        /*here: result of player1 attack --> update player1 attacking-grid
               result fo player2 receiveAttack ---*/
      }
      if (!player1.isLost()) {
        player2.requestAnAttack();
      } else {
        /*here:  end the game */
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
