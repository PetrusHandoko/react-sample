import React, { useState, useEffect } from 'react';
import styles from './GameSelector.module.css';
import '../styles/theme.css';

// Game components
import { ClassicGame, NxNGame, OriginalGame } from './games';

// Game descriptions for the info panel
const GAME_INFO = {
  classic: {
    title: 'ChatGPT Classic (3×3)',
    description: 'A simple implementation with computer player using random moves.'
  },
  nxn: {
    title: 'N×N Board',
    description: 'Expandable board size with customizable dimensions.'
  },
  original: {
    title: 'Original Version',
    description: 'Enhanced implementation with computer player settings and intelligent moves.'
  }
};

function GameSelector() {
  const [gameVersion, setGameVersion] = useState('classic');
  const [showInfo, setShowInfo] = useState(false);

  const renderGame = () => {
    switch(gameVersion) {
      case 'classic':
        return <ClassicGame />;
      case 'nxn':
        return <NxNGame />;
      case 'original':
        return <OriginalGame />;
      default:
        return <ClassicGame />;
    }
  };

  // Theme management
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
    setIsDarkMode(prefersDark);

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mediaQuery) return;

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={styles.gameSelector}>
      <div className={styles.container}>
        <h1>Tic Tac Toe Game</h1>
        
        <div className={styles.versionSelector}>
          {Object.entries(GAME_INFO).map(([version, info]) => (
            <button 
              key={version}
              className={`${styles.versionButton} ${gameVersion === version ? styles.active : ''}`}
              onClick={() => setGameVersion(version)}
              onMouseEnter={() => setShowInfo(version)}
              onMouseLeave={() => setShowInfo(false)}
              aria-pressed={gameVersion === version}
              aria-label={`Select ${info.title} version`}
            >
              {info.title}
            </button>
          ))}
        </div>

        {showInfo && (
          <div className={styles.infoPanel} role="status" aria-live="polite">
            <p>{GAME_INFO[showInfo].description}</p>
          </div>
        )}

        <div className={styles.gameBoard}>
          {renderGame()}
        </div>
      </div>
    </div>
  );
}

export default GameSelector;