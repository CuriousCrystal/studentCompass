import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark for students
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('student-compass-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Add transition class to body
    document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      localStorage.setItem('student-compass-theme', newTheme ? 'dark' : 'light');
      
      // Apply theme to document body
      if (newTheme) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
      
      // Remove transition after animation
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.transition = '';
      }, 500);
    }, 50);
  };

  const value = {
    isDark,
    toggleTheme,
    isTransitioning,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};