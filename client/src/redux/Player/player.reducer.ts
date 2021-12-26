import { CREATE_PLAYER } from "./player.types";
import { Player } from "../../classes/player";

const INITIAL_STATE: Player[] = [];

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CREATE_PLAYER:
      return [...state, new Player(action.payload.playerId)];

    default:
      return state;
  }
};

export default reducer;
