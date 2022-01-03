import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { StateType } from "../types";
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
      <StyledJoinGameButton
        onClick={onJoinGameHandler}
        onTouchStart={onJoinGameHandler}
      >
        Search for game..
      </StyledJoinGameButton>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
