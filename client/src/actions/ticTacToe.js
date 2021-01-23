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

export const setXWin = () => ({
  type: SET_X_WIN,
});

export const setOWin = () => ({
  type: SET_O_WIN,
});

export const setDraw = () => ({
  type: SET_DRAW,
});

export const createNewGame = () => ({
  type: CREATE_NEW_GAME,
});

export const resetGameState = () => ({
  type: RESET_GAME_STATE,
});

export const setWhoMoveFirst = (isXMoveFirst) => ({
  type: SET_WHO_MOVE_FIRST,
  isXMoveFirst: isXMoveFirst,
});

export const makeMove = (squares) => ({
  type: MAKE_MOVE,
  squares: squares,
});

export const setGameMode = (isPvp) => ({
  type: SET_GAME_MODE,
  isPvp: isPvp,
})

export const setAITurn = (isTurnAI) => ({
  type: SET_AI_TURN,
  isTurnAI: isTurnAI,
})
