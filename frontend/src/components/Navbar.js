import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  // Reorganized navbar items in the requested sequence:
  // Home -> Roadmap -> Flowchart -> Mentor
  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/simplified-ultimate-roadmap', label: 'Roadmap', icon: 'fa-stream' },
    { path: '/flowchart', label: 'Flowchart', icon: 'fa-project-diagram' },
    { path: '/mentor', label: 'Mentor', icon: 'fa-robot' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10001] border-b transition-all duration-300 shadow-lg ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10001 }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center group">
            <h1 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {/* Cartoonish compass icon with improved color grading */}
              <svg className="w-8 h-8 mr-2 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" fill="url(#compassGradient)" stroke="white" strokeWidth="1.5"/>
                <path d="M12 3L13.5 9L12 12L10.5 9L12 3Z" fill="#EF4444"/>
                <path d="M12 21L10.5 15L12 12L13.5 15L12 21Z" fill="#3B82F6"/>
                <path d="M3 12L9 10.5L12 12L9 13.5L3 12Z" fill="#10B981"/>
                <path d="M21 12L15 13.5L12 12L15 10.5L21 12Z" fill="#F59E0B"/>
                <circle cx="12" cy="12" r="2" fill="#1E293B"/>
                <defs>
                  <linearGradient id="compassGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60A5FA"/>
                    <stop offset="1" stopColor="#3B82F6"/>
                  </linearGradient>
                </defs>
              </svg>
              STUDENT COMPASS
            </h1>
          </div>

          {/* Desktop Navigation with Enhanced Design */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-3 rounded-2xl flex items-center space-x-2.5 transition-all duration-300 font-bold text-sm hover-lift border ${
                    location.pathname === item.path
                      ? `bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-transparent`
                      : `border ${isDark ? 'text-gray-200 hover:bg-gray-800 border-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 border-gray-200 hover:text-gray-900'}`
                  }`}
                >
                  <i className={`fas ${item.icon} text-sm`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          <button
            className={`md:hidden p-3 rounded-2xl border transition-all duration-300 hover-lift ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden py-5 border-t rounded-b-2xl ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mx-3 px-5 py-4 rounded-2xl flex items-center space-x-3.5 transition-all duration-300 font-bold hover-lift ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-transparent' 
                      : `border ${isDark ? 'text-gray-200 hover:bg-gray-800 border-gray-700' : 'text-gray-700 hover:bg-gray-100 border-gray-200 hover:text-gray-900'}`
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`fas ${item.icon} w-5 text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="mx-3 mt-2 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;