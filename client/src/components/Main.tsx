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
import { showBoardSymbol } from "../utils/utilityFunctions";

const StyledMain = styled.div`
display: flex
flex-wrap: wrap
`;

const StyledJoined = styled.div`
  text-align: center;
`;

interface StyledStatusBarType {
  waiting: boolean;
}

const StyledStatusBar = styled.div<StyledStatusBarType>`
  font-size: 25px;
  text-align: center;
  background: ${(props) => (props.waiting ? "black" : "#b5b6e4")};
  color: white;
  max-width: 454px;
  margin: 6px auto;
`;

const StyledYouAre = styled.div`
  text-align: center;
  padding: 3px;
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
      <TurnTimer
        showTimer={
          props.state.boardReducer.playerState.length > 0 &&
          props.state.boardReducer.winner.length === 0
        }
        maxIdleTime={
          props.state.boardReducer.playerState.length === 1 ? 15 : 30
        }
      />

      {props.state.boardReducer.playerState.length === 2 && (
        <StyledYouAre>
          You are:{" "}
          {showBoardSymbol(socket.id, props.state.boardReducer.playerState)}
        </StyledYouAre>
      )}
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn === socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <StyledStatusBar waiting={false}>Your turn</StyledStatusBar>
        )}
      {props.state.boardReducer.playerState.length === 2 &&
        props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn !== socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <StyledStatusBar waiting={true}>
            Waiting for player turn..
          </StyledStatusBar>
        )}
      {props.state.boardReducer.playerState.length === 1 && (
        <StyledStatusBar waiting={true}>
          Waiting for opponent to connect..
        </StyledStatusBar>
      )}
      {props.state.boardReducer.playerState.length === 2 &&
        props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.winner.length === 0 && <Board />}
      {props.state.boardReducer.roomId.length > 0 && (
        <StyledJoined>
          Joined game: {props.state.boardReducer.roomId}
        </StyledJoined>
      )}
      {props.state.boardReducer.winner.length !== 0 && <PostGameScreen />}
    </StyledMain>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
