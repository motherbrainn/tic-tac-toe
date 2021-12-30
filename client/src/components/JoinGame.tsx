import { connect } from "react-redux";
import { socket } from "../connection/socket";

const JoinGame = () => {
  const onJoinGameHandler = () => {
    //join room
  };
  return (
    <div>
      <p>Tic Tac Toe</p>
      <button onClick={onJoinGameHandler}>Search for game..</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
