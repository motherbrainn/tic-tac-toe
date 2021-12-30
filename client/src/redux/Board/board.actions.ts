import {
  SET_GAME_BOARD_STATE,
  CREATE_PLAYER,
  SET_ACTIVE_TURN,
  SET_ROOM,
} from "./board.types";

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

export const setActiveTurn = (playerId: number) => {
  return {
    type: SET_ACTIVE_TURN,
    payload: { playerId: playerId },
  };
};

export const setRoom = (roomId: string) => {
  return {
    type: SET_ROOM,
    payload: { roomId: roomId },
  };
};
