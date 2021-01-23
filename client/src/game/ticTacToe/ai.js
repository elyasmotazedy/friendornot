// based on https://freecontent.manning.com/classic-computer-science-problems-in-swift-tic-tac-toe/

export class Board {
  // by default the board is empty and X goes first
  constructor(position = Array(9).fill(0), turn = 'x') {
    this.position = position;
    this.turn = turn;
  }

  opositeTurn() {
    return this.turn === 'x' ? 'o' : 'x';
  }

  // location can be 0-8, indicating where to move
  // return a new board with the move played
  move(location) {
    var tempPosition = this.position.slice();
    tempPosition[location] = this.turn;

    return new Board(tempPosition, this.opositeTurn());
  }

  // the legal moves in a position are all of the empty squares
  legalMoves() {
    const moves = [];

    for (let i in this.position) {
      if (!this.position[i]) {
        moves.push(i);
      }
    }

    return moves;
  }

  //
  isWin() {
    return (this.position[0] && this.position[0] === this.position[1] && this.position[0] === this.position[2]) // row 0
      || (this.position[3] && this.position[3] === this.position[4] && this.position[3] === this.position[5]) // row 1
      || (this.position[6] && this.position[6] === this.position[7] && this.position[6] === this.position[8]) // row 2
      || (this.position[0] && this.position[0] === this.position[3] && this.position[0] === this.position[6]) // col 0
      || (this.position[1] && this.position[1] === this.position[4] && this.position[1] === this.position[7]) // col 1
      || (this.position[2] && this.position[2] === this.position[5] && this.position[2] === this.position[8]) // col 2
      || (this.position[0] && this.position[0] === this.position[4] && this.position[0] === this.position[8]) // diag 0
      || (this.position[2] && this.position[2] === this.position[4] && this.position[2] === this.position[6]) // diag 1
    ;
  }

  //
  isDraw() {
    return !this.isWin() && this.legalMoves().length === 0;
  }
}

const minimax = (board, maximizing, originalPlayer) => {
  // base case - evaluate the position if it is a win or a draw
  if (board.isWin() && originalPlayer === board.opositeTurn()) { // win
    return 1;
  } else if (board.isWin() && originalPlayer !== board.opositeTurn()) { // loss
    return -1;
  } else if (board.isDraw()) { // draw
    return 0;
  }

  // recursive case - maximize your gains or minimize the opponent's gains
  if (maximizing) {
    var bestEval = Number.MIN_SAFE_INTEGER;

    for (let move of board.legalMoves()) {
      const result = minimax(board.move(move), false, originalPlayer);
      bestEval = Math.max(result, bestEval);
    }

    return bestEval;
  } else { // minimizing
    var worstEval = Number.MAX_SAFE_INTEGER;

    for (let move of board.legalMoves()) {
      const result = minimax(board.move(move), true, originalPlayer);
      worstEval = Math.min(result, worstEval);
    }

    return worstEval;
  }
}

// run minimax on every possible move to find the best one
export const findBestMove = (board) => {
  var bestEval = Number.MIN_SAFE_INTEGER;
  var bestMove = -1;

  for (let move of board.legalMoves()) {
    const result = minimax(board.move(move), false, board.turn);

    if (result > bestEval) {
      bestEval = result;
      bestMove = move;
    }
  }

  return bestMove;
}
