import {
  SET_GAME_BOARD_STATE,
  SET_ACTIVE_TURN,
  SET_ROOM,
  SET_PLAYERS,
  RESET_STATE,
} from "./board.types";

export const setBoardState = (
  rowId: string,
  columnId: number,
  socketId: number
) => {
  return {
    type: SET_GAME_BOARD_STATE,
    payload: { rowId: rowId, columnId: columnId, socketId: socketId },
  };
};

export const setActiveTurn = (playerId: string) => {
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

export const setPlayers = (playerId: string) => {
  return {
    type: SET_PLAYERS,
    payload: { playerId: playerId },
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};
