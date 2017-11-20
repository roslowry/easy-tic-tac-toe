**** Tic-Tac-Toe ****

1. Open the "tic-tac-toe" folder and run "index.html" in the browser. Proceed to play!

Approach:

  This implementation of tic-tac-toe employs a 'TicTacToe' constructor function in the 'tic-tac-toe.js- file', which creates a 'game' instance. The instantiation of the game invokes the prototypal method 'createGameBoard', which, in turn, invokes the prototypal 'addPlayListeners' method. The 'addPlayListeners' methods creates 'click' listeners that trigger the prototypal 'markCell' method, causing user's click events to update the cells with an 'X'. Among the other prototypal methods are: a 'toggleTurn' function to change the marker to 'X' or 'O' based on whether the user or computer will make a move; a 'checkWinner' function used after moves are made; an 'announceWinner' method to update the DOM with the outcome of the game; and a 'findAdjacentCell' to embed some ( exceedingly simple!) logic for the computer's moves. Currently, the computer's only strategic logic is to search for unused adjacent cells. Potential enhancements to this game could include:

  - a 'winGame' method to  see if there are any open boxes that would allow a computer to complete a column/row/diagonal
  - a 'blockUser' method to prevent the user from making a game-winning move.

  Consider this an 'easy-mode' ego-booster for someone who would like a few more 'wins' in their life : )
