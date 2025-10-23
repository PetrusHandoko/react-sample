# AI Agent Instructions for react-sample Project

This document provides essential context for AI agents working with this React-based Tic-Tac-Toe project.

## Project Overview
- A React-based Tic-Tac-Toe game with both human vs. human and human vs. computer gameplay modes
- Built as a learning project with progressive enhancements to explore React concepts
- Deployed at: https://tictactoe-lovat-three.vercel.app

## Key Components and Architecture

### Core Game Logic (`src/chatgpt_tictactoe.js`)
- Main game logic implemented in the `Board` component
- Uses React hooks (`useState`, `useEffect`) for state management
- Game state stored in `squares` array (length 9) representing the board
- Win conditions checked through `calculateWinner` function

### Project Structure
- Standard Create React App structure
- Key game implementations:
  - `chatgpt_tictactoe.js`: ChatGPT-generated version
  - `App.js`: Main application entry point
  - Various CSS files for styling components

## Development Workflow

### Getting Started
```bash
npm install    # Install dependencies
npm start     # Start development server
npm test      # Run tests
npm run build # Create production build
```

### Key Development Patterns
1. Component State Management
   - Use React hooks for state (`useState`, `useEffect`)
   - Game state centralized in `Board` component

2. AI/Computer Player Implementation
   - Computer moves implemented in `makeComputerMove` function
   - Uses array reduction to track available moves
   - Implements strategic moves for blocking and winning

3. Game Logic Patterns
   - Board represented as 1D array of length 9
   - Win conditions checked using predefined line combinations
   - Move validation done before state updates

## Project-Specific Conventions

### Code Style
- Function components with hooks (no class components)
- Functions defined as constants with arrow syntax
- Component-specific CSS files for styling

### State Management
- Game state centralized in parent components
- Props passed down to child components
- Effects used for computer move timing and win detection

## Common Tasks and Examples

### Adding New Game Features
1. Implement in relevant component file
2. Update state management if needed
3. Add corresponding CSS in component-specific stylesheet
4. Test in both human and computer play modes

### Example: Adding Game Controls
```javascript
const [gameSettings, setGameSettings] = useState({
  computerFirst: false,
  difficulty: 'normal'
});
```

## Integration Points
- Game board state → win detection
- User moves → computer player response
- Game settings → gameplay behavior

Remember to maintain the established patterns when adding new features or modifying existing ones.