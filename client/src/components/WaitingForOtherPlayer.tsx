import { connect } from "react-redux";
import { StateType } from "../types";

const WaitingForOtherPlayer = () => {
  return <div>Waiting for other player..</div>;
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(WaitingForOtherPlayer);
