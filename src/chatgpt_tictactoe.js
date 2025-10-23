/* To implement playing against a computer opponent in the React tic-tac-toe game, you'll need to modify the `Board` 
component to handle the computer's moves.
Here's an updated version of the previous code with a basic AI opponent:
*/


import React, { useState, useEffect } from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (i) => {
    if (gameOver || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
  };

  useEffect(() => {
    if (!xIsNext && !gameOver) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500); // Delay for the computer's move
      return () => clearTimeout(timer);
    }
  }, [xIsNext, squares, gameOver]);

  const makeComputerMove = () => {
    const availableMoves = squares.reduce((acc, val, idx) => {
      if (!val) {
        acc.push(idx);
      }
      return acc;
    }, []);

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newSquares = squares.slice();
    newSquares[randomMove] = 'O';
    setSquares(newSquares);
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
    }
  }, [squares]);

  const calculateWinner = (squares) => {
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
    return null;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every((square) => square !== null)) {
    status = 'It\'s a draw!';
    setGameOver(true);
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
/***

This updated code introduces a simple AI for the computer opponent. 
It selects a random available move whenever it's the computer's turn to play ('O'). 
The `makeComputerMove` function chooses an available square randomly.

Ensure that you've set up a React environment, 
and you can replace the `Board` component in your React application with 
this modified version to enable playing against a computer opponent in the tic-tac-toe game.

**/
