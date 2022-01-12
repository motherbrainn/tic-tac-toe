import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import { connect, ConnectedProps } from "react-redux";
import { setBoardState, setActiveTurn } from "../redux/Board/board.actions";
import { Dispatch, useEffect } from "react";
import { BoardReducerType } from "../types";

const StyledBoard = styled.div`
display: flex
flex-wrap: wrap
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
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Board = (props: PropsFromRedux) => {
  useEffect(() => {
    socket.on("update-board-server", (rowId, columnId, socketId) => {
      props.setGameBoardState(rowId, columnId, socketId);
      socket.on("player-turn-taken-server", (roomId, nextTurn) => {
        props.setActiveTurn(nextTurn);
      });
    });
  }, []);

  //useEffect(() => console.log("test: ", props));

  return (
    <StyledBoard>
      <BoardRow rowId={0} />
      <BoardRow rowId={1} />
      <BoardRow rowId={2} />
    </StyledBoard>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
