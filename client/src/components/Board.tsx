import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import {connect} from 'react-redux'
import { setBoardState, createPlayer} from '../redux/Board/board.actions'
import { useEffect } from "react";

const StyledBoard = styled.div`
display: flex
flex-wrap: wrap
`;

const Board = (props) => {
  // socket.on("update-board-server", (string) => state.board[1](string));
  useEffect(() => {
    socket.on("update-board-server", (rowId, columnId, socketId) => props.setGameBoardState(rowId, columnId, socketId));
    socket.on('player-connect', (playerId) => props.createPlayer(playerId))
  },[])
  //socket.on("update-board-server", (rowId, columnId) => console.log('rowId: ', rowId));
useEffect(() => console.log(props.state))
  // socket.on("player-turn-taken-server", (string) =>
  //   state.playerTurn[1](string)
  // );
  return (
    <StyledBoard>
      <BoardRow rowId={0} />
      <BoardRow rowId={1} />
      <BoardRow rowId={2} />
    </StyledBoard>
  );
};

const mapStateToProps = state => {
  return{
   state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGameBoardState: (rowId: number, columnId: number, socketId: number) => dispatch(setBoardState(rowId, columnId, socketId)),
    createPlayer: (playerId: number) => dispatch(createPlayer(playerId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
