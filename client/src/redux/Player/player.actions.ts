import { CREATE_PLAYER } from "./player.types";

export const createPlayer = (playerId: number) => {
  return {
    type: CREATE_PLAYER,
    payload: { playerId: playerId },
  };
};
