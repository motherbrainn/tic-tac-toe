import { combineReducers } from "redux";
import boardReducer from "./Board/board.reducer";
import playerReducer from "./Player/player.reducer";

const rootReducer = combineReducers({
  boardReducer: boardReducer,
  playerReducer: playerReducer,
});

export default rootReducer;
