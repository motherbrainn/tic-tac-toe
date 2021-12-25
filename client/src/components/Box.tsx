import styled from "styled-components";
import { socket } from "../connection/socket";
import {connect} from 'react-redux'
import { setBoardState} from '../redux/Board/board.actions'


const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  background-color: grey;
  color: black;
  border-radius: 5px;
`;

const Box = (props) => {
  
  const onClickHandler = (rowId, columnId) => {
    //emit the state we want to update up to the server
    //then send state down to clients
    //clients should listen for event from server and set state
     socket.emit("update-board-client", rowId, columnId);
    socket.emit("player-turn-taken-client", socket.id);
    //props.setGameBoardState(rowId,columnId)
  };
  return (
    <StyledBox onClick={() => onClickHandler(props.rowId, props.columnId)}>
      {props.state.boardReducer[props.rowId][props.columnId]}
    </StyledBox>
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
export default connect(mapStateToProps, mapDispatchToProps)(Box);
