import React, { useState } from 'react';
import './App.css';
import ClassicBoard from './chatgpt_tictactoe';
import NxNBoard from './chatgpt_tictactoe_nxn';
import OriginalBoard from './petrus_original';

function GameSelector() {
  const [gameVersion, setGameVersion] = useState('classic');

  const renderGame = () => {
    switch(gameVersion) {
      case 'classic':
        return <ClassicBoard />;
      case 'nxn':
        return <NxNBoard />;
      case 'original':
        return <OriginalBoard />;
      default:
        return <ClassicBoard />;
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <div className="game-version-selector">
        <button 
          className={`version-button ${gameVersion === 'classic' ? 'active' : ''}`}
          onClick={() => setGameVersion('classic')}
        >
          ChatGPT Classic (3×3)
        </button>
        <button 
          className={`version-button ${gameVersion === 'nxn' ? 'active' : ''}`}
          onClick={() => setGameVersion('nxn')}
        >
          N×N Board
        </button>
        <button 
          className={`version-button ${gameVersion === 'original' ? 'active' : ''}`}
          onClick={() => setGameVersion('original')}
        >
          Original Version
        </button>
      </div>
      <div className="game">
        <div className="game-board">
          {renderGame()}
        </div>
      </div>
    </div>
  );
}

export default GameSelector;