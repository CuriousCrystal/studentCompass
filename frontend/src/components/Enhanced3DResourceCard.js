import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Enhanced3DButton from './Enhanced3DButton';
import { useTheme } from '../context/ThemeContext';

const Enhanced3DResourceCard = ({ 
  title,
  subtitle,
  description,
  image,
  url,
  type, // youtube, book, certification, course
  metadata,
  className = '',
  onClick,
  ...props 
}) => {
  // Define type-specific styling
  const typeStyles = {
    youtube: {
      border: 'border-red-500/30',
      bg: 'bg-red-50/50',
      icon: 'fab fa-youtube',
      iconColor: 'text-red-500',
      buttonVariant: 'danger'
    },
    book: {
      border: 'border-green-500/30',
      bg: 'bg-green-50/50',
      icon: 'fas fa-book',
      iconColor: 'text-green-500',
      buttonVariant: 'success'
    },
    certification: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-50/50',
      icon: 'fas fa-certificate',
      iconColor: 'text-blue-500',
      buttonVariant: 'primary'
    },
    course: {
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-50/50',
      icon: 'fas fa-graduation-cap',
      iconColor: 'text-indigo-500',
      buttonVariant: 'info'
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef(null);
  const { isDark } = useTheme();
  const style = typeStyles[type] || typeStyles.youtube;

  // Handle hover to automatically redirect after a delay
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Auto redirect after 2 seconds of hover (increased from 1.5 to prevent accidental triggers)
    hoverTimerRef.current = setTimeout(() => {
      if (url && url !== '#' && url !== '') {
        console.log('Opening URL:', url);
        // Use the same approach as BookTest - standard window.open
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Clear the timer if hover ends before redirect
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden
        ${style.border}
        ${style.bg}
        backdrop-blur-sm
        border
        transition-all duration-300
        group
        ${className}
        ${isHovered ? 'ring-2 ring-blue-500' : ''}
      `}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)',
        zIndex: 10, // Add z-index to ensure proper layering
        ...(isDark ? {
          background: 'rgba(30, 41, 59, 0.6)',
          borderColor: 'rgba(148, 163, 184, 0.2)'
        } : {
          background: 'rgba(255, 255, 255, 0.7)',
          borderColor: 'rgba(203, 213, 225, 0.5)'
        })
      }}
      {...props}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(96, 165, 250, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Card content */}
      <div className="p-5 h-full flex flex-col">
        {/* Header with image and type indicator */}
        <div className="flex items-start mb-4">
          {image && (
            <motion.div 
              className="relative rounded-lg overflow-hidden flex-shrink-0 mr-4"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={image} 
                alt={title}
                className="w-16 h-16 object-cover"
              />
              <div className={`absolute inset-0 bg-${type === 'youtube' ? 'red' : type === 'book' ? 'green' : type === 'certification' ? 'blue' : 'indigo'}-500/20`} />
            </motion.div>
          )}
          
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <i className={`${style.icon} ${style.iconColor} mr-2`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {type}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 line-clamp-2 text-lg dark:text-gray-100">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3 dark:text-gray-300">
            {description}
          </p>
        )}
        
        {/* Metadata */}
        {metadata && (
          <div className="flex flex-wrap gap-2 mb-4">
            {metadata.map((item, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white/70 text-xs rounded-lg font-medium text-gray-700 border border-gray-200/50 dark:bg-gray-700/70 dark:text-gray-300 dark:border-gray-600/50"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        
        {/* Action button - using standard anchor tag like BookTest */}
        <div className="mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {
              // Prevent the hover timer from triggering if user clicks
              if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
                hoverTimerRef.current = null;
              }
              console.log('Clicked on resource link:', url);
            }}
            className={`inline-block w-full text-center py-2 px-4 rounded-lg font-bold transition-all duration-300 hover:scale-[1.02] ${
              style.buttonVariant === 'danger' 
                ? (isDark 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700')
                : style.buttonVariant === 'success' 
                ? (isDark 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700')
                : style.buttonVariant === 'primary' 
                ? (isDark 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700')
                : style.buttonVariant === 'info' 
                ? (isDark 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800' 
                    : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700')
                : (isDark 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800' 
                    : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700')
            }`}
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            View {type}
          </a>
        </div>
        
        {/* Hover indicator */}
        {isHovered && url && url !== '#' && url !== '' && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            Opening...
          </div>
        )}
      </div>
      
      {/* 3D effect border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/20 dark:border-gray-600/20" 
        style={{ transform: 'translateZ(10px)' }} />
    </motion.div>
  );
};

export default Enhanced3DResourceCard;