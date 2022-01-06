import styled from "styled-components";
import { socket } from "../connection/socket";
import { connect, ConnectedProps } from "react-redux";
import {
  setActiveTurn,
  setBoardState,
  resetTimer,
} from "../redux/Board/board.actions";
import { BoardReducerType } from "../types";
import { turnDecider, showBoardSymbol } from "../utils/utilityFunctions";
import { Dispatch } from "react";

interface Props extends PropsFromRedux {
  rowId: number;
  columnId: number;
}

const StyledBox = styled.div`
  width: 150px;
  height: 150px;
  margin: 1px;
  background-color: grey;
  color: black;
  border-radius: 3px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  font-size: 125px;
  cursor: pointer;
`;

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setGameBoardState: (rowId: number, columnId: number, socketId: string) =>
      dispatch(setBoardState(rowId, columnId, socketId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
    resetTimer: () => dispatch(resetTimer()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Box = (props: Props) => {
  const onClickHandler = (rowId: number, columnId: number) => {
    //emit the state we want to update up to the server
    //then send state down to clients
    //clients should listen for event from server and set state
    if (
      props.state.boardReducer.activeTurn === socket.id &&
      props.state.boardReducer.boardState[rowId][columnId].length === 0
    ) {
      props.resetTimer();

      props.setGameBoardState(rowId, columnId, socket.id);

      socket.emit(
        "update-board-client",
        rowId,
        columnId,
        props.state.boardReducer.roomId
      );

      //set active turn for local client
      const nextTurn = turnDecider(
        socket.id,
        props.state.boardReducer.playerState
      );

      props.setActiveTurn(nextTurn);

      //set active turn for other client in room

      socket.emit(
        "player-turn-taken-client",
        props.state.boardReducer.roomId,
        nextTurn
      );
    }
  };

  return (
    <StyledBox onClick={() => onClickHandler(props.rowId, props.columnId)}>
      <span>
        {props.state.boardReducer.boardState[props.rowId][props.columnId] &&
          showBoardSymbol(
            props.state.boardReducer.boardState[props.rowId][props.columnId],
            props.state.boardReducer.playerState
          )}
      </span>
    </StyledBox>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
