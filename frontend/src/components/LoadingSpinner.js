import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative">
        {/* Main spinner with enhanced design */}
        <div className={`w-20 h-20 border-4 border-transparent rounded-full animate-spin gradient-border ${
          isDark 
            ? 'border-t-blue-500 border-r-indigo-500' 
            : 'border-t-blue-400 border-r-indigo-400'
        }`}></div>
        
        {/* Secondary spinner for layered effect */}
        <div className={`absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin gradient-border ${
          isDark 
            ? 'border-b-purple-500 border-l-blue-500' 
            : 'border-b-purple-400 border-l-blue-400'
        }`} 
             style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
        
        {/* Center dot with glow effect */}
        <div className="absolute inset-0 w-20 h-20 flex items-center justify-center">
          <div className={`w-4 h-4 rounded-full animate-pulse ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg neon-glow' 
              : 'bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md'
          }`}></div>
        </div>
      </div>
      
      {/* Enhanced message with gradient text */}
      <p className={`text-lg font-bold animate-pulse ${
        isDark 
          ? 'text-gray-300' 
          : 'text-gray-700'
      }`}>
        {message}
      </p>
      
      {/* Enhanced bouncing dots with theme support */}
      <div className="flex space-x-2">
        <div className={`w-3 h-3 rounded-full animate-bounce ${
          isDark ? 'bg-blue-500' : 'bg-blue-400'
        }`}></div>
        <div className={`w-3 h-3 rounded-full animate-bounce ${
          isDark ? 'bg-indigo-500' : 'bg-indigo-400'
        }`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`w-3 h-3 rounded-full animate-bounce ${
          isDark ? 'bg-purple-500' : 'bg-purple-400'
        }`} style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;