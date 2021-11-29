import React from "react";
import styled from "styled-components";
import { useContextState } from "../utils/StateContext";

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
    state.board[1](copyOfBoard);
    console.log(state);
  };
  return (
    <StyledBox onClick={() => onClickHandler()}>
      {state.board[0][rowId][columnId]}
    </StyledBox>
  );
};

export default Box;
