import "./App.css";
import Board from "./components/Board";
import { StateProvider } from "../src/utils/StateContext";

function App() {
  return (
    <StateProvider>
      <div>
        <Board />
      </div>
    </StateProvider>
  );
}

export default App;
