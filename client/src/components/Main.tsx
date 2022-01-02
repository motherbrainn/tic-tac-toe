import styled from "styled-components";
import Board from "./Board";
import JoinGame from "./JoinGame";
import Header from "./Header";
import PostGameScreen from "./PostGameScreen";
import { connect } from "react-redux";
import { StateType } from "../types";
import { useEffect } from "react";
import { socket } from "../connection/socket";
import {
  setRoom,
  createPlayer,
  setActiveTurn,
  setPlayers,
} from "../redux/Board/board.actions";

const StyledMain = styled.div`
display: flex
flex-wrap: wrap`;

const Main = (props) => {
  useEffect(() => console.log(props.state.boardReducer.roomId.length));
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
    socket.on("player-connect", (playerId) => {
      console.log("connect");
      //props.createPlayer(playerId);
    });
  }, []);
  return (
    <StyledMain>
      <Header />
      {props.state.boardReducer.roomId.length === 0 && <JoinGame />}
      {props.state.boardReducer.roomId.length > 0 && (
        <div>Joined game: {props.state.boardReducer.roomId}</div>
      )}
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn === socket.id &&
        props.state.boardReducer.winner.length === 0 && <div>Your turn</div>}
      {props.state.boardReducer.roomId.length > 0 &&
        props.state.boardReducer.activeTurn !== socket.id &&
        props.state.boardReducer.winner.length === 0 && (
          <div>Waiting for player turn..</div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: (roomId: string) => dispatch(setRoom(roomId)),
    createPlayer: (playerId: string) => dispatch(createPlayer(playerId)),
    setActiveTurn: (playerId: string) => dispatch(setActiveTurn(playerId)),
    setPlayers: (playerId: string) => dispatch(setPlayers(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
