import { connect } from "react-redux";

const WaitingForOtherPlayer = () => {
  return <div>Waiting for other player..</div>;
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingForOtherPlayer);
