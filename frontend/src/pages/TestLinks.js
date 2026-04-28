import React from 'react';
import { useTheme } from '../context/ThemeContext';

const TestLinks = () => {
  const { isDark } = useTheme();

  const testLinks = [
    { 
      title: "Test YouTube Link", 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      type: "youtube",
      icon: "fab fa-youtube"
    },
    { 
      title: "Test Book Link", 
      url: "https://www.google.com/books", 
      type: "book",
      icon: "fas fa-book"
    },
    { 
      title: "Test Certification Link", 
      url: "https://www.coursera.org", 
      type: "certification",
      icon: "fas fa-certificate"
    },
    { 
      title: "Test Course Link", 
      url: "https://www.udemy.com", 
      type: "course",
      icon: "fas fa-graduation-cap"
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Test Links Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testLinks.map((link, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-6 shadow-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center mb-4">
                <i className={`${link.icon} text-2xl mr-3 ${
                  link.type === 'youtube' ? 'text-red-500' :
                  link.type === 'book' ? 'text-green-500' :
                  link.type === 'certification' ? 'text-blue-500' :
                  'text-indigo-500'
                }`}></i>
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {link.title}
                </h2>
              </div>
              
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-block px-4 py-2 rounded-lg font-medium transition-colors ${
                  link.type === 'youtube' ? 
                    (isDark ? 
                      'bg-red-600 hover:bg-red-700 text-white' : 
                      'bg-red-500 hover:bg-red-600 text-white') :
                  link.type === 'book' ? 
                    (isDark ? 
                      'bg-green-600 hover:bg-green-700 text-white' : 
                      'bg-green-500 hover:bg-green-600 text-white') :
                  link.type === 'certification' ? 
                    (isDark ? 
                      'bg-blue-600 hover:bg-blue-700 text-white' : 
                      'bg-blue-500 hover:bg-blue-600 text-white') :
                    (isDark ? 
                      'bg-indigo-600 hover:bg-indigo-700 text-white' : 
                      'bg-indigo-500 hover:bg-indigo-600 text-white')
                }`}
              >
                Open {link.type}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestLinks;