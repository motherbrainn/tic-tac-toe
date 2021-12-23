const turnDecider = (currentPlayerId, playerArray) => {
  const nextPlayerIndex =
    playerArray.findIndex((e) => e === currentPlayerId) + 1;

  if (nextPlayerIndex > playerArray.length - 1) {
    return 0;
  } else {
    return nextPlayerIndex;
  }
};
