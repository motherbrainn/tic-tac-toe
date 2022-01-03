import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import { connect } from "react-redux";
import {
  setBoardState,
  createPlayer,
  setActiveTurn,
} from "../redux/Board/board.actions";
import { useEffect } from "react";
import { StateType } from "../types";
import { showBoardSymbol } from "../utils/utilityFunctions";

const StyledBoard = styled.div`
display: flex
flex-wrap: wrap
`;

const Board = (props) => {
  useEffect(() => {
    socket.on("update-board-server", (rowId, columnId, socketId) => {
      props.setGameBoardState(rowId, columnId, socketId);
      socket.on("player-turn-taken-server", (roomId, nextTurn) => {
        props.setActiveTurn(nextTurn);
      });
    });
  }, []);

  //useEffect(() => console.log(props.state));

  return (
    <StyledBoard>
      {props.state.boardReducer.playerState.length === 2 && (
        <div>
          You are:{" "}
          {showBoardSymbol(socket.id, props.state.boardReducer.playerState)}
        </div>
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
    setGameBoardState: (rowId: number, columnId: number, socketId: number) =>
      dispatch(setBoardState(rowId, columnId, socketId)),
    createPlayer: (playerId: string) => dispatch(createPlayer(playerId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
