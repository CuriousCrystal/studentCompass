import React, { useState, useRef, useEffect } from 'react';
import { careerAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your TourGuide, here to help you navigate your career journey. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [conversationHistory, setConversationHistory] = useState([]); // Track conversation context
  const messagesEndRef = useRef(null);
  const { isDark } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to search for books using Google Books API with API key
  const searchBooks = async (query) => {
    try {
      // Use the Google Books API with the API key
      const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY || 'AIzaSyAytoNZiRTkprioNLhFVd9sUmAkn-RVyMg';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query + ' course')}&maxResults=3&key=${GOOGLE_BOOKS_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.items) {
          return data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: book.volumeInfo.description ? book.volumeInfo.description.substring(0, 150) + '...' : 'No description available',
            url: book.volumeInfo.infoLink || '#',
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown Date'
          }));
        }
      }
      return [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Check if the user is asking about books or learning resources
      const lowerInput = inputValue.toLowerCase();
      const bookRelatedKeywords = ['book', 'books', 'reading', 'learn', 'study', 'textbook', 'manual', 'guide', 'handbook', 'course', 'tutorial'];
      const isBookQuery = bookRelatedKeywords.some(keyword => lowerInput.includes(keyword));
      
      if (isBookQuery) {
        // For book-related queries, search Google Books API
        const books = await searchBooks(inputValue);
        if (books.length > 0) {
          let bookResponse = "Here are some recommended books and learning resources for your query:\n\n";
          books.forEach((book, index) => {
            bookResponse += `${index + 1}. **${book.title}** by ${book.authors}\n`;
            bookResponse += `   Published: ${book.publishedDate}\n`;
            bookResponse += `   ${book.description}\n`;
            bookResponse += `   [View Book](${book.url})\n\n`;
          });
          bookResponse += "I hope these resources help with your learning journey!";
          
          const aiMessage = {
            id: Date.now() + 1,
            text: bookResponse,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
          // eslint-disable-next-line no-unused-vars
          setConversationHistory(prev => [...prev, { role: 'assistant', content: bookResponse }]);
        } else {
          // Fallback to normal AI response
          let response;
          try {
            response = await careerAPI.chat(inputValue);
          } catch (apiError) {
            console.error('API error:', apiError);
            response = null;
          }
          
          const aiMessage = {
            id: Date.now() + 1,
            text: response?.bot_message || "I'm here to help guide your career journey! Based on your skills and interests, I can provide personalized advice. What specific questions do you have?",
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
          // eslint-disable-next-line no-unused-vars
          setConversationHistory(prev => [...prev, { role: 'assistant', content: aiMessage.text }]);
        }
      } else {
        // For non-book queries, use the normal AI response
        let response;
        try {
          response = await careerAPI.chat(inputValue);
        } catch (apiError) {
          console.error('API error:', apiError);
          response = null;
        }
        
        const aiMessage = {
          id: Date.now() + 1,
          text: response?.bot_message || "I'm here to help guide your career journey! Based on your skills and interests, I can provide personalized advice. What specific questions do you have?",
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        // eslint-disable-next-line no-unused-vars
        setConversationHistory(prev => [...prev, { role: 'assistant', content: aiMessage.text }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add friendly error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm currently having trouble connecting. Could you try asking your question again in a moment?",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      // eslint-disable-next-line no-unused-vars
      setConversationHistory(prev => [...prev, { role: 'assistant', content: "I'm currently having trouble connecting. Could you try asking your question again in a moment?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-5 shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 z-[10003] flex items-center justify-center animate-levitate neon-glow"
        aria-label="Toggle AI Chat"
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem',
          zIndex: 10003
        }}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-2xl`}></i>
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-32 right-8 w-full max-w-md h-[500px] rounded-3xl shadow-2xl border flex flex-col z-[10002] glass-effect animate-fadeIn"
          style={{ 
            position: 'fixed', 
            bottom: '8rem', 
            right: '2rem',
            zIndex: 10002
          }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-t-3xl flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <i className="fas fa-robot mr-3"></i>
              TourGuide - Your Career Buddy
            </h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 bg-gray-800/30 backdrop-blur-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-5 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-700/50 text-gray-100 border border-gray-600/50 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs mt-2 opacity-80">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-5">
                <div className="bg-gray-700/50 text-gray-100 border border-gray-600/50 rounded-2xl rounded-bl-none px-5 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-xs mt-2 text-gray-300">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700/50 p-5 bg-gray-800/50 rounded-b-3xl">
            <div className="flex">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                className="flex-1 border border-gray-600/50 rounded-l-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-700/50 text-white placeholder-gray-400"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 rounded-r-2xl transition-all duration-200 ${
                  isLoading || !inputValue.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-blue-700 hover:to-indigo-700 hover:scale-105'
                }`}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">I'm here to support you on your journey!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;