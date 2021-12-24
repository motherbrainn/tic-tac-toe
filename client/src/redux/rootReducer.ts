import { combineReducers } from "redux";

import boardReducer from "./Board/board.reducer";

const rootReducer = combineReducers({
  boardReducer: boardReducer,
});

export default rootReducer;
