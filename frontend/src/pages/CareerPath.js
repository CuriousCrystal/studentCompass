import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const CareerPath = () => {
  const navigate = useNavigate();
  const { currentSkills, setCurrentSkills, setCurrentExpertise } = useAppContext();
  const { isDark } = useTheme();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Revolutionary Career Data with ALL DOMAINS - Trendy ones first!
  const careerPaths = {
    // 🔥 TRENDING CAREERS 2024 🔥
    'Artificial Intelligence': {
      icon: '🤖',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Build intelligent systems that learn and adapt',
      averageSalary: '₹8,00,000 - ₹20,00,000',
      growthRate: '+43%',
      demandLevel: 'Extremely High',
      trending: true,
      specializations: [
        { name: 'Machine Learning Engineering', difficulty: 'Expert', timeToMaster: '24-36 months' },
        { name: 'Computer Vision', difficulty: 'Expert', timeToMaster: '20-30 months' },
        { name: 'Natural Language Processing', difficulty: 'Expert', timeToMaster: '24-30 months' },
        { name: 'AI Research', difficulty: 'Expert', timeToMaster: '36-48 months' }
      ],
      skills: ['Deep Learning', 'Python/PyTorch', 'Neural Networks', 'Research'],
      companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Microsoft India'],
      dayInLife: [
        '9:00 AM - Research paper review and model architecture design',
        '11:00 AM - Training and fine-tuning AI models',
        '1:00 PM - Data preprocessing and feature engineering',
        '3:00 PM - Model evaluation and performance optimization',
        '5:00 PM - Documentation and research collaboration'
      ]
    },
    'Blockchain Technology': {
      icon: '🔗',
      gradient: 'from-yellow-600 to-orange-600',
      description: 'Build decentralized systems and smart contracts',
      averageSalary: '₹6,00,000 - ₹15,00,000',
      growthRate: '+67%',
      demandLevel: 'Very High',
      trending: true,
      specializations: [
        { name: 'Smart Contract Development', difficulty: 'Advanced', timeToMaster: '18-24 months' },
        { name: 'DeFi Development', difficulty: 'Expert', timeToMaster: '24-30 months' },
        { name: 'Blockchain Security', difficulty: 'Expert', timeToMaster: '20-28 months' },
        { name: 'NFT Development', difficulty: 'Intermediate', timeToMaster: '12-18 months' }
      ],
      skills: ['Solidity', 'Web3', 'Cryptography', 'Distributed Systems'],
      companies: ['CoinDCX', 'WazirX', 'ZebPay', 'Unocoin', 'Bitbns'],
      dayInLife: [
        '9:00 AM - Smart contract architecture design',
        '11:00 AM - Coding and testing blockchain applications',
        '1:00 PM - Security audits and testing',
        '3:00 PM - Community collaboration and research',
        '5:00 PM - Documentation and deployment'
      ]
    },
    'Cloud Computing': {
      icon: '☁️',
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Build and manage scalable cloud infrastructure',
      averageSalary: '₹5,00,000 - ₹14,00,000',
      growthRate: '+29%',
      demandLevel: 'Very High',
      trending: true,
      specializations: [
        { name: 'AWS Solutions Architecture', difficulty: 'Advanced', timeToMaster: '15-20 months' },
        { name: 'Azure Engineering', difficulty: 'Advanced', timeToMaster: '15-20 months' },
        { name: 'Google Cloud Platform', difficulty: 'Advanced', timeToMaster: '15-20 months' },
        { name: 'Multi-Cloud Strategy', difficulty: 'Expert', timeToMaster: '24-30 months' }
      ],
      skills: ['Cloud Architecture', 'Containerization', 'Microservices', 'Infrastructure as Code'],
      companies: ['Amazon India', 'Microsoft India', 'Google India', 'IBM India', 'Oracle India'],
      dayInLife: [
        '9:00 AM - Infrastructure monitoring and optimization',
        '11:00 AM - Cloud architecture design sessions',
        '1:00 PM - Cost optimization and resource management',
        '3:00 PM - Security compliance and governance',
        '5:00 PM - Team mentoring and knowledge sharing'
      ]
    },
    // 💻 SOFTWARE ENGINEERING & TECH
    'Software Engineering': {
      icon: '💻',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Build the digital future with cutting-edge technology',
      averageSalary: '₹4,00,000 - ₹18,00,000',
      growthRate: '+22%',
      demandLevel: 'Very High',
      specializations: [
        { name: 'Full-Stack Development', difficulty: 'Intermediate', timeToMaster: '12-18 months' },
        { name: 'DevOps Engineering', difficulty: 'Advanced', timeToMaster: '18-24 months' },
        { name: 'Mobile Development', difficulty: 'Intermediate', timeToMaster: '10-15 months' },
        { name: 'AI/ML Engineering', difficulty: 'Expert', timeToMaster: '24-36 months' }
      ],
      skills: ['Programming', 'Problem Solving', 'System Design', 'Debugging'],
      companies: ['TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'HCL'],
      dayInLife: [
        '9:00 AM - Review code and plan daily tasks',
        '10:00 AM - Collaborate with team on new features',
        '12:00 PM - Development and coding',
        '3:00 PM - Code reviews and testing',
        '5:00 PM - Documentation and planning tomorrow'
      ]
    },
    'Web Development': {
      icon: '🌐',
      gradient: 'from-green-600 to-blue-600',
      description: 'Create dynamic websites and web applications',
      averageSalary: '₹3,00,000 - ₹10,00,000',
      growthRate: '+15%',
      demandLevel: 'High',
      specializations: [
        { name: 'Frontend Development', difficulty: 'Intermediate', timeToMaster: '10-15 months' },
        { name: 'Backend Development', difficulty: 'Intermediate', timeToMaster: '12-18 months' },
        { name: 'Full-Stack Development', difficulty: 'Advanced', timeToMaster: '18-24 months' },
        { name: 'Progressive Web Apps', difficulty: 'Advanced', timeToMaster: '15-20 months' }
      ],
      skills: ['HTML/CSS/JavaScript', 'React/Vue/Angular', 'Node.js', 'Database Design'],
      companies: ['Zoho', 'Freshworks', 'Postman', 'Hasura', 'Druva'],
      dayInLife: [
        '9:00 AM - Design review and wireframe analysis',
        '11:00 AM - Frontend component development',
        '1:00 PM - API integration and backend work',
        '3:00 PM - Testing and debugging',
        '5:00 PM - Performance optimization and deployment'
      ]
    },
    'Mobile Development': {
      icon: '📱',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Build native and cross-platform mobile applications',
      averageSalary: '₹4,00,000 - ₹12,00,000',
      growthRate: '+19%',
      demandLevel: 'High',
      specializations: [
        { name: 'iOS Development', difficulty: 'Intermediate', timeToMaster: '12-18 months' },
        { name: 'Android Development', difficulty: 'Intermediate', timeToMaster: '12-18 months' },
        { name: 'React Native', difficulty: 'Intermediate', timeToMaster: '10-15 months' },
        { name: 'Flutter Development', difficulty: 'Intermediate', timeToMaster: '10-15 months' }
      ],
      skills: ['Swift/Kotlin', 'React Native/Flutter', 'UI/UX Design', 'Mobile Architecture'],
      companies: ['OLA', 'Swiggy', 'Zomato', 'BYJUS', 'Hotstar'],
      dayInLife: [
        '9:00 AM - App performance monitoring and bug fixes',
        '11:00 AM - Feature development and UI implementation',
        '1:00 PM - Testing on multiple devices',
        '3:00 PM - App store optimization and deployment',
        '5:00 PM - User feedback analysis and planning'
      ]
    }
  };

  const handleCareerSelect = async (careerName) => {
    setIsLoading(true);
    setSelectedCareer(careerName);
    
    // Simulate API call for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentSkills(careerName);
    setCurrentExpertise('Beginner');
    setIsLoading(false);
    
    // Scroll to the career details section after selection
    setTimeout(() => {
      const element = document.getElementById('career-details-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If the element doesn't exist, scroll to the top of the page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const startLearningJourney = () => {
    navigate('/simplified-ultimate-roadmap');
  };

  return (
    <div className={`min-h-screen professional-background relative overflow-hidden ${isDark ? 'dark' : 'light'}`}>
      {/* Enhanced Creative Background System */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}></div>
        
        {/* Floating Orbs with Organic Movement */}
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full opacity-15 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
        <div className={`absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-20 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`} style={{animationDuration: '12s'}}></div>
        
        {/* Subtle particle effects */}
        <div className={`absolute top-1/3 left-1/4 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{animationDuration: '8s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        <div className={`absolute top-1/4 left-2/3 w-1.5 h-1.5 rounded-full animate-drift ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{animationDuration: '10s', marginLeft: '-0.75px', marginTop: '-0.75px'}}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full animate-driftDelayed ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDuration: '14s', marginLeft: '-0.5px', marginTop: '-0.5px'}}></div>
        <div className={`absolute top-2/3 left-1/5 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-300' : 'bg-blue-400'}`} style={{animationDuration: '11s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        
        {/* Gentle rotating elements */}
        <div className={`absolute top-1/6 right-1/6 w-20 h-20 border ${isDark ? 'border-blue-500/30' : 'border-blue-400/30'} rounded-full animate-rotateSlow`} style={{animationDuration: '25s'}}></div>
        
        {/* Pulsing glow effects */}
        <div className={`absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/20'} animate-pulseGlow`} style={{animationDuration: '7s'}}></div>
      </div>

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Revolutionary Header */}
          <div className="text-center mb-20">
            <div className={`inline-flex items-center px-8 py-4 rounded-3xl mb-10 backdrop-blur-xl border transition-all duration-500 hover:scale-105 gradient-border animate-levitate ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <span className="font-extrabold text-xl gradient-text">Career Discovery</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              DISCOVER YOUR
              <span className={`block gradient-text-animated`}>
                PERFECT CAREER
              </span>
            </h1>
            
            <p className={`text-xl max-w-4xl mx-auto mb-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Explore high-demand careers with real salary data, growth projections, and personalized learning paths. 
              Your future starts with the right choice.
            </p>

            {currentSkills && (
              <div className={`inline-flex items-center px-6 py-3 rounded-2xl backdrop-blur-xl border mb-10 animate-pulse gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">
                  Current Path: {currentSkills}
                </span>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className={`fixed inset-0 ${isDark ? 'bg-black/70' : 'bg-gray-900/70'} backdrop-blur-md flex items-center justify-center z-50`}>
              <div className={`p-12 rounded-3xl backdrop-blur-xl border-2 text-center gradient-border animate-pulse ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 border-4 border-t-transparent rounded-full animate-spin ${isDark ? 'border-blue-500' : 'border-blue-400'}`}></div>
                </div>
                <h3 className={`text-3xl font-extrabold mt-6 mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Analyzing Career Path
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Generating your personalized learning roadmap...
                </p>
                <div className="mt-6 flex justify-center">
                  <div className={`w-48 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Career Grid with Enhanced Visual Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {Object.entries(careerPaths).map(([careerName, career], index) => (
              <div 
                key={careerName}
                onClick={() => handleCareerSelect(careerName)}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl border cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 gradient-border tilt-effect animate-fadeIn ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
                style={{
                  boxShadow: isDark 
                    ? '0 25px 50px -12px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(0, 0, 0, 0.1)',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Career Icon with Enhanced Animation */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden bg-gradient-to-br ${career.gradient}`} style={{
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)'
                }}>
                  <div className={`absolute inset-0 rounded-2xl animate-pulse ${isDark ? 'bg-white/10' : 'bg-white/20'}`}></div>
                  <div className="relative z-10 group-hover:animate-bounce">
                    {career.icon}
                  </div>
                </div>
                
                <h3 className={`text-2xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {careerName}
                </h3>
                
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {career.description}
                </p>
                
                {/* Key Stats with Enhanced Design */}
                <div className="space-y-3 mb-6">
                  <div className={`flex justify-between items-center p-3 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-white/20'}`}>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Salary Range
                    </span>
                    <span className={`text-sm font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                      {career.averageSalary}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-white/20'}`}>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Growth Rate
                    </span>
                    <span className={`text-sm font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent`}>
                      {career.growthRate}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-white/20'}`}>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Demand
                    </span>
                    <span className={`text-sm font-extrabold ${
                      career.demandLevel === 'Extremely High' ? 'text-red-500' :
                      career.demandLevel === 'Very High' ? 'text-orange-500' :
                      'text-yellow-500'
                    }`}>
                      {career.demandLevel}
                    </span>
                  </div>
                </div>
                
                {/* Trending Badge for Popular Careers */}
                {career.trending && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold animate-pulse ${isDark ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'}`}>
                      🔥 Trending
                    </span>
                  </div>
                )}
                
                {/* Hover Action with Enhanced Animation */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${career.gradient} mb-4 animate-pulse`}></div>
                  <div className="text-center">
                    <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Click to explore this path →
                    </span>
                  </div>
                </div>
                
                {/* Floating Particles with Enhanced Animation */}
                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-ping transition-all duration-500" style={{
                  background: `linear-gradient(45deg, ${career.gradient.includes('blue') ? '#3B82F6' : career.gradient.includes('indigo') ? '#6366F1' : '#0EA5E9'}, ${career.gradient.includes('indigo') ? '#6366F1' : '#0EA5E9'})`
                }}></div>
              </div>
            ))}
          </div>

          {/* Selected Career Details */}
          {selectedCareer && !isLoading && (
            <div id="career-details-section" className={`mb-20 p-10 rounded-3xl backdrop-blur-xl border transition-all duration-1000 animate-fadeIn gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <div className="text-center mb-12">
                <h2 className={`text-4xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Journey in {selectedCareer}
                </h2>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Everything you need to know about this career path
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-10">
                  {/* Specializations */}
                  <div>
                    <h3 className={`text-2xl font-extrabold mb-8 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Specializations
                    </h3>
                    <div className="grid gap-5">
                      {careerPaths[selectedCareer].specializations.map((spec, index) => (
                        <div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <h4 className={`font-extrabold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {spec.name}
                            </h4>
                            <span className={`text-xs px-3 py-2 rounded-full font-bold ${
                              spec.difficulty === 'Expert' 
                                ? (isDark ? 'bg-red-900/50 text-red-200' : 'bg-red-100/50 text-red-800') :
                              spec.difficulty === 'Advanced' 
                                ? (isDark ? 'bg-orange-900/50 text-orange-200' : 'bg-orange-100/50 text-orange-800') :
                                (isDark ? 'bg-green-900/50 text-green-200' : 'bg-green-100/50 text-green-800')
                            }`}>
                              {spec.difficulty}
                            </span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Time to Master: {spec.timeToMaster}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <h3 className={`text-2xl font-extrabold mb-8 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Essential Skills
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {careerPaths[selectedCareer].skills.map((skill, index) => (
                        <span key={index} className={`px-6 py-3 rounded-2xl text-sm font-extrabold transition-all duration-300 hover:scale-110 gradient-border ${isDark ? 'border-blue-500/40' : 'border-blue-200/50'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-10">
                  {/* Top Companies */}
                  <div>
                    <h3 className={`text-2xl font-extrabold mb-8 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Top Employers
                    </h3>
                    <div className="grid grid-cols-2 gap-5">
                      {careerPaths[selectedCareer].companies.map((company, index) => (
                        <div key={index} className={`p-5 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03] gradient-border ${isDark ? 'border-blue-500/35' : 'border-blue-200/50'}`}>
                          <span className={`font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {company}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day in Life */}
                  <div>
                    <h3 className={`text-2xl font-extrabold mb-8 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
                      </svg>
                      A Day in the Life
                    </h3>
                    <div className="space-y-5">
                      {careerPaths[selectedCareer].dayInLife.map((activity, index) => (
                        <div key={index} className={`flex items-start p-5 rounded-2xl transition-all duration-300 hover:scale-[1.01] gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                          <div className={`w-3 h-3 rounded-full mt-3 mr-5 flex-shrink-0 bg-gradient-to-r ${careerPaths[selectedCareer].gradient}`}></div>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Journey Button */}
              <div className="text-center mt-16">
                <button
                  onClick={startLearningJourney}
                  className="group px-12 py-5 rounded-3xl font-extrabold text-xl transition-all duration-500 hover:scale-110 transform-gpu text-white gradient-border animate-levitate"
                  style={{
                    background: `linear-gradient(135deg, ${careerPaths[selectedCareer].gradient.replace('from-', '').replace('-600', '').replace(' to-', ', ')})`,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Start Your {selectedCareer} Journey
                    <svg className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPath;