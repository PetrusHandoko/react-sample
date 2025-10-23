/**
 * @fileoverview Game logic utilities for Tic Tac Toe implementations
 * This module contains shared game logic functions used across different
 * versions of the Tic Tac Toe game (Classic, NxN, and Original).
 * 
 * @module gameLogic
 */

/**
 * Game symbols used in Tic Tac Toe
 * @readonly
 * @enum {string}
 */
export const GAME_SYMBOLS = {
  X: 'X',
  O: 'O'
};

/**
 * Default game states
 * @readonly
 * @enum {string}
 */
export const GAME_STATES = {
  PLAYING: 'playing',
  WON: 'won',
  DRAW: 'draw'
};

/**
 * Calculates the winner for a 3x3 board
 * Checks all possible winning combinations (rows, columns, and diagonals)
 * 
 * @param {Array<string|null>} squares - The game board array
 * @returns {string|null} The winner ('X' or 'O') or null if no winner
 * @example
 * const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
 * calculateWinner(board); // Returns 'X'
 */
export const calculateWinner = (squares) => {
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

/**
 * Finds forced moves to block opponent or win
 * @param {Array} squares - The game board array
 * @returns {number|null} - The position to move or null if no forced move
 */
export const findForcedMove = (squares) => {
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
    // Check for two in a row and an empty space
    if (!squares[a] && squares[b] && squares[b] === squares[c]) return a;
    if (!squares[b] && squares[a] && squares[a] === squares[c]) return b;
    if (!squares[c] && squares[a] && squares[a] === squares[b]) return c;
  }
  return null;
};

/**
 * Generates a random valid move
 * @param {Array} squares - The game board array
 * @returns {number} - The position to move
 */
export const getRandomMove = (squares) => {
  const availableMoves = squares.reduce((acc, val, idx) => {
    if (!val) acc.push(idx);
    return acc;
  }, []);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};