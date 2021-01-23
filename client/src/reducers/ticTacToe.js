import {
  SET_X_WIN,
  SET_O_WIN,
  SET_DRAW,
  MAKE_MOVE,
  CREATE_NEW_GAME,
  RESET_GAME_STATE,
  SET_WHO_MOVE_FIRST,
  SET_GAME_MODE,
  SET_AI_TURN,
} from "../actions/types";

const initialState = {
  isGameEnd: false,
  xWinCounter: 0,
  oWinCounter: 0,
  drawCounter: 0,
  squares: Array(9).fill(null),
  isTurnX: true,
  isPvP: false,
  player: null,
  isTurnAI: false,
  winner: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_X_WIN:
      return {
        ...state,
        xWinCounter: state.xWinCounter + 1,
        isGameEnd: true,
        isTurnX: false,
        isTurnAI: state.player === "x",
        winner: "x",
      };

    case SET_O_WIN:
      return {
        ...state,
        oWinCounter: state.oWinCounter + 1,
        isGameEnd: true,
        isTurnX: true,
        isTurnAI: state.player === "o",
        winner: "o",
      };

    case SET_DRAW:
      return {
        ...state,
        drawCounter: state.drawCounter + 1,
        isGameEnd: true,
        isTurnAI: !state.isTurnX && state.player === "x",
        winner: false,
      };

    case CREATE_NEW_GAME:
      return {
        ...state,
        squares: Array(9).fill(null),
        isGameEnd: false,
        player:
          (state.isTurnX && !state.isTurnAI) ||
          (!state.isTurnX && state.isTurnAI)
            ? "x"
            : "o",
      };

    case RESET_GAME_STATE:
      return { ...initialState };

    case SET_WHO_MOVE_FIRST:
      return {
        ...state,
        isTurnX: action.isXMoveFirst,
        squares: Array(9).fill(null),
        isGameEnd: false,
        player:
          (state.isTurnX && !state.isTurnAI) ||
          (!state.isTurnX && state.isTurnAI)
            ? "x"
            : "o",
      };

    case MAKE_MOVE:
      return {
        ...state,
        squares: action.squares,
        isTurnX: !state.isTurnX,
      };

    case SET_GAME_MODE:
      return {
        ...state,
        isPvP: action.isPvp,
      };

    case SET_AI_TURN:
      return {
        ...state,
        isTurnAI: action.isTurnAI,
      };

    default:
      return state;
  }
}
