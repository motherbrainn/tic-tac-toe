import { connect, ConnectedProps } from "react-redux";
import { socket } from "../connection/socket";
import { resetState } from "../redux/Board/board.actions";
import styled from "styled-components";
import { BoardReducerType } from "../types";
import { Dispatch } from "react";
import { StyledButton } from "../commonComponentStyles";

const StyledDiv = styled.div`
  text-align: center;
`;

const StyledResult = styled.div`
  text-align: center;
  padding: 3px;
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
      {props.state.boardReducer.winner === socket.id && (
        <StyledResult>You won!</StyledResult>
      )}

      {props.state.boardReducer.winner !== socket.id &&
        props.state.boardReducer.winner !== "tie" && (
          <StyledResult>You lose</StyledResult>
        )}
      {props.state.boardReducer.winner === "tie" && (
        <StyledResult>TIE</StyledResult>
      )}
      <StyledButton
        onClick={onQuitToLobby}
        whileHover={{
          scale: 1.1,
        }}
      >
        Quit to Lobby
      </StyledButton>
    </StyledDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGameScreen);
