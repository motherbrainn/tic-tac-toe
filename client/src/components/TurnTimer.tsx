import { BoardReducerType } from "../types";
import { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  incrementTimer,
  resetState,
  resetTimer,
} from "../redux/Board/board.actions";
import { socket } from "../connection/socket";

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    incrementTimer: () => dispatch(incrementTimer()),
    resetState: () => dispatch(resetState()),
    resetTimer: () => dispatch(resetTimer()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const TurnTimer = (props: PropsFromRedux) => {
  const timer = () => {
    setInterval(props.incrementTimer, 1000);
  };

  useEffect(() => {
    //timer();
  }, []);

  useEffect(() => {
    if (props.state.boardReducer.time === 10) {
      socket.emit("leave-room-client", props.state.boardReducer.roomId);
      props.resetState();
      props.resetTimer();
    }
  }, [props]);

  return <div>{props.state.boardReducer.time}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnTimer);
