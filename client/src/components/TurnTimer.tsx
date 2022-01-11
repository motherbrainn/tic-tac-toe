import { BoardReducerType } from "../types";
import { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  incrementTimer,
  resetState,
  resetTimer,
} from "../redux/Board/board.actions";
import { socket } from "../connection/socket";
import styled from "styled-components";

interface Props extends PropsFromRedux {
  showTimer: boolean;
  maxIdleTime: number;
}

const StyledDiv = styled.div`
  text-align: center;
  font-weight: bold;
`;

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

export const TurnTimer = (props: Props) => {
  useEffect(() => {
    setInterval(props.incrementTimer, 1000);
  }, []);

  useEffect(() => {
    if (props.state.boardReducer.time === props.maxIdleTime) {
      socket.emit("leave-room-client", props.state.boardReducer.roomId);
      props.resetState();
      props.resetTimer();
    }
    socket.on("room-joined-server", () => {
      props.resetTimer();
    });
  }, [props]);

  useEffect(() => {
    props.resetTimer();
  }, [props.state.boardReducer.boardState]);

  return (
    <StyledDiv>
      {props.showTimer &&
        `${props.maxIdleTime - props.state.boardReducer.time} seconds until
      disconnect`}
    </StyledDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnTimer);
