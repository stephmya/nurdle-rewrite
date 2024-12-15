import "./App.css";
import BoardMain from "./nurdle-board/board-main";
import NumberGuess from "./nurdle-board/number-guess";

function App() {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
    >
      <BoardMain />
      <NumberGuess />
    </div>
  );
}

export default App;
