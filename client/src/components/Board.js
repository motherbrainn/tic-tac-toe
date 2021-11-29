import { React } from "react";
import BoardRow from "./BoardRow";
import styled from "styled-components";

import { io } from "socket.io-client";

export const socket = io("http://localhost:8080");

const StyledBoard = styled.div``;

const Board = () => {
  return (
    <StyledBoard>
      <BoardRow rowId={0} />
      <BoardRow rowId={1} />
      <BoardRow rowId={2} />
    </StyledBoard>
  );
};

export default Board;
