import { SET_GAME_BOARD_STATE } from "./board.types";

const INITIAL_STATE = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_GAME_BOARD_STATE:
      const copyOfBoardState = [...state];
      copyOfBoardState[action.payload.rowId][action.payload.columnId] = 1;
      return copyOfBoardState;

    default:
      return state;
  }
};

export default reducer;
