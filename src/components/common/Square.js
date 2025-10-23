import React from 'react';
import PropTypes from 'prop-types';

/**
 * Square component represents a single cell in the Tic Tac Toe board
 * 
 * @component
 * @param {object} props - Component props
 * @param {string|null} props.value - The value to display in the square ('X', 'O', or null)
 * @param {function} props.onClick - Function to call when the square is clicked
 */
function Square({ value = null, onClick, position = 0 }) {
  const label = value ? `Square ${position + 1}, contains ${value}` : `Square ${position + 1}, empty`;
  
  return (
    <button 
      className="square"
      onClick={onClick}
      aria-label={label}
      role="gridcell"
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  position: PropTypes.number
};

export default Square;