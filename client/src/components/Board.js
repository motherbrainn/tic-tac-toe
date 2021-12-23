import { React, useEffect } from "react";
import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import { StateProvider, useContextState } from "../utils/StateContext";

const StyledBoard = styled.div``;

const Board = () => {
  const state = useContextState();
  socket.on("connect", () => console.log(socket));
  socket.on("update-board-server", (string) => state.board[1](string));
  socket.on("player-turn-taken-server", (string) =>
    state.playerTurn[1](string)
  );
  return (
    <StyledBoard>
      <BoardRow rowId={0} />
      <BoardRow rowId={1} />
      <BoardRow rowId={2} />
    </StyledBoard>
  );
};

export default Board;
