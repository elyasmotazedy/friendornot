import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";
import { makeMove, setAITurn, setXWin, setOWin, setDraw } from "../../actions/ticTacToe";
import { Board as GameBoard, findBestMove } from "./ai";

export class Board extends Component {
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], a + '-' + c];
      }
    }

    return [squares.filter(square => square === null).length === 0, false];
  }

  handleClick(i, ai = false) {
    if (this.props.isGameEnd || this.props.squares[i] !== null || (!ai && !this.props.isPvP && this.props.isTurnAI)) {
      return;
    }

    const squares = this.props.squares.slice();
    squares[i] = this.props.isTurnX ? 'x' : 'o';

    this.props.makeMove(squares);

    const [winner] = this.calculateWinner(squares);

    if (winner) {
      this.props.setWinner(winner);

      this.props.onGameEnd();
    } else if (!this.props.isPvP && !ai) {
      this.props.setAITurn(true);
    }
  }

  aiMove() {
    if (!this.props.isGameEnd && !this.props.isPvP && this.props.isTurnAI) {
      const move = this.props.squares.filter(square => square).length === 0 ? Math.floor(Math.random() * 8) : findBestMove(new GameBoard(this.props.squares, this.props.isTurnX ? 'x' : 'o'));

      this.handleClick(move, true);
      this.props.setAITurn(false);
    }
  }

  componentDidUpdate() {
    this.aiMove();
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let winningLineClass = "";

    if (this.props.isGameEnd) {
      const [, dir] = this.calculateWinner(this.props.squares);

      if (dir) {
        winningLineClass = " winning-line-wrap-" + dir;
      }
    }

    return (
      <div className="board-wrap">
        <div className={"winning-line-wrap" + winningLineClass}>
          <div className="winning-line" />
        </div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    squares: state.ticTacToe.squares,
    isTurnX: state.ticTacToe.isTurnX,
    isPvP: state.ticTacToe.isPvP,
    isTurnAI: state.ticTacToe.isTurnAI,
    isGameEnd: state.ticTacToe.isGameEnd,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeMove: squares => {
      dispatch(makeMove(squares));
    },
    setAITurn: isTurnAI => {
      dispatch(setAITurn(isTurnAI));
    },
    setWinner: (winner) => {
      if (winner === 'x') {
        dispatch(setXWin());
      } else if (winner === 'o') {
        dispatch(setOWin());
      } else {
        dispatch(setDraw());
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
