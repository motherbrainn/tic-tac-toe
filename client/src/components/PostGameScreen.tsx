import { StateType } from "../types";
import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { resetState } from "../redux/Board/board.actions";

export const PostGameScreen = (props) => {
  const onQuitToLobby = () => {
    socket.emit("leave-room-client", props.state.boardReducer.roomId);
    props.resetState();
    console.log("quit to lobby");
  };

  return (
    <div>
      {props.state.boardReducer.winner === socket.id && (
        <div>
          You won! Here is your NFT, please feel free to screenshot:{" "}
          {props.state.boardReducer.winner}
        </div>
      )}
      {props.state.boardReducer.winner !== socket.id && <div>You lose</div>}
      <button onClick={onQuitToLobby}>Quit to Lobby</button>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { resetState: () => dispatch(resetState()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGameScreen);
