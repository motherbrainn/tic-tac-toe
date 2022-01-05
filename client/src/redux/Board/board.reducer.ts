import {
  SET_GAME_BOARD_STATE,
  SET_ACTIVE_TURN,
  SET_ROOM,
  SET_PLAYERS,
  RESET_STATE,
} from "./board.types";
import { checkForWinner } from "../../utils/utilityFunctions";
import { StateType } from "../../types";

const INITIAL_STATE: StateType = {
  roomId: "",
  boardState: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  playerState: [],
  activeTurn: "",
  winner: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_GAME_BOARD_STATE:
      const copyOfBoardState = [...state.boardState];
      copyOfBoardState[action.payload.rowId][action.payload.columnId] =
        action.payload.socketId;
      return {
        ...state,
        boardState: copyOfBoardState,
        winner: checkForWinner(state.boardState),
      };
    case SET_PLAYERS:
      return {
        ...state,
        playerState: action.payload.playerId,
      };
    case SET_ACTIVE_TURN:
      return {
        ...state,
        activeTurn: action.payload.playerId,
      };
    case SET_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    case RESET_STATE:
      return {
        ...state,
        roomId: INITIAL_STATE.roomId,
        boardState: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        playerState: INITIAL_STATE.playerState,
        activeTurn: INITIAL_STATE.activeTurn,
        winner: INITIAL_STATE.winner,
      };
    default:
      return state;
  }
};

export default reducer;
