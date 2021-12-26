import { SET_GAME_BOARD_STATE } from "./board.types";

const INITIAL_STATE = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_GAME_BOARD_STATE:
      console.log("reducer called");
      const copyOfBoardState = [...state];
      copyOfBoardState[action.payload.rowId][action.payload.columnId] =
        action.payload.socketId;
      return copyOfBoardState;
    default:
      return state;
  }
};

export default reducer;
