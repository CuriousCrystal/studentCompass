import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { careerAPI } from '../services/api';

const Flowchart = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false); // For completion celebration
  
  const navigate = useNavigate();
  const { currentSkills, currentExpertise } = useAppContext();
  const { isDark } = useTheme();

  // Fetch roadmap data from your API
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if skills and expertise are available
        if (!currentSkills || !currentExpertise) {
          throw new Error('Skills and expertise are required to generate a roadmap');
        }
        
        const data = await careerAPI.analyzeCareer(currentSkills, currentExpertise);
        console.log('Received roadmap data:', data);
        
        // Validate response data
        if (!data || !data.roadmap) {
          throw new Error('Invalid response from server. Please try again.');
        }
        
        setRoadmapData(data);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        // More user-friendly error messages
        if (err.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your internet connection and try again.');
        } else if (err.message.includes('Server Error')) {
          setError('Server is currently unavailable. Please try again in a few minutes.');
        } else {
          setError(err.message || 'Failed to fetch roadmap data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have both skills and expertise
    if (currentSkills && currentExpertise) {
      fetchRoadmapData();
    } else {
      // Set error if skills or expertise are missing
      setError('Please provide your skills and expertise level on the home page to generate a personalized roadmap.');
      setLoading(false);
    }
  }, [currentSkills, currentExpertise]);

  // Load completed steps from localStorage when component mounts and when skills change
  useEffect(() => {
    if (currentSkills) {
      const saved = localStorage.getItem(`completedSteps_${currentSkills}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCompletedSteps(new Set(parsed));
        } catch (e) {
          console.error('Error parsing completed steps from localStorage:', e);
          setCompletedSteps(new Set());
        }
      } else {
        setCompletedSteps(new Set());
      }
    }
  }, [currentSkills]);

  // Save completed steps to localStorage whenever they change
  useEffect(() => {
    if (currentSkills) {
      localStorage.setItem(`completedSteps_${currentSkills}`, JSON.stringify([...completedSteps]));
    }
  }, [completedSteps, currentSkills]);

  // Check if all steps are completed for celebration
  useEffect(() => {
    if (roadmapData && roadmapData.roadmap && completedSteps.size === roadmapData.roadmap.length && roadmapData.roadmap.length > 0) {
      setShowCelebration(true);
      // Hide celebration after 5 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [completedSteps, roadmapData]);

  // Toggle step completion with sequential logic
  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      
      // If step is already completed, allow unchecking
      if (newSet.has(stepIndex)) {
        newSet.delete(stepIndex);
        return newSet;
      }
      
      // Check if previous step is completed (or if it's the first step)
      if (stepIndex === 0 || newSet.has(stepIndex - 1)) {
        newSet.add(stepIndex);
      }
      
      return newSet;
    });
  };

  // Reset progress
  const resetProgress = () => {
    setCompletedSteps(new Set());
    if (currentSkills) {
      localStorage.removeItem(`completedSteps_${currentSkills}`);
    }
  };

  // Add auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get motivational message based on progress
  const getProgressMessage = () => {
    if (!roadmapData || !roadmapData.roadmap) return '';
    
    const totalSteps = roadmapData.roadmap.length;
    const completed = completedSteps.size;
    
    if (completed === 0) return "Start your journey by completing the first step!";
    if (completed === 1) return "Great start! Keep going to build momentum.";
    if (completed === Math.floor(totalSteps / 2)) return "You're halfway there! Keep up the good work.";
    if (completed === totalSteps - 1) return "Almost there! Complete the final step to finish your journey.";
    if (completed === totalSteps) return "Congratulations! You've completed your entire learning path!";
    
    const percentage = Math.round((completed / totalSteps) * 100);
    if (percentage < 30) return "Keep going, you're making progress!";
    if (percentage < 60) return "You're on the right track! Keep pushing forward.";
    if (percentage < 90) return "You're doing great! Almost at the finish line.";
    
    return "You're nearly there! Just a few more steps to go.";
  };

  // Get achievement badge based on progress
  const getAchievementBadge = () => {
    if (!roadmapData || !roadmapData.roadmap) return null;
    
    const totalSteps = roadmapData.roadmap.length;
    const completed = completedSteps.size;
    
    if (completed === 0) return null;
    if (completed === 1) return { icon: 'fas fa-flag-checkered', text: 'First Step', color: 'blue' };
    if (completed === Math.floor(totalSteps / 4)) return { icon: 'fas fa-medal', text: 'Quarter Way', color: 'green' };
    if (completed === Math.floor(totalSteps / 2)) return { icon: 'fas fa-trophy', text: 'Halfway Done', color: 'yellow' };
    if (completed === Math.floor(totalSteps * 0.75)) return { icon: 'fas fa-award', text: 'Three Quarters', color: 'orange' };
    if (completed === totalSteps) return { icon: 'fas fa-crown', text: 'Completion Master', color: 'purple' };
    
    return null;
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-24 professional-background relative overflow-hidden ${isDark ? 'dark' : 'light'}`}>
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
          <div className={`absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`}></div>
          
          {/* Subtle particle effects */}
          <div className={`absolute top-1/3 left-1/3 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{animationDuration: '9s', marginLeft: '-1px', marginTop: '-1px'}}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full animate-drift ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{animationDuration: '11s', marginLeft: '-0.75px', marginTop: '-0.75px'}}></div>
          <div className={`absolute top-2/3 left-1/5 w-2.5 h-2.5 rounded-full animate-driftDelayed ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDuration: '13s', marginLeft: '-1.25px', marginTop: '-1.25px'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center p-8 rounded-3xl backdrop-blur-xl border animate-pulse gradient-border">
            <div className="flex justify-center mb-6">
              <div className={`w-16 h-16 rounded-full border-4 ${isDark ? 'border-blue-500 border-t-transparent' : 'border-blue-400 border-t-transparent'} animate-spin`}></div>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Generating Your Flowchart
            </h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Creating a personalized learning path for <span className="font-semibold">{currentSkills || 'your selected domain'}</span>...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen pt-24 professional-background relative overflow-hidden ${isDark ? 'dark' : 'light'}`}>
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
          <div className={`absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="text-center p-10 rounded-3xl backdrop-blur-xl border gradient-border">
            <div className="mb-6">
              <i className={`fas fa-exclamation-triangle text-5xl ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`}></i>
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Error Loading Flowchart
            </h1>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {error}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 gradient-border"
              >
                <i className="fas fa-home mr-2"></i>
                Go Back Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 gradient-border"
              >
                <i className="fas fa-sync mr-2"></i>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 professional-background relative overflow-hidden ${isDark ? 'dark' : 'light'}`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
        <div className={`absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`}></div>
        
        {/* Subtle particle effects */}
        <div className={`absolute top-1/3 left-1/3 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{animationDuration: '9s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full animate-drift ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{animationDuration: '11s', marginLeft: '-0.75px', marginTop: '-0.75px'}}></div>
        <div className={`absolute top-2/3 left-1/5 w-2.5 h-2.5 rounded-full animate-driftDelayed ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDuration: '13s', marginLeft: '-1.25px', marginTop: '-1.25px'}}></div>
      </div>
      
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <div className={`text-3xl font-bold px-6 py-3 rounded-full backdrop-blur-xl ${isDark ? 'bg-green-900/50 text-green-200' : 'bg-green-100/50 text-green-800'}`}>
              Congratulations!
            </div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Learning Flowchart
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Visual roadmap for <span className="font-bold gradient-text">{currentSkills || 'your selected domain'}</span>
          </p>
        </div>

        {roadmapData && (
          <div className="mb-12">
            {/* Achievement Badge */}
            {getAchievementBadge() && (
              <div className={`mb-6 p-4 rounded-2xl backdrop-blur-xl border text-center animate-pulse ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
                <i className={`${getAchievementBadge().icon} text-2xl mr-2 ${
                  getAchievementBadge().color === 'blue' ? 'text-blue-500' :
                  getAchievementBadge().color === 'green' ? 'text-green-500' :
                  getAchievementBadge().color === 'yellow' ? 'text-yellow-500' :
                  getAchievementBadge().color === 'orange' ? 'text-orange-500' :
                  getAchievementBadge().color === 'purple' ? 'text-purple-500' : 'text-gray-500'
                }`}></i>
                <span className={`font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Achievement Unlocked: {getAchievementBadge().text}
                </span>
              </div>
            )}
            
            {/* Motivational Message */}
            <div className={`mb-6 p-4 rounded-2xl backdrop-blur-xl border ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
              <p className={`text-center font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                {getProgressMessage()}
              </p>
            </div>
            
            <div className={`p-8 rounded-3xl backdrop-blur-xl border mb-8 gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Learning Path Overview
                  </h2>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Follow this structured approach to master your chosen field
                  </p>
                </div>
                <button
                  onClick={resetProgress}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 mt-4 md:mt-0 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                >
                  <i className="fas fa-redo mr-2"></i>
                  Reset Progress
                </button>
              </div>

              {/* Flowchart Visualization */}
              <div className="relative">
                {/* Connection lines */}
                <div className={`absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b ${isDark ? 'from-blue-500 to-indigo-500' : 'from-blue-400 to-indigo-400'} transform -translate-x-1/2`}></div>
                
                <div className="space-y-8 pl-16">
                  {(roadmapData.roadmap || []).map((step, index) => {
                    const isCompleted = completedSteps.has(index);
                    const isUnlocked = index === 0 || completedSteps.has(index - 1);
                    const isLocked = !isUnlocked && !isCompleted;
                    
                    return (
                      <div key={index} className="relative animate-fadeIn" style={{animationDelay: `${index * 100}ms`}}>
                        {/* Step connector dot */}
                        <div className={`absolute left-[-52px] top-6 w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : isLocked
                              ? (isDark ? 'bg-gray-600' : 'bg-gray-400')
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}>
                          {isCompleted ? (
                            <i className="fas fa-check text-white text-xs"></i>
                          ) : isLocked ? (
                            <i className="fas fa-lock text-white text-xs"></i>
                          ) : (
                            <span className="text-white font-bold text-xs">{index + 1}</span>
                          )}
                        </div>
                        
                        {/* Step card */}
                        <div 
                          className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] gradient-border tilt-effect ${
                            isCompleted 
                              ? (isDark 
                                  ? 'border-green-500/30' 
                                  : 'border-green-200/50')
                              : isLocked
                                ? (isDark 
                                    ? 'border-gray-700/30 opacity-60 cursor-not-allowed' 
                                    : 'border-gray-200/30 opacity-70 cursor-not-allowed')
                                : (isDark 
                                    ? 'border-gray-700/50 cursor-pointer' 
                                    : 'border-gray-200/50 cursor-pointer')
                          }`}
                          onClick={() => {
                            if (!isLocked) {
                              toggleStepCompletion(index);
                            }
                          }}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {step.title}
                              {isLocked && (
                                <span className={`ml-2 text-sm px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                  <i className="fas fa-lock mr-1"></i>
                                  Locked
                                </span>
                              )}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${isDark ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100/50 text-blue-700'}`}>
                              {step.duration}
                            </div>
                          </div>
                          
                          <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {step.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(step.resources || []).slice(0, 3).map((resource, resourceIndex) => (
                              <span 
                                key={resourceIndex}
                                className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100/50 text-blue-700'}`}
                              >
                                {resource}
                              </span>
                            ))}
                            {(step.resources || []).length > 3 && (
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                +{(step.resources || []).length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {isLocked 
                                ? `Complete step ${index} to unlock` 
                                : `Click to mark as ${isCompleted ? 'incomplete' : 'complete'}`}
                            </span>
                            {isCompleted && (
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-green-900/50 text-green-200' : 'bg-green-100/50 text-green-800'}`}>
                                <i className="fas fa-check mr-1"></i>
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className={`p-6 rounded-2xl backdrop-blur-xl border gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Progress Summary
              </h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      style={{ width: `${roadmapData.roadmap && roadmapData.roadmap.length > 0 ? (completedSteps.size / roadmapData.roadmap.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {completedSteps.size} of {roadmapData.roadmap ? roadmapData.roadmap.length : 0} steps completed
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Fallback content if roadmapData is not available */}
        {!roadmapData && !loading && !error && (
          <div className="text-center p-10 rounded-3xl backdrop-blur-xl border gradient-border">
            <div className="mb-6">
              <i className={`fas fa-info-circle text-5xl ${isDark ? 'text-blue-400' : 'text-blue-500'}`}></i>
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Roadmap Data Available
            </h1>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We couldn't generate a roadmap for your selected skills. Please try again or select different skills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 gradient-border"
              >
                <i className="fas fa-home mr-2"></i>
                Select Skills
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 gradient-border"
              >
                <i className="fas fa-sync mr-2"></i>
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flowchart;