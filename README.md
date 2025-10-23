# React Tic Tac Toe Evolution

A progressive learning project implementing various versions of Tic Tac Toe using React.

## Live Demo
https://tictactoe-lovat-three.vercel.app

## Project Overview

This project showcases the evolution of a Tic Tac Toe game through multiple implementations, each adding new features and improvements:

1. **Original Game**
   - Human vs Human gameplay
   - Basic 3x3 board
   - Turn-based system
   - Win detection

2. **Classic Version**
   - Enhanced computer player
   - Intelligent move selection
   - Improved UI/UX
   - 500ms move delay for better experience

3. **NxN Version**
   - Variable board size (3x3 to 8x8)
   - Dynamic win detection
   - Responsive grid layout
   - Size selector control

## Features

### Core Gameplay
- Multiple game modes (Human vs Human, Human vs Computer)
- Computer player with strategic moves
- Option for computer to play first
- Clean, responsive interface

### Advanced Features
- Dynamic board sizing (NxN game)
- Intelligent computer moves
  - Random position selection
  - Strategic blocking
  - Win opportunity detection
- Reset functionality in all games
- Consistent grid layout and spacing

## Project Structure

```
src/
  components/
    common/
      ErrorBoundary.js
      Square.js
      types.js
    games/
      ClassicGame.js
      NxNGame.js
      OriginalGame.js
    GameSelector.js
  styles/
    ClassicGame.css
    NxNGame.css
    OriginalGame.css
    theme.css
```

## Development Setup

Setup ssh with public key only access.  This way, hopefully more secure than allowing login with password.  With ssh, I can allow my xifinity gateway to allow poert forwarding only port 22.  
From IPad I use Testactic application to access the source ( sftp ) and open ssh terminal to mini.  Any changes that I want to test, will be uploaded to mini.  Reach was started in terminal with npm start.

## React sample app
From https://react.dev/learn As you can see the sample still exist in the page.  

Once I am able to build tictactoe without copying from the webside, I cantinue to read and expanding the tic tac toe application.  

Original Tic Tac Toe allow you to play against second person.  T learn more I added the following feature:

* How to play with computer.
* Make the computer response randomly. 
* Add a bit rule base inteligence for computer to play.
* Set buttons, checkbox etc to learn how to interact with elements in the app.  

### Feature added
* Add new feature to allow computer play against you.  This accomplish by select a random postion to response or start the game.  Add a way to select next available position to play when the random generated was not available.  
* Add feature to allow computer to play first.
* Add some inteligence such that computer will block when needed and also will complete the row when available.  

## Development Environment

This project is developed using:
- Mac Mini as development server
- iPad as remote development platform
- Testactic for SFTP and SSH access
- VS Code as primary editor
- Node.js and npm for package management

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/PetrusHandoko/react-sample.git
cd react-sample
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Implementation Details

### Computer Player Logic
- Uses array reduction for valid move detection
- Implements strategic blocking moves
- Includes win opportunity detection
- Random move selection with validation

### Code Organization
- Component-based architecture
- Reusable common components
- Centralized game logic
- Modular CSS structure

## Future Enhancements

1. **Gameplay Features**
   - Move history and undo functionality
   - Game statistics tracking
   - Difficulty levels
   - Animation effects

2. **UI Improvements**
   - Theme customization
   - Sound effects
   - Win line highlighting
   - Move animations

3. **Technical Enhancements**
   - State management optimization
   - Performance improvements
   - Enhanced AI logic
   - Accessibility improvements

## Documentation

For detailed project history and evolution, see:
- [Project History](PROJECT_HISTORY.md)
- [Conversation History](CONVERSATION_HISTORY.md)

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

