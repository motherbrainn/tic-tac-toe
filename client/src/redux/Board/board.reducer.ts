import { ReducerAction } from "../../types";
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
  time: 0,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ReducerAction.SET_GAME_BOARD_STATE:
      const copyOfBoardState = [...state.boardState];
      copyOfBoardState[action.payload.rowId][action.payload.columnId] =
        action.payload.socketId;
      return {
        ...state,
        boardState: copyOfBoardState,
        winner: checkForWinner(state.boardState),
      };
    case ReducerAction.SET_PLAYERS:
      return {
        ...state,
        playerState: action.payload.playerId,
      };
    case ReducerAction.SET_ACTIVE_TURN:
      return {
        ...state,
        activeTurn: action.payload.playerId,
      };
    case ReducerAction.SET_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    case ReducerAction.RESET_STATE:
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
    case ReducerAction.INCREMENT_TIMER:
      return {
        ...state,
        time: state.time + 1,
      };

    case ReducerAction.RESET_TIMER:
      return {
        ...state,
        time: 0,
      };
    default:
      return state;
  }
};

export default reducer;
