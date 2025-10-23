import React from 'react';
import './styles/App.css';
import './styles/theme.css';
import { GameSelector } from './components';
import { ErrorBoundary } from './components/common';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ErrorBoundary>
          <GameSelector />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;
