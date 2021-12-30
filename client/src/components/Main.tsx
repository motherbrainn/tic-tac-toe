import styled from "styled-components";
import Board from "./Board";
import JoinGame from "./JoinGame";
import { connect } from "react-redux";
import { StateType } from "../types";

const StyledMain = styled.div`
display: flex
flex-wrap: wrap`;

const Main = (props) => {
  return (
    <StyledMain>
      {props.state.boardReducer.room === "" && <JoinGame />}
      {props.state.boardReducer.room === "" && <Board />}
    </StyledMain>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
