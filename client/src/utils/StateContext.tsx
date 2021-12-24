import { useState, createContext, useContext } from "react";

const StateContext = createContext('Default Value');

export const useContextState = () => {
  return useContext(StateContext);
};

export const StateProvider = ({ children }) => {
  const [boardState, setBoardState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [playerTurn, setPlayerTurn] = useState();
  const state = {
    board: [boardState, setBoardState],
    playerTurn: [playerTurn, setPlayerTurn],
  };
  console.log(state);
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};
