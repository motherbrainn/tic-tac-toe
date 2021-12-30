import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { StateType } from "../types";

const JoinGame = () => {
  const onJoinGameHandler = () => {};
  return (
    <div>
      <button onClick={onJoinGameHandler}>Search for game..</button>
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
