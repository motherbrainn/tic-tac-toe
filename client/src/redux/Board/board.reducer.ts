import {
  SET_GAME_BOARD_STATE,
  CREATE_PLAYER,
  SET_ACTIVE_TURN,
} from "./board.types";
import { checkForWinner } from "../../utils/utilityFunctions";
import { Player } from "../../classes/player";

const INITIAL_STATE = {
  boardState: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  playerState: [],
  activeTurn: 0,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_GAME_BOARD_STATE:
      const copyOfBoardState = [...state.boardState];
      copyOfBoardState[action.payload.rowId][action.payload.columnId] =
        action.payload.socketId;
      checkForWinner(state.boardState);
      return { ...state, boardState: copyOfBoardState };
    case CREATE_PLAYER:
      return {
        ...state,
        playerState: [
          ...state.playerState,
          new Player(action.payload.playerId),
        ],
      };
    case SET_ACTIVE_TURN:
      return {
        ...state,
        activeTurn: action.payload.playerId,
      };
    default:
      return state;
  }
};

export default reducer;
