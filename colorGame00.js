const Square = ({ id, player, newState }) => {
  const [color, setColor] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const xo = ["O", "X"];

  const pallet = ["red", "blue"];

  return (
    <button
      onClick={(e) => {
        let col = pallet[player];
        setColor(col);
        e.target.style.background = col;
        let nextPlayer = newState({ id: id, player: player });
        setStatus(nextPlayer);
      }}
    >
      <h1>{xo[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(0);
  const [state, setState] = React.useState([]);
  let status = `Player ${player}`;
  let winner = `Winner is ${checkForWinner(state)}`;

  const newState = (obj) => {
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    setState([...state, obj]);
    console.log(`adding state ${JSON.stringify(state)}`);
    status = `Player: ${nextPlayer}`;
    return nextPlayer;
  };

  function renderSquare(i) {
    return <Square newState={newState} id={i} player={player}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <button>Show/Hide </button>
        <h1>Turn of Player: {player ? "O" : "X"}</h1>
        <h1>{winner} is the winner!</h1>
      </div>
    </div>
  );
};
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);
