import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { careerAPI } from '../services/api';
import { motion } from 'framer-motion';
import './Mentor.css';

const Mentor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your Career Mentor, here to help you navigate your career journey. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await careerAPI.chat(inputValue);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response?.bot_message || "I'm here to help guide your career journey! Based on your skills and interests, I can provide personalized advice. What specific questions do you have?",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
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

  return (
    <div className={`mentor-page min-h-screen w-full transition-all duration-500 pt-20 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text-animated">Career Mentor</span>
          </motion.h1>
          <motion.p 
            className={`text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get personalized career guidance and roadmap recommendations from your AI-powered mentor
          </motion.p>
        </div>

        <div className="w-full px-0 md:px-2">
          {/* Chat Container */}
          <div className={`mentor-chat-container rounded-2xl md:rounded-3xl shadow-xl overflow-hidden mentor-gradient-border ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Messages Area */}
            <div className="mentor-messages-area h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 md:mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`mentor-message-bubble rounded-2xl p-4 md:p-5 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none md:rounded-br-none' 
                        : `${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} rounded-bl-none md:rounded-bl-none`
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm md:text-base break-words">{message.text}</div>
                    <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className={`mentor-message-bubble rounded-2xl p-4 md:p-5 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-bl-none`}>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 md:p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="mentor-input-container flex flex-col md:flex-row gap-3 md:gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your career mentor anything..."
                  className={`mentor-input-field flex-1 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                    isDark 
                      ? 'bg-gray-700 text-white border border-gray-600' 
                      : 'bg-gray-100 text-gray-900 border border-gray-200'
                  }`}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className={`mentor-send-button px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center ${
                    isLoading || !inputValue.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  <span className="hidden md:inline">Send</span>
                  <span className="md:hidden">Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mentor Features */}
          <div className="mentor-features-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            <motion.div 
              className={`rounded-xl md:rounded-2xl p-4 md:p-6 mentor-gradient-border ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-2xl md:text-3xl mb-3 md:mb-4 text-blue-500">
                <i className="fas fa-road"></i>
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personalized Roadmaps</h3>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Get step-by-step career guidance tailored to your skills and goals.
              </p>
            </motion.div>

            <motion.div 
              className={`rounded-xl md:rounded-2xl p-4 md:p-6 mentor-gradient-border ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-2xl md:text-3xl mb-3 md:mb-4 text-purple-500">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Recommendations</h3>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Discover in-demand skills and learning paths for your target career.
              </p>
            </motion.div>

            <motion.div 
              className={`rounded-xl md:rounded-2xl p-4 md:p-6 mentor-gradient-border ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-2xl md:text-3xl mb-3 md:mb-4 text-indigo-500">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Career Insights</h3>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Receive market insights and salary information for your chosen field.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;