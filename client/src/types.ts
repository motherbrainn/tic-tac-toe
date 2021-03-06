export type boardState = [["", "", ""], ["", "", ""], ["", "", ""]];

export interface StateType {
  roomId: string;
  boardState: boardState;
  playerState: string[];
  activeTurn: string;
  winner: string;
  time: number;
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

export enum ReducerAction {
  SET_GAME_BOARD_STATE = "SET_GAME_BOARD_STATE",
  SET_ACTIVE_TURN = "SET_ACTIVE_TURN",
  SET_ROOM = "SET_ROOM",
  SET_PLAYERS = "SET_PLAYERS",
  RESET_STATE = "RESET_STATE",
  INCREMENT_TIMER = "INCREMENT_TIMER",
  RESET_TIMER = "RESET_TIMER",
}
