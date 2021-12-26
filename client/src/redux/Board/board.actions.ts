import { SET_GAME_BOARD_STATE } from "./board.types";

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
