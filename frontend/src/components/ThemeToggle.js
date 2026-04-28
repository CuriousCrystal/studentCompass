import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, isTransitioning } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`
        relative inline-flex items-center justify-center w-16 h-8 rounded-full 
        transition-all duration-500 ease-in-out transform hover:scale-110 
        focus:outline-none focus:ring-4 focus:ring-offset-2
        ${isDark 
          ? 'bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg shadow-blue-900/30 focus:ring-blue-500' 
          : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/30 focus:ring-indigo-500'
        }
        ${isTransitioning ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-xl'}
      `}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Toggle Circle */}
      <div
        className={`
          absolute w-6 h-6 bg-white rounded-full shadow-lg 
          transform transition-all duration-700 ease-in-out
          flex items-center justify-center
          ${isDark ? 'translate-x-4' : '-translate-x-4'}
          ${isTransitioning ? 'scale-110' : 'scale-100'}
        `}
      >
        {/* Icon */}
        <div className={`transition-all duration-500 ${isTransitioning ? 'rotate-180' : 'rotate-0'}`}>
          {isDark ? (
            <svg className="w-3.5 h-3.5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`
          absolute inset-0 transition-opacity duration-700
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-1 left-2 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1.5 left-3 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className={`
          absolute inset-0 transition-opacity duration-700
          ${!isDark ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-1.5 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-1 left-2 w-1.5 h-0.5 bg-white/30 rounded-full"></div>
          <div className="absolute top-2 left-4 w-0.5 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Ripple Effect */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-500
        ${isTransitioning ? 'animate-ping bg-white/30' : ''}
      `}></div>
    </button>
  );
};

export default ThemeToggle;