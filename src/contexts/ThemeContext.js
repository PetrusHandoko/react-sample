import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const prefersDark = typeof window !== 'undefined' 
    ? window.matchMedia?.('(prefers-color-scheme: dark)')?.matches 
    : false;
  
  const [isDarkMode, setIsDarkMode] = useState(prefersDark);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mediaQuery) return;

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;