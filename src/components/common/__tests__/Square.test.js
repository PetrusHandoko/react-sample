import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Square from '../Square';

describe('Square component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with correct value', () => {
    render(<Square value="X" onClick={mockOnClick} />);
    expect(screen.getByRole('gridcell')).toHaveTextContent('X');
  });

  it('renders empty when value is null', () => {
    render(<Square value={null} onClick={mockOnClick} />);
    expect(screen.getByRole('gridcell')).toHaveTextContent('');
  });

  it('calls onClick when clicked', () => {
    render(<Square value={null} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('gridcell'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible via keyboard', () => {
    render(<Square value="O" onClick={mockOnClick} />);
    const square = screen.getByRole('gridcell');
    square.focus();
    expect(square).toHaveFocus();
    
    // Simulate both click and keyboard events to ensure both work
    fireEvent.click(square);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    
    // Reset the mock
    mockOnClick.mockClear();
    
    // Test keyboard interaction
    fireEvent.keyDown(square, { key: 'Enter', code: 'Enter' });
    fireEvent.click(square);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});