import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { BoardReducerType } from "../types";
import styled from "styled-components";

const StyledJoinGameButton = styled.button`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const JoinGame = () => {
  const onJoinGameHandler = () => {
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

const mapStateToProps = (state: BoardReducerType) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(JoinGame);
