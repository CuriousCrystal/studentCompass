import React, { useState, useRef, useEffect } from 'react';

const TestHoverComponent = ({ url, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log('Mouse entered');
    
    // Auto redirect after 1.5 seconds of hover
    hoverTimerRef.current = setTimeout(() => {
      if (url && url !== '#' && url !== '') {
        console.log('Would open URL:', url);
        // For testing, we'll just show an alert instead of actually opening
        alert(`Would open: ${url}`);
        // window.open(url, '_blank', 'noopener,noreferrer');
      }
    }, 1500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    console.log('Mouse left');
    
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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: isHovered ? '#e0f7fa' : '#f5f5f5',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {children}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#2196f3',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          Hovering...
        </div>
      )}
    </div>
  );
};

export default TestHoverComponent;