import { connect, ConnectedProps } from "react-redux";
import { socket } from "../connection/socket";
import { BoardReducerType } from "../types";
import { StyledButton } from "../commonComponentStyles";
import { Dispatch } from "react";
import { resetTimer } from "../redux/Board/board.actions";

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
      <StyledButton
        whileHover={{
          scale: 1.1,
        }}
        onClick={onJoinGameHandler}
      >
        Search for game..
      </StyledButton>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
