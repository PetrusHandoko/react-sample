import React, { useState, useEffect } from 'react';
import '../../styles/NxNGame.css';
import { getRandomMove } from '../../utils/gameLogic';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function NxNBoard() {
  const [boardSize, setBoardSize] = useState(3); // Default size, can be changed
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));
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
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
    }
  }, [squares]);

  const calculateWinner = (squares) => {
    // Check rows
    for (let row = 0; row < boardSize; row++) {
      const startIndex = row * boardSize;
      const rowValues = squares.slice(startIndex, startIndex + boardSize);
      if (rowValues.every(val => val === rowValues[0] && val !== null)) {
        return rowValues[0];
      }
    }

    // Check columns
    for (let col = 0; col < boardSize; col++) {
      const colValues = [];
      for (let row = 0; row < boardSize; row++) {
        colValues.push(squares[row * boardSize + col]);
      }
      if (colValues.every(val => val === colValues[0] && val !== null)) {
        return colValues[0];
      }
    }

    // Check main diagonal
    const mainDiagonal = [];
    for (let i = 0; i < boardSize; i++) {
      mainDiagonal.push(squares[i * boardSize + i]);
    }
    if (mainDiagonal.every(val => val === mainDiagonal[0] && val !== null)) {
      return mainDiagonal[0];
    }

    // Check anti-diagonal
    const antiDiagonal = [];
    for (let i = 0; i < boardSize; i++) {
      antiDiagonal.push(squares[i * boardSize + (boardSize - 1 - i)]);
    }
    if (antiDiagonal.every(val => val === antiDiagonal[0] && val !== null)) {
      return antiDiagonal[0];
    }

    return null;
  };

  const handleSizeChange = (newSize) => {
    setBoardSize(newSize);
    setSquares(Array(newSize * newSize).fill(null));
    setGameOver(false);
    setXIsNext(true);
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

  // Create the board rows
  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const squaresInRow = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      squaresInRow.push(renderSquare(index));
    }
    boardRows.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  const resetGame = () => {
    setSquares(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  return (
    <div className="game">
      <div className="game-controls">
        <label>Board Size: </label>
        <select 
          value={boardSize} 
          onChange={(e) => handleSizeChange(Number(e.target.value))}
        >
          {[3, 4, 5, 6, 7, 8].map(size => (
            <option key={size} value={size}>{size}x{size}</option>
          ))}
        </select>
      </div>
      <div className="status">{status}</div>
      <div className="board">
        {boardRows}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default NxNBoard;