import { boardState } from "../types";

export const turnDecider = (currentPlayerId: string, playerArray: string[]) => {
  const nextPlayerIndex =
    playerArray.findIndex((e) => e === currentPlayerId) + 1;

  if (nextPlayerIndex > playerArray.length - 1) {
    return playerArray[0];
  } else {
    return playerArray[nextPlayerIndex];
  }
};

//returns id of winning player
export const checkForWinner = (boardState: boardState): string => {
  //horizontal wins
  if (
    boardState[0][0] !== "" &&
    boardState[0][1] !== "" &&
    boardState[0][2] !== "" &&
    boardState[0][0] === boardState[0][1] &&
    boardState[0][0] === boardState[0][2]
  ) {
    return boardState[0][0];
  }
  if (
    boardState[1][0] !== "" &&
    boardState[1][1] !== "" &&
    boardState[1][2] !== "" &&
    boardState[1][0] === boardState[1][1] &&
    boardState[1][0] === boardState[1][2]
  ) {
    return boardState[1][0];
  }
  if (
    boardState[2][0] !== "" &&
    boardState[2][1] !== "" &&
    boardState[2][2] !== "" &&
    boardState[2][0] === boardState[2][1] &&
    boardState[2][0] === boardState[2][2]
  ) {
    return boardState[2][0];
  }
  //vertical wins
  if (
    boardState[0][0] !== "" &&
    boardState[1][0] !== "" &&
    boardState[2][0] !== "" &&
    boardState[0][0] === boardState[1][0] &&
    boardState[0][0] === boardState[2][0]
  ) {
    return boardState[0][0];
  }
  if (
    boardState[0][1] !== "" &&
    boardState[1][1] !== "" &&
    boardState[2][1] !== "" &&
    boardState[0][1] === boardState[1][1] &&
    boardState[0][1] === boardState[2][1]
  ) {
    return boardState[0][1];
  }
  if (
    boardState[0][2] !== "" &&
    boardState[1][2] !== "" &&
    boardState[2][2] !== "" &&
    boardState[0][2] === boardState[1][2] &&
    boardState[0][2] === boardState[2][2]
  ) {
    return boardState[0][2];
  }
  //diagonal wins
  if (
    boardState[0][0] !== "" &&
    boardState[1][1] !== "" &&
    boardState[2][2] !== "" &&
    boardState[0][0] === boardState[1][1] &&
    boardState[0][0] === boardState[2][2]
  ) {
    return boardState[0][0];
  }
  if (
    boardState[0][2] !== "" &&
    boardState[1][1] !== "" &&
    boardState[2][0] !== "" &&
    boardState[0][2] === boardState[1][1] &&
    boardState[0][2] === boardState[2][0]
  ) {
    return boardState[0][2];
  }
  if (
    boardState[0][0] !== "" &&
    boardState[0][1] !== "" &&
    boardState[0][2] !== "" &&
    boardState[1][0] !== "" &&
    boardState[1][1] !== "" &&
    boardState[1][2] !== "" &&
    boardState[2][0] !== "" &&
    boardState[2][1] !== "" &&
    boardState[2][2] !== ""
  ) {
    return "tie";
  } else return "";
};

export const showBoardSymbol = (socketId: string, playerArray: string[]) => {
  if (socketId === playerArray[0]) {
    return "X";
  }
  if (socketId === playerArray[1]) {
    return "O";
  } else {
    return "";
  }
};
