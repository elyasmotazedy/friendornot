import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import xImage from "./images/x.png";
import oImage from "./images/o.png";
import { resetGameState, createNewGame } from "../../actions/ticTacToe";
import PieceChooser from "./PieceChooser";
import "./ticTacToe.css";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  resetGame() {
    if (!this.props.isGameEnd) {
      this.props.resetGame();
    } else {
      clearTimeout(this.timeout);
      this.props.createNewGame();
    }
  }

  handleGameEnd() {
    this.timeout = setTimeout(this.props.createNewGame, 1500);
  }

  openSettings() {}

  render() {
    return (
      <div className="game-wrap">
        <PieceChooser />

        <div className="status">
          <div className="status-o">
            <span className="win-counter">
              {this.props.oWinCounter}{" "}
              {this.props.oWinCounter < 2 ? "win" : "wins"}
            </span>
          </div>
          <div className="status-x">
            <span className="win-counter">
              {this.props.xWinCounter}{" "}
              {this.props.xWinCounter < 2 ? "win" : "wins"}
            </span>
          </div>
          <div className="status-d">
            <span className="win-counter">
              {this.props.drawCounter}{" "}
              {this.props.drawCounter < 2 ? "draw" : "draws"}
            </span>
          </div>
          <div className="buttons-wrap">
            <button
              className="button-reset"
              onClick={() => this.resetGame()}
            ></button>
          </div>
        </div>

        <Board onGameEnd={() => this.handleGameEnd()} />

        <div className="move-status-wrap">
          <div className="move-status">
            <span
              className={
                "x-move" +
                (this.props.isTurnX && !this.props.isGameEnd ? " active" : "")
              }
            >
              <img src={xImage} alt="x" />
            </span>
            <span
              className={
                "o-move" +
                (!this.props.isTurnX && !this.props.isGameEnd ? " active" : "")
              }
            >
              <img src={oImage} alt="o" />
            </span>
          </div>
        </div>

        {/* <div className="buttons-wrap"> */}
        {/* <button className="button-reset" onClick={() => this.resetGame()}></button> */}
        {/* <div className="game-mode-status">{this.props.isPvP ? '2 Players' : '1 Player'}</div> */}
        {/* <button className="button-config" onClick={() =>this.openSettings()}></button> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    xWinCounter: state.ticTacToe.xWinCounter,
    oWinCounter: state.ticTacToe.oWinCounter,
    drawCounter: state.ticTacToe.drawCounter,
    isTurnX: state.ticTacToe.isTurnX,
    isGameEnd: state.ticTacToe.isGameEnd,
    isPvP: state.ticTacToe.isPvP,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch(resetGameState()),
    createNewGame: () => {
      dispatch(createNewGame());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
