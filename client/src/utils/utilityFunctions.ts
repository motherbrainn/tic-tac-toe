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
  console.log(boardState);
  //horizontal wins
  if (
    boardState[0][0] !== 0 &&
    boardState[0][1] !== 0 &&
    boardState[0][2] !== 0 &&
    boardState[0][0] === boardState[0][1] &&
    boardState[0][0] === boardState[0][2]
  ) {
    console.log("win: ");
    return boardState[0][0];
  }
  if (
    boardState[1][0] !== 0 &&
    boardState[1][1] !== 0 &&
    boardState[1][2] !== 0 &&
    boardState[1][0] === boardState[1][1] &&
    boardState[1][0] === boardState[1][2]
  ) {
    console.log("win: ");
    return boardState[0][0];
  }
  if (
    boardState[2][0] !== 0 &&
    boardState[2][1] !== 0 &&
    boardState[2][2] !== 0 &&
    boardState[2][0] === boardState[2][1] &&
    boardState[2][0] === boardState[2][2]
  ) {
    console.log("win: ");
    return boardState[0][0];
  }
  //vertical wins
  if (
    boardState[0][0] !== 0 &&
    boardState[1][0] !== 0 &&
    boardState[2][0] !== 0 &&
    boardState[0][0] === boardState[1][0] &&
    boardState[0][0] === boardState[2][0]
  ) {
    console.log("win: ");
    return boardState[0][0];
  }
  if (
    boardState[0][1] !== 0 &&
    boardState[1][1] !== 0 &&
    boardState[2][1] !== 0 &&
    boardState[0][1] === boardState[1][1] &&
    boardState[0][1] === boardState[2][1]
  ) {
    console.log("win: ");
    return boardState[0][1];
  }
  if (
    boardState[0][2] !== 0 &&
    boardState[1][2] !== 0 &&
    boardState[2][2] !== 0 &&
    boardState[0][2] === boardState[1][2] &&
    boardState[0][2] === boardState[2][2]
  ) {
    console.log("win: ");
    return boardState[0][2];
  }
  //diagonal wins
  if (
    boardState[0][0] !== 0 &&
    boardState[1][1] !== 0 &&
    boardState[2][2] !== 0 &&
    boardState[0][0] === boardState[1][1] &&
    boardState[0][0] === boardState[2][2]
  ) {
    console.log("win: ");
    return boardState[0][0];
  }
  if (
    boardState[0][2] !== 0 &&
    boardState[1][1] !== 0 &&
    boardState[2][0] !== 0 &&
    boardState[0][2] === boardState[1][1] &&
    boardState[0][2] === boardState[2][0]
  ) {
    console.log("win: ");
    return boardState[0][2];
  }
};
