import PropTypes from 'prop-types';

/**
 * Common PropTypes used across components
 */
export const GamePropTypes = {
  /**
   * Shape of a game square
   */
  squareValue: PropTypes.oneOf(['X', 'O', null]),

  /**
   * Game board array
   */
  board: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])),

  /**
   * Game state
   */
  gameState: PropTypes.oneOf(['playing', 'won', 'draw']),

  /**
   * Click handler function
   */
  onSquareClick: PropTypes.func
};

/**
 * Default props for game components
 */
export const GameDefaultProps = {
  squareValue: null,
  board: Array(9).fill(null),
  gameState: 'playing'
};