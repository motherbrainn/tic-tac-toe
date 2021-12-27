import { SET_GAME_BOARD_STATE, CREATE_PLAYER } from "./board.types";

export const setBoardState = (
  rowId: number,
  columnId: number,
  socketId: number
) => {
  return {
    type: SET_GAME_BOARD_STATE,
    payload: { rowId: rowId, columnId: columnId, socketId: socketId },
  };
};

export const createPlayer = (playerId: number) => {
  return {
    type: CREATE_PLAYER,
    payload: { playerId: playerId },
  };
};
