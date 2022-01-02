import { StateType } from "../types";
import { connect } from "react-redux";
import { socket } from "../connection/socket";
import { resetState } from "../redux/Board/board.actions";

export const PostGameScreen = (props) => {
  socket.emit("leave-room-client", props.state.boardReducer.roomId);

  const onQuitToLobby = () => {
    props.resetState();
  };

  return (
    <div>
      {props.state.boardReducer.winner === socket.id && (
        <div>
          You won! Here is your NFT, please feel free to screenshot:{" "}
          {props.state.boardReducer.winner}
        </div>
      )}
      {props.state.boardReducer.winner !== socket.id &&
        props.state.boardReducer.winner !== "tie" && <div>You lose</div>}
      {props.state.boardReducer.winner === "tie" && (
        <div>TIE: YOUR NFT HAS BEEN DESTROYED AND DONATED!!</div>
      )}
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
