export interface StateType {
  roomId: string;
  boardState: [["", "", ""], ["", "", ""], ["", "", ""]];
  playerState: string[];
  activeTurn: string;
  winner: string;
}

export interface BoardReducerType {
  boardReducer: StateType;
}

export interface PropsType {
  setActiveTurn: (activeTurn: string) => {};
  setGameBoardState: (rowId: string, columnId: string, socketId: string) => {};
  setRoom: (roomId: string) => {};
  setPlayers: (players: string) => {};
  resetState: () => {};
  state: BoardReducerType;
}

//this type is not right
// export interface DispatchType {
//   setGameBoardState?: (
//     rowId: string,
//     columnId: string,
//     socketId: string
//   ) => {
//     type: string;
//     payload: { rowId: string; columnId: string; socketId: string };
//   };
//   setActiveTurn?: (playerId: string) => {
//     type: string;
//     payload: { playerId: string };
//   };
//   setRoom?: (roomId: string) => { type: string; payload: { roomId: string } };
// }

// export interface BoardActionsType {
// type:
// }
