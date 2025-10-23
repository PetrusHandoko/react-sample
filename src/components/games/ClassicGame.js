import React, { useState, useEffect } from 'react';
import '../../styles/ClassicGame.css';
import { calculateWinner, getRandomMove } from '../../utils/gameLogic';
import { Square } from '../common';

function ClassicGame() {
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
    const move = getRandomMove(squares);
    if (move !== undefined) {
      const newSquares = squares.slice();
      newSquares[move] = 'O';
      setSquares(newSquares);
      setXIsNext(true);
    }
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} position={i} />;
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
    }
  }, [squares]);

  // calculateWinner is now imported from gameLogic.js

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

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
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
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default ClassicGame;
