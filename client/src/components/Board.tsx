import BoardRow from "./BoardRow";
import styled from "styled-components";
import { socket } from "../connection/socket";
import {connect} from 'react-redux'
import { setBoardState} from '../redux/Board/board.actions'

const StyledBoard = styled.div``;

const Board = (props) => {
  // socket.on("update-board-server", (string) => state.board[1](string));
  socket.once("update-board-server", (rowId, columnId) => props.setGameBoardState(rowId, columnId));
  // socket.on("player-turn-taken-server", (string) =>
  //   state.playerTurn[1](string)
  // );
  console.log(props)
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
    setGameBoardState: (rowId, columnId) => dispatch(setBoardState(rowId, columnId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
