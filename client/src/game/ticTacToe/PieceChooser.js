import React, { Component } from "react";
import { connect } from "react-redux";
import { setWhoMoveFirst } from "../../actions/ticTacToe";

export class PieceChooser extends Component {
  render() {
    return (
      <div className={'piece-chooser-wrap' + (!this.props.player ? '' : ' inactive')}>
        <h1>Which one you always choose?</h1>
        <div className="piece-chooser">
          <button className="side-o" onClick={() => this.props.choosePiece('o')}></button>
          <span>or</span>
          <button className="side-x" onClick={() => this.props.choosePiece('x')}></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.ticTacToe.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    choosePiece: (piece) => dispatch(setWhoMoveFirst(piece === 'x'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PieceChooser);
