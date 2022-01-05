import styled from "styled-components";
import Board from "./Board";
import JoinGame from "./JoinGame";
import Header from "./Header";
import PostGameScreen from "./PostGameScreen";
import { connect } from "react-redux";
import { StateType, PropsType } from "../types";
import { Dispatch, useEffect } from "react";
import { socket } from "../connection/socket";
import {
  setRoom,
  setActiveTurn,
  setPlayers,
} from "../redux/Board/board.actions";

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

const Main = (props: PropsType) => {
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
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn !== socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <StyledWaiting>Waiting for player turn..</StyledWaiting>
        )}
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.winner.length === 0 && <Board />}
      {props.state.boardReducer.winner.length !== 0 && <PostGameScreen />}
    </StyledMain>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<BoardActionsType>) => {
  return {
    setRoom: (roomId: string) => dispatch(setRoom(roomId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
    setPlayers: (playerId: string) => dispatch(setPlayers(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
