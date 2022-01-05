import { StateType } from "../types";
import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { resetState } from "../redux/Board/board.actions";
import styled from "styled-components";
import { PropsType } from "../types";

const StyledDiv = styled.div`
  text-align: center;
`;

export const PostGameScreen = (props: PropsType) => {
  socket.emit("leave-room-client", props.state.boardReducer.roomId);

  const onQuitToLobby = () => {
    props.resetState();
  };

  return (
    <StyledDiv>
      {props.state.boardReducer.winner === socket.id && <div>You won!</div>}

      {props.state.boardReducer.winner !== socket.id &&
        props.state.boardReducer.winner !== "tie" && <div>You lose</div>}
      {props.state.boardReducer.winner === "tie" && <div>TIE</div>}
      <button onClick={onQuitToLobby}>Quit to Lobby</button>
    </StyledDiv>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { resetState: () => dispatch(resetState()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGameScreen);
