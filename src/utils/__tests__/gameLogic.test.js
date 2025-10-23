import { calculateWinner, findForcedMove, getRandomMove, GAME_SYMBOLS } from '../gameLogic';

describe('gameLogic utilities', () => {
  describe('calculateWinner', () => {
    it('should detect horizontal win', () => {
      const board = [
        'X', 'X', 'X',
        null, 'O', 'O',
        null, null, null
      ];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect vertical win', () => {
      const board = [
        'O', 'X', null,
        'O', 'X', null,
        'O', null, null
      ];
      expect(calculateWinner(board)).toBe('O');
    });

    it('should detect diagonal win', () => {
      const board = [
        'X', 'O', null,
        'O', 'X', null,
        'O', null, 'X'
      ];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should return null when no winner', () => {
      const board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', null
      ];
      expect(calculateWinner(board)).toBeNull();
    });
  });

  describe('findForcedMove', () => {
    it('should detect horizontal blocking move', () => {
      const board = [
        'X', 'X', null,
        null, 'O', null,
        null, null, null
      ];
      expect(findForcedMove(board)).toBe(2);
    });

    it('should detect vertical blocking move', () => {
      const board = [
        'O', null, 'X',
        'O', 'X', null,
        null, null, null
      ];
      expect(findForcedMove(board)).toBe(6);
    });

    it('should return null when no forced move', () => {
      const board = [
        'X', null, null,
        null, 'O', null,
        null, null, null
      ];
      expect(findForcedMove(board)).toBeNull();
    });
  });

  describe('getRandomMove', () => {
    it('should return a valid empty position', () => {
      const board = [
        'X', 'O', 'X',
        'O', null, 'O',
        'X', null, null
      ];
      const move = getRandomMove(board);
      expect([4, 7, 8]).toContain(move);
    });

    it('should return undefined for a full board', () => {
      const board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'X', 'O', 'X'
      ];
      expect(getRandomMove(board)).toBeUndefined();
    });
  });
});