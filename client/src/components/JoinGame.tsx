import { connect, ConnectedProps } from "react-redux";
import { socket } from "../connection/socket";
import { BoardReducerType } from "../types";
import styled from "styled-components";
import { Dispatch } from "react";
import { resetTimer } from "../redux/Board/board.actions";

const StyledJoinGameButton = styled.button`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    resetTimer: () => dispatch(resetTimer()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const JoinGame = (props: PropsFromRedux) => {
  const onJoinGameHandler = () => {
    props.resetTimer();
    socket.emit("join-room-client");
  };
  return (
    <div>
      <StyledJoinGameButton onClick={onJoinGameHandler}>
        Search for game..
      </StyledJoinGameButton>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
