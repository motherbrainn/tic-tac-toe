import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import { connect } from "react-redux";
import { setBoardState, setActiveTurn } from "../redux/Board/board.actions";
import { Dispatch, useEffect } from "react";
import { StateType, PropsType } from "../types";
import { showBoardSymbol } from "../utils/utilityFunctions";

const StyledBoard = styled.div`
display: flex
flex-wrap: wrap
`;

const StyledYouAre = styled.div`
  text-align: center;
`;

const Board = (props: PropsType) => {
  useEffect(() => {
    socket.on("update-board-server", (rowId, columnId, socketId) => {
      props.setGameBoardState(rowId, columnId, socketId);
      socket.on("player-turn-taken-server", (roomId, nextTurn) => {
        props.setActiveTurn(nextTurn);
      });
    });
  }, []);

  useEffect(() => console.log("test: ", props));

  return (
    <StyledBoard>
      {props.state.boardReducer.playerState.length === 2 && (
        <StyledYouAre>
          You are:{" "}
          {showBoardSymbol(socket.id, props.state.boardReducer.playerState)}
        </StyledYouAre>
      )}
      <BoardRow rowId={0} />
      <BoardRow rowId={1} />
      <BoardRow rowId={2} />
    </StyledBoard>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameBoardState: (rowId: string, columnId: number, socketId: number) =>
      dispatch(setBoardState(rowId, columnId, socketId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
