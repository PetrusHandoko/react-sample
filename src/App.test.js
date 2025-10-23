import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the game selector', () => {
  render(<App />);
  // Check for the main game title
  const title = screen.getByRole('heading', { name: /tic tac toe game/i });
  expect(title).toBeInTheDocument();
});
