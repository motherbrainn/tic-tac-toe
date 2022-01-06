import { ReducerAction } from "../../types";

export const setBoardState = (
  rowId: number,
  columnId: number,
  socketId: string
) => {
  return {
    type: ReducerAction.SET_GAME_BOARD_STATE,
    payload: { rowId: rowId, columnId: columnId, socketId: socketId },
  };
};

export const setActiveTurn = (playerId: string) => {
  return {
    type: ReducerAction.SET_ACTIVE_TURN,
    payload: { playerId: playerId },
  };
};

export const setRoom = (roomId: string) => {
  return {
    type: ReducerAction.SET_ROOM,
    payload: { roomId: roomId },
  };
};

export const setPlayers = (playerId: string) => {
  return {
    type: ReducerAction.SET_PLAYERS,
    payload: { playerId: playerId },
  };
};

export const resetState = () => {
  return {
    type: ReducerAction.RESET_STATE,
  };
};

export const incrementTimer = () => {
  return {
    type: ReducerAction.INCREMENT_TIMER,
  };
};

export const resetTimer = () => {
  return {
    type: ReducerAction.RESET_TIMER,
  };
};
