import { React, useState, createContext, useContext } from "react";

const StateContext = createContext();

export const useContextState = () => {
  return useContext(StateContext);
};

export const StateProvider = ({ children }) => {
  const [boardState, setBoardState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const state = {
    board: [boardState, setBoardState],
  };
  console.log(state.board);
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
