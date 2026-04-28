import React from 'react';

const SectionNavigator = ({ sections, currentSection, onNavigate }) => {
  const currentIndex = sections.findIndex(section => section.id === currentSection);
  const nextSection = sections[currentIndex + 1];
  const prevSection = sections[currentIndex - 1];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4">
      {/* Section Dots */}
      <div className="bg-white/10 backdrop-blur-lg rounded-full p-3 border border-white/20">
        <div className="flex flex-col space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 hover:scale-125
                ${currentSection === section.id 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50' 
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Previous Section Button */}
      {prevSection && (
        <button
          onClick={() => onNavigate(prevSection.id)}
          className="group bg-white/10 backdrop-blur-lg rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
          title={`Go to ${prevSection.title}`}
        >
          <svg className="w-4 h-4 text-white group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Next Section Button */}
      {nextSection && (
        <button
          onClick={() => onNavigate(nextSection.id)}
          className="group bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 animate-pulse"
          title={`Go to ${nextSection.title}`}
        >
          <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Section Title Tooltip */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          {sections.find(s => s.id === currentSection)?.title}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigator;