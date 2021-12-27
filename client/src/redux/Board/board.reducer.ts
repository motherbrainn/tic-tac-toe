import { SET_GAME_BOARD_STATE, CREATE_PLAYER } from "./board.types";
import { checkForWinner } from "../../utils/utilityFunctions";
import { Player } from "../../classes/player";

const INITIAL_STATE = {
  boardState: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  playerState: [],
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_GAME_BOARD_STATE:
      const copyOfBoardState = [...state.boardState];
      //checkForWinner()
      copyOfBoardState[action.payload.rowId][action.payload.columnId] =
        action.payload.socketId;
      return { ...state, boardState: copyOfBoardState };
    case CREATE_PLAYER:
      return {
        ...state,
        playerState: [
          ...state.playerState,
          new Player(action.payload.playerId),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
