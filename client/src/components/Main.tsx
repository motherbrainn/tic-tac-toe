import styled from "styled-components";
import Board from "./Board";
import JoinGame from "./JoinGame";
import Header from "./Header";
import PostGameScreen from "./PostGameScreen";
import { connect, ConnectedProps } from "react-redux";
import { BoardReducerType } from "../types";
import { Dispatch, useEffect } from "react";
import { socket } from "../connection/socket";
import {
  setRoom,
  setActiveTurn,
  setPlayers,
} from "../redux/Board/board.actions";
import TurnTimer from "./TurnTimer";

const StyledMain = styled.div`
display: flex
flex-wrap: wrap`;

const StyledJoined = styled.div`
  text-align: center;
`;

const StyledWaiting = styled.div`
  font-size: 25px;
  text-align: center;
  background: red;
`;

const StyledYourTurn = styled.div`
  font-size: 25px;
  text-align: center;
  background: green;
`;

const StyledWaitingForOpponent = styled.div`
  font-size: 25px;
  text-align: center;
  background: yellow;
`;

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setRoom: (roomId: string) => dispatch(setRoom(roomId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
    setPlayers: (playerId: string) => dispatch(setPlayers(playerId)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Main = (props: PropsFromRedux) => {
  useEffect(() => {
    socket.on("join-room-server", (roomId, players, activeTurn) => {
      props.setRoom(roomId);
      props.setPlayers(players);
      props.setActiveTurn(activeTurn);
    });
    socket.on("room-joined-server", (players, activeTurn) => {
      props.setPlayers(players);
      props.setActiveTurn(activeTurn);
    });
  }, []);

  return (
    <StyledMain>
      <Header />
      {props.state.boardReducer.roomId.length === 0 && <JoinGame />}
      {props.state.boardReducer.roomId.length > 0 && (
        <StyledJoined>
          Joined game: {props.state.boardReducer.roomId}
        </StyledJoined>
      )}
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn === socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <StyledYourTurn>Your turn</StyledYourTurn>
        )}
      {props.state.boardReducer.playerState.length === 2 &&
        props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn !== socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <StyledWaiting>Waiting for player turn..</StyledWaiting>
        )}
      {props.state.boardReducer.playerState.length === 1 && (
        <StyledWaitingForOpponent>
          Waiting for opponent to connect..
        </StyledWaitingForOpponent>
      )}
      {props.state.boardReducer.playerState.length === 2 &&
        props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.winner.length === 0 && <Board />}
      {props.state.boardReducer.winner.length !== 0 && <PostGameScreen />}
      {/* <TurnTimer /> */}
    </StyledMain>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
