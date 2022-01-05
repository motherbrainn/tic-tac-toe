import { connect, ConnectedProps } from "react-redux";
import { socket } from "../connection/socket";
import { resetState } from "../redux/Board/board.actions";
import styled from "styled-components";
import { BoardReducerType } from "../types";
import { Dispatch } from "react";

const StyledDiv = styled.div`
  text-align: center;
`;

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return { resetState: () => dispatch(resetState()) };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const PostGameScreen = (props: PropsFromRedux) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostGameScreen);
