import { StringDecoder } from "string_decoder";

export interface StateType {
  roomId: string;
  boardState: [["", "", ""], ["", "", ""], ["", "", ""]];
  playerState: [];
  activeTurn: string[];
  winner: string;
}

//this type is not right
export interface DispatchType {
  setGameBoardState?: (
    rowId: number,
    columnId: number,
    socketId: number
  ) => {
    type: string;
    payload: { rowId: number; columnId: number; socketId: string };
  };
  createPlayer?: (playerId: number) => {
    type: string;
    payload: { playerId: string };
  };
  setActiveTurn?: (playerId: number) => {
    type: string;
    payload: { playerId: string };
  };
  setRoom?: (roomId: string) => { type: string; payload: { roomId: string } };
}
