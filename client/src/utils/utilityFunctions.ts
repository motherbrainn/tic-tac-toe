import { Player } from "../classes/player";

export const turnDecider = (currentPlayerId: number, playerArray: number[]) => {
  const nextPlayerIndex =
    playerArray.findIndex((e) => e === currentPlayerId) + 1;

  if (nextPlayerIndex > playerArray.length - 1) {
    return 0;
  } else {
    return nextPlayerIndex;
  }
};

export const checkForWinner = (playerArray: Player[], boardState) => {
  console.log("playerArray: ", playerArray);
  console.log("boardState: ", boardState);
};
