export interface StateType {
  roomId: string;
  boardState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  playerState: [];
  activeTurn: string[];
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
