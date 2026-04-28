import React, { useState, useEffect } from 'react';

const Compass3D = ({ 
  size = 100, 
  showLabel = true, 
  isLoading = false, 
  glowIntensity = 'high',
  className = '',
  isFloating = false
}) => {
  const [animationTime, setAnimationTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setAnimationTime(prev => prev + 0.1);
      }, 50);
    } else {
      // For non-loading state, have a subtle continuous animation
      interval = setInterval(() => {
        setAnimationTime(prev => prev + 0.02);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Calculate glow intensity
  const getGlowStyle = () => {
    const intensity = isHovered ? 'high' : glowIntensity;
    switch(intensity) {
      case 'low':
        return '0 0 10px rgba(59, 130, 246, 0.4)';
      case 'medium':
        return '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)';
      case 'high':
        return '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5), 0 0 90px rgba(59, 130, 246, 0.3)';
      default:
        return '0 0 20px rgba(59, 130, 246, 0.6)';
    }
  };

  // Calculate rotation based on hover state
  const getRotation = () => {
    if (isLoading) {
      return animationTime * 120;
    }
    return isHovered ? animationTime * 30 : animationTime * 10;
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Compass Container with 3D Effect */}
      <div 
        className={`relative flex items-center justify-center group cursor-pointer ${isFloating ? 'animate-bounce' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          filter: `drop-shadow(${getGlowStyle()})`,
          transform: 'perspective(1000px) rotateX(15deg) rotateY(15deg)',
          transition: 'transform 0.5s ease, filter 0.5s ease',
          animation: isFloating ? 'bounce 2s infinite' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer Ring with Pulsing Effect */}
        <div 
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${size * 1.3}px`,
            height: `${size * 1.3}px`,
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 3s infinite'
          }}
        />
        
        {/* Inner Ring */}
        <div 
          className="absolute rounded-full border-2 border-white/20 backdrop-blur-sm"
          style={{
            width: `${size * 1.1}px`,
            height: `${size * 1.1}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
            boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.3), 0 10px 40px rgba(31, 38, 135, 0.4)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Compass Base with Glass Effect */}
        <div 
          className="absolute rounded-full border-2 border-white/30 backdrop-blur-sm"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.15))',
            boxShadow: 'inset 0 0 25px rgba(255, 255, 255, 0.3), 0 12px 45px rgba(31, 38, 135, 0.5)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Compass Direction Markers */}
        <div className="absolute inset-0">
          {/* North */}
          <div 
            className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-lg group-hover:scale-125 transition-transform duration-300"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}
          >
            N
          </div>
          {/* East */}
          <div 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-extrabold text-lg group-hover:scale-125 transition-transform duration-300"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}
          >
            E
          </div>
          {/* South */}
          <div 
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-lg group-hover:scale-125 transition-transform duration-300"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}
          >
            S
          </div>
          {/* West */}
          <div 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-extrabold text-lg group-hover:scale-125 transition-transform duration-300"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}
          >
            W
          </div>
        </div>
        
        {/* Living Compass Needle with Enhanced Animation */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '6px',
            height: `${size * 0.8}px`,
            transform: `
              rotate(${getRotation()}deg)
              scale(${1 + Math.sin(animationTime * 3) * 0.05})
            `,
            transformOrigin: 'center',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* North Needle - Red with Enhanced Glow */}
          <div 
            className="absolute animate-pulse"
            style={{
              width: '6px',
              height: `${size * 0.4}px`,
              top: '0',
              background: 'linear-gradient(to bottom, #EF4444, #B91C1C, #7F1D1D)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.9), 0 0 40px rgba(239, 68, 68, 0.6)'
            }}
          />
          
          {/* South Needle - White with Enhanced Glow */}
          <div 
            className="absolute"
            style={{
              width: '6px',
              height: `${size * 0.4}px`,
              bottom: '0',
              background: 'linear-gradient(to top, #F3F4F6, #9CA3AF, #4B5563)',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              boxShadow: '0 0 20px rgba(209, 213, 219, 0.9), 0 0 40px rgba(209, 213, 219, 0.6)'
            }}
          />
        </div>
        
        {/* Compass Center Point with Enhanced Glow */}
        <div 
          className="absolute rounded-full z-10 animate-ping"
          style={{
            width: `${size * 0.2}px`,
            height: `${size * 0.2}px`,
            background: 'radial-gradient(circle, #1F2937, #111827)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.7)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDuration: '1.5s'
          }}
        />
        
        {/* Multiple Glow Rings */}
        {[1.4, 1.6, 1.8].map((scale, index) => (
          <div 
            key={index}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              width: `${size * scale}px`,
              height: `${size * scale}px`,
              border: `1px solid rgba(59, 130, 246, ${0.5 - index * 0.15})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: `${3 + index}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Label */}
      {showLabel && (
        <div className="mt-4 text-center">
          <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-500">
            {isLoading ? 'Analyzing Your Path...' : 'Student Compass'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Compass3D;