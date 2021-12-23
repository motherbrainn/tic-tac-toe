import React from "react";
import styled from "styled-components";
import { useContextState } from "../utils/StateContext";
import { socket } from "../connection/socket";

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  background-color: grey;
  color: black;
  border-radius: 5px;
`;

const Box = ({ rowId, columnId }) => {
  const state = useContextState();
  const onClickHandler = () => {
    const copyOfBoard = [...state.board[0]];
    copyOfBoard[rowId][columnId] = "x";

    //emit the state we want to update up to the server
    //then send state down to clients
    //clients should listen for event from server and set state
    socket.emit("update-board-client", copyOfBoard);
    socket.emit("player-turn-taken-client", socket.id);
  };
  return (
    <StyledBox onClick={() => onClickHandler()}>
      {state.board[0][rowId][columnId]}
    </StyledBox>
  );
};

export default Box;
