export const turnDecider = (currentPlayerId: number, playerArray: number[]) => {
  const nextPlayerIndex =
    playerArray.findIndex((e) => e === currentPlayerId) + 1;

  if (nextPlayerIndex > playerArray.length - 1) {
    return 0;
  } else {
    return nextPlayerIndex;
  }
};
