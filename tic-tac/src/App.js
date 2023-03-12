import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setxIsnext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  // here we are creating copy becuase if we are directly modify the array then react wont
  // trigger re render beacause it wont be able to detect the differnces of last state and current one

  function handleClick(i) {
    const newSquare = squares.slice();

    if (xIsNext || getWinner(squares)) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }

    setSquares(newSquare);
    setxIsnext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
  }
  let result;
  const winner = getWinner(squares);

  if (winner) {
    result = "Winner : " + winner;
  } else {
    result = "Next move is " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1> {result}</h1>
      <div>
        <button onClick={resetBoard}> reset board</button>
      </div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function getWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}
