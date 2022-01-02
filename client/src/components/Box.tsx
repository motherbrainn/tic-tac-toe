import styled from "styled-components";
import { socket } from "../connection/socket";
import { connect } from "react-redux";
import { setActiveTurn, setBoardState } from "../redux/Board/board.actions";
import { StateType } from "../types";
import { turnDecider, showBoardSymbol } from "../utils/utilityFunctions";

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
`;

const Box = (props) => {
  const onClickHandler = (rowId: number, columnId: number) => {
    //emit the state we want to update up to the server
    //then send state down to clients
    //clients should listen for event from server and set state
    if (props.state.boardReducer.activeTurn === socket.id) {
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
const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameBoardState: (rowId: number, columnId: number, socketId: string) =>
      dispatch(setBoardState(rowId, columnId, socketId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Box);
