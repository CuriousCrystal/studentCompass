import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { careerAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EnhancedRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showYouTubeVideos, setShowYouTubeVideos] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [books, setBooks] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState('');
  
  const navigate = useNavigate();
  const { currentSkills, currentExpertise } = useAppContext();

  // Animation hooks for staggered entrance
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch roadmap data from your API
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if skills and expertise are available
        if (!currentSkills || !currentExpertise) {
          throw new Error('Skills and expertise are required to generate a personalized roadmap');
        }
        
        const data = await careerAPI.analyzeCareer(currentSkills, currentExpertise);
        setRoadmapData(data);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        setError(err.message || 'Failed to fetch roadmap data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if both skills and expertise are available
    if (currentSkills && currentExpertise) {
      fetchRoadmapData();
    } else {
      if (!currentSkills || !currentExpertise) {
        setError('Please provide your skills and expertise level to generate a personalized roadmap.');
      }
      setLoading(false);
    }
  }, [currentSkills, currentExpertise]);

  // Search YouTube videos based on current skills using custom API
  const searchYouTubeVideos = async () => {
    console.log('searchYouTubeVideos called with skills:', currentSkills);
    setLoadingResources(true);
    setSelectedResourceType('youtube');
    setShowBooks(false);
    setShowCertifications(false);
    setShowCourses(false);
    
    try {
      const searchTerm = currentSkills || 'engineering';
      // Using the official YouTube Data API v3
      const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyAytoNZiRTkprioNLhFVd9sUmAkn-RVyMg';
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm + ' course')}&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`;
      console.log('Fetching YouTube API:', url);
      const response = await fetch(url);
      console.log('YouTube API response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('YouTube API response data:', data);
        
        if (data && data.items && data.items.length > 0) {
          // Process official YouTube API response
          const processedVideos = data.items.map(video => ({
            title: video.snippet.title,
            channel: video.snippet.channelTitle,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            publishedAt: video.snippet.publishedAt
          }));
          
          console.log('Processed YouTube videos:', processedVideos);
          setYoutubeVideos(processedVideos);
          setShowYouTubeVideos(true);
        } else {
          console.log('No YouTube videos found, using demo videos');
          // Fallback to demo videos
          setYoutubeVideos(getDemoVideos());
          setShowYouTubeVideos(true);
        }
      } else {
        console.log('YouTube API response not OK, using demo videos');
        // Fallback to demo videos
        setYoutubeVideos(getDemoVideos());
        setShowYouTubeVideos(true);
      }
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      // Fallback to demo videos
      setYoutubeVideos(getDemoVideos());
      setShowYouTubeVideos(true);
    } finally {
      setLoadingResources(false);
    }
  };

  // Search books based on current skills using Google Books API
  const searchBooks = async () => {
    console.log('searchBooks called with skills:', currentSkills);
    setLoadingResources(true);
    setSelectedResourceType('books');
    setShowYouTubeVideos(false);
    setShowCertifications(false);
    setShowCourses(false);
    
    try {
      const searchTerm = currentSkills || 'engineering';
      // Using the Google Books API
      const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY || 'AIzaSyAytoNZiRTkprioNLhFVd9sUmAkn-RVyMg';
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm + ' course')}&maxResults=6&key=${GOOGLE_BOOKS_API_KEY}`;
      console.log('Fetching Google Books API:', url);
      const response = await fetch(url);
      console.log('Google Books API response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Google Books API response data:', data);
        
        if (data && data.items && data.items.length > 0) {
          // Process Google Books API response
          const processedBooks = data.items.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: book.volumeInfo.description ? book.volumeInfo.description.substring(0, 150) + '...' : 'No description available',
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover',
            url: book.volumeInfo.infoLink || '#',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
            pageCount: book.volumeInfo.pageCount || 'Unknown'
          }));
          
          console.log('Processed books:', processedBooks);
          setBooks(processedBooks);
          setShowBooks(true);
        } else {
          console.log('No books found, using demo books');
          // Fallback to demo books
          setBooks(getDemoBooks());
          setShowBooks(true);
        }
      } else {
        console.log('Google Books API response not OK, using demo books');
        // Fallback to demo books
        setBooks(getDemoBooks());
        setShowBooks(true);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to demo books
      setBooks(getDemoBooks());
      setShowBooks(true);
    } finally {
      setLoadingResources(false);
    }
  };

  // Search certifications based on current skills
  const searchCertifications = async () => {
    console.log('searchCertifications called with roadmapData:', roadmapData);
    setLoadingResources(true);
    setSelectedResourceType('certifications');
    setShowYouTubeVideos(false);
    setShowBooks(false);
    setShowCourses(false);
    
    try {
      // Use actual certifications from the roadmap data if available
      if (roadmapData && roadmapData.certifications && roadmapData.certifications.length > 0) {
        console.log('Using certifications from roadmapData');
        // Transform backend certifications to match frontend format
        const transformedCertifications = roadmapData.certifications.map(cert => ({
          title: cert.name || cert.title,
          provider: cert.provider,
          type: cert.type || 'Paid', // Use type from backend or default to Paid
          description: cert.description,
          url: cert.url,
          difficulty: cert.difficulty,
          duration: cert.duration
        }));
        
        console.log('Transformed certifications:', transformedCertifications);
        setCertifications(transformedCertifications);
        setShowCertifications(true);
      } else {
        console.log('No certifications in roadmapData, using demo certifications');
        // Fallback to demo certifications if no data from backend
        const demoCertifications = getDemoCertifications();
        setCertifications(demoCertifications);
        setShowCertifications(true);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      // Fallback to demo certifications
      setCertifications(getDemoCertifications());
      setShowCertifications(true);
    } finally {
      setLoadingResources(false);
    }
  };

  // Search courses based on current skills
  const searchCourses = async () => {
    console.log('searchCourses called with roadmapData:', roadmapData);
    setLoadingResources(true);
    setSelectedResourceType('courses');
    setShowYouTubeVideos(false);
    setShowBooks(false);
    setShowCertifications(false);
    
    try {
      // Use actual courses from the roadmap data if available
      if (roadmapData && roadmapData.courses && roadmapData.courses.length > 0) {
        console.log('Using courses from roadmapData');
        setCourses(roadmapData.courses);
        setShowCourses(true);
      } else {
        console.log('No courses in roadmapData, using empty array');
        // Fallback to empty array if no data from backend
        setCourses([]);
        setShowCourses(true);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to empty array
      setCourses([]);
      setShowCourses(true);
    } finally {
      setLoadingResources(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center mb-8"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Generating Your Roadmap
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            Creating a personalized learning path for {currentSkills || 'your selected domain'}...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Demo videos as fallback
  const getDemoVideos = () => {
    return [
      {
        title: "Complete Course on " + (currentSkills || "Engineering"),
        channel: "Educational Channel",
        description: "Learn " + (currentSkills || "Engineering") + " from basics to advanced level",
        thumbnail: "https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=Course+" + (currentSkills || "Engineering"),
        url: "https://youtube.com/watch?v=demo1"
      },
      {
        title: "Beginner's Guide to " + (currentSkills || "Engineering"),
        channel: "Learning Academy",
        description: "Perfect for beginners to start their " + (currentSkills || "Engineering") + " journey",
        thumbnail: "https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=Beginner+" + (currentSkills || "Engineering"),
        url: "https://youtube.com/watch?v=demo2"
      },
      {
        title: "Advanced " + (currentSkills || "Engineering") + " Techniques",
        channel: "Expert Tutorials",
        description: "Master advanced concepts in " + (currentSkills || "Engineering"),
        thumbnail: "https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=Advanced+" + (currentSkills || "Engineering"),
        url: "https://youtube.com/watch?v=demo3"
      }
    ];
  };

  // Demo books as fallback
  const getDemoBooks = () => {
    return [
      {
        title: "Complete Guide to " + (currentSkills || "Engineering"),
        authors: "Expert Author",
        description: "Comprehensive guide covering all aspects of " + (currentSkills || "Engineering"),
        thumbnail: "https://via.placeholder.com/128x192/4F46E5/FFFFFF?text=Book+" + (currentSkills || "Engineering"),
        url: "#",
        publishedDate: "2023",
        pageCount: "300"
      },
      {
        title: "Mastering " + (currentSkills || "Engineering") + " Skills",
        authors: "Professional Developer",
        description: "Practical approach to mastering " + (currentSkills || "Engineering") + " skills",
        thumbnail: "https://via.placeholder.com/128x192/4F46E5/FFFFFF?text=Master+" + (currentSkills || "Engineering"),
        url: "#",
        publishedDate: "2022",
        pageCount: "250"
      },
      {
        title: "Career Path in " + (currentSkills || "Engineering"),
        authors: "Industry Expert",
        description: "Step-by-step guide to building a successful career in " + (currentSkills || "Engineering"),
        thumbnail: "https://via.placeholder.com/128x192/4F46E5/FFFFFF?text=Career+" + (currentSkills || "Engineering"),
        url: "#",
        publishedDate: "2023",
        pageCount: "200"
      }
    ];
  };

  // Demo certifications as fallback
  const getDemoCertifications = () => {
    return [
      {
        title: currentSkills + " Professional Certification",
        provider: "Certification Institute",
        type: "Paid",
        description: "Industry-recognized certification for " + (currentSkills || "Engineering") + " professionals",
        url: "https://example.com/certification1",
        difficulty: "Intermediate",
        duration: "3-6 months"
      },
      {
        title: "Advanced " + (currentSkills || "Engineering") + " Certificate",
        provider: "Online Learning Platform",
        type: "Free",
        description: "Free certification course for advanced " + (currentSkills || "Engineering") + " concepts",
        url: "https://example.com/certification2",
        difficulty: "Advanced",
        duration: "2-4 months"
      },
      {
        title: "Beginner's " + (currentSkills || "Engineering") + " Certification",
        provider: "Educational Organization",
        type: "Paid",
        description: "Entry-level certification for beginners in " + (currentSkills || "Engineering"),
        url: "https://example.com/certification3",
        difficulty: "Beginner",
        duration: "1-3 months"
      },
      {
        title: currentSkills + " Specialization Certificate",
        provider: "Tech Academy",
        type: "Free",
        description: "Free specialization course with certificate in " + (currentSkills || "Engineering"),
        url: "https://example.com/certification4",
        difficulty: "Intermediate",
        duration: "2-3 months"
      }
    ];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Roadmap</h1>
            <p className="text-gray-600">Personalized path for {currentSkills || 'your selected domain'}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <i className="fas fa-edit mr-2"></i>
            Change Skills
          </motion.button>
        </motion.div>

        {/* Error message display if there's an error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                <span className="text-red-700">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Suggested Learning Roadmap</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {roadmapData?.roadmap?.length || 3} steps
                </span>
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Show actual roadmap data if available, otherwise show demo data */}
                {(roadmapData?.roadmap && roadmapData.roadmap.length > 0 ? roadmapData.roadmap : [
                  {
                    title: "Foundational Skills",
                    duration: "2-3 months",
                    description: "Start with the basics of " + (currentSkills || "your selected domain") + " to build a strong foundation.",
                    keyActivities: [
                      "Complete introductory tutorials and courses",
                      "Set up development environment",
                      "Practice basic coding exercises",
                      "Join online communities and forums"
                    ],
                    skillsGained: [
                      "Basic syntax and concepts",
                      "Problem-solving fundamentals",
                      "Debugging techniques",
                      "Version control basics"
                    ],
                    resources: [
                      "Documentation and official guides",
                      "Interactive coding platforms",
                      "Beginner-friendly YouTube channels",
                      "Mentorship programs"
                    ]
                  },
                  {
                    title: "Intermediate Concepts",
                    duration: "3-6 months",
                    description: "Deepen your understanding with more complex topics and real-world applications.",
                    keyActivities: [
                      "Build personal projects",
                      "Contribute to open-source projects",
                      "Participate in coding challenges",
                      "Attend workshops and meetups"
                    ],
                    skillsGained: [
                      "Advanced programming concepts",
                      "System design principles",
                      "Collaboration tools",
                      "Testing methodologies"
                    ],
                    resources: [
                      "Intermediate courses and tutorials",
                      "Technical blogs and articles",
                      "Industry conferences",
                      "Professional networking events"
                    ]
                  },
                  {
                    title: "Advanced Techniques",
                    duration: "6+ months",
                    description: "Master advanced skills and stay updated with the latest trends.",
                    keyActivities: [
                      "Lead complex projects",
                      "Mentor junior developers",
                      "Publish technical content",
                      "Pursue specialized certifications"
                    ],
                    skillsGained: [
                      "Architectural design",
                      "Performance optimization",
                      "Leadership and management",
                      "Research and innovation"
                    ],
                    resources: [
                      "Advanced courses and specializations",
                      "Research papers and publications",
                      "Industry expert sessions",
                      "Professional development programs"
                    ]
                  }
                ]).map((step, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="relative pl-8 pb-6 border-l-2 border-indigo-200 last:border-l-0 last:pb-0"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <motion.div 
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium"
                        >
                          {step.duration}
                        </motion.span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Key Activities Section */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <i className="fas fa-tasks mr-2 text-indigo-500"></i>
                          Key Activities
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {(step.keyActivities || ["Complete assigned tasks", "Participate in team meetings", "Review documentation"]).map((activity, actIndex) => (
                            <motion.li 
                              key={actIndex} 
                              whileHover={{ x: 5 }}
                              className="text-sm"
                            >
                              {activity}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Skills You'll Gain Section */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <i className="fas fa-graduation-cap mr-2 text-green-500"></i>
                          Skills You'll Gain
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(step.skillsGained || ["Technical skills", "Problem solving", "Communication"]).map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex} 
                              whileHover={{ scale: 1.05 }}
                              className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-100"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Recommended Resources Section */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <i className="fas fa-book mr-2 text-blue-500"></i>
                          Recommended Resources
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(step.resources || ["Documentation", "Tutorials", "Community forums"]).map((resource, resIndex) => (
                            <motion.span 
                              key={resIndex} 
                              whileHover={{ scale: 1.05 }}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                            >
                              {resource}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold text-gray-900 mb-6"
              >
                Recommended Resources
              </motion.h2>
              
              <motion.div 
                className="grid grid-cols-2 gap-3 mb-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('YouTube button clicked');
                    searchYouTubeVideos();
                  }}
                  disabled={loadingResources && selectedResourceType === 'youtube'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative z-20 ${
                    showYouTubeVideos 
                      ? 'bg-red-100 border-2 border-red-500 text-red-700' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-red-50 hover:border-red-300 text-gray-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {loadingResources && selectedResourceType === 'youtube' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-6 w-6 border-b-2 border-red-500 mb-2"
                    ></motion.div>
                  ) : (
                    <i className="fab fa-youtube text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">YouTube Videos</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('Books button clicked');
                    searchBooks();
                  }}
                  disabled={loadingResources && selectedResourceType === 'books'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative z-20 ${
                    showBooks 
                      ? 'bg-green-100 border-2 border-green-500 text-green-700' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 text-gray-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {loadingResources && selectedResourceType === 'books' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-6 w-6 border-b-2 border-green-500 mb-2"
                    ></motion.div>
                  ) : (
                    <i className="fas fa-book text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Books</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('Certifications button clicked');
                    searchCertifications();
                  }}
                  disabled={loadingResources && selectedResourceType === 'certifications'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative z-20 ${
                    showCertifications 
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-700' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {loadingResources && selectedResourceType === 'certifications' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"
                    ></motion.div>
                  ) : (
                    <i className="fas fa-certificate text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Certifications</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('Courses button clicked');
                    searchCourses();
                  }}
                  disabled={loadingResources && selectedResourceType === 'courses'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative z-20 ${
                    showCourses 
                      ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 text-gray-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {loadingResources && selectedResourceType === 'courses' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-6 w-6 border-b-2 border-indigo-500 mb-2"
                    ></motion.div>
                  ) : (
                    <i className="fas fa-graduation-cap text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Online Courses</span>
                </motion.button>
              </motion.div>

              <div className="mt-4">
                <AnimatePresence mode="wait">
                  {showYouTubeVideos && (
                    <motion.div
                      key="youtube"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="animate-fadeIn"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="fab fa-youtube text-red-500 mr-2"></i>
                        Recommended Videos
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                        {youtubeVideos.map((video, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex">
                              <motion.img 
                                whileHover={{ scale: 1.05 }}
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-24 h-16 object-cover rounded mr-4 flex-shrink-0"
                              />
                              <div className="flex-grow">
                                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                  {video.title}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">
                                  {video.channel}
                                </p>
                                {video.publishedAt && (
                                  <div className="text-xs text-gray-500 mb-2">
                                    Published: {new Date(video.publishedAt).toLocaleDateString()}
                                  </div>
                                )}
                                <motion.a 
                                  whileHover={{ scale: 1.05 }}
                                  href={video.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                                >
                                  Watch on YouTube
                                  <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                </motion.a>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowYouTubeVideos(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Hide Videos
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {showBooks && (
                    <motion.div
                      key="books"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="animate-fadeIn"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="fas fa-book text-green-500 mr-2"></i>
                        Recommended Books
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                        {books.map((book, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex">
                              <motion.img 
                                whileHover={{ scale: 1.05 }}
                                src={book.thumbnail} 
                                alt={book.title}
                                className="w-12 h-16 object-cover rounded mr-4 flex-shrink-0"
                              />
                              <div className="flex-grow">
                                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                  {book.title}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">
                                  {book.authors}
                                </p>
                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                  {book.description}
                                </p>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>{book.publishedDate}</span>
                                  <span>{book.pageCount} pages</span>
                                </div>
                                <motion.a 
                                  whileHover={{ scale: 1.05 }}
                                  href={book.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-green-600 hover:text-green-800 font-medium inline-flex items-center mt-1"
                                >
                                  View Book
                                  <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                </motion.a>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowBooks(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Hide Books
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {showCertifications && (
                    <motion.div
                      key="certifications"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="animate-fadeIn"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="fas fa-certificate text-blue-500 mr-2"></i>
                        Recommended Certifications
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                        {certifications.map((cert, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                {cert.title || cert.name}
                              </h4>
                              <motion.span 
                                whileHover={{ scale: 1.1 }}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  cert.type === 'Free' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                {cert.type}
                              </motion.span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              Provider: {cert.provider}
                            </p>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                              {cert.description}
                            </p>
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                              <span>Difficulty: {cert.difficulty}</span>
                              <span>Duration: {cert.duration}</span>
                            </div>
                            <motion.a 
                              whileHover={{ scale: 1.05 }}
                              href={cert.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-2"
                            >
                              View Certification
                              <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                            </motion.a>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowCertifications(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Hide Certifications
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {showCourses && (
                    <motion.div
                      key="courses"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="animate-fadeIn"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="fas fa-graduation-cap text-indigo-500 mr-2"></i>
                        Recommended Courses
                      </h3>
                      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                        {courses.map((course, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                {course.title}
                              </h4>
                              <motion.span 
                                whileHover={{ scale: 1.1 }}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  course.type === 'Free' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                {course.type}
                              </motion.span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              Provider: {course.provider}
                            </p>
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                              <span>Difficulty: {course.difficulty}</span>
                              <span>Duration: {course.duration}</span>
                            </div>
                            <motion.a 
                              whileHover={{ scale: 1.05 }}
                              href={course.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center mt-2"
                            >
                              View Course
                              <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                            </motion.a>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowCourses(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Hide Courses
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!showYouTubeVideos && !showBooks && !showCertifications && !showCourses && !loadingResources && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                      <i className="fas fa-book-open text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Resource Recommendations</h3>
                    <p className="text-gray-600 mb-4">
                      Select a category above to find recommended resources for your learning journey.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <i className="fab fa-youtube text-red-500 mr-2"></i>
                        <span>Video Tutorials</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <i className="fas fa-book text-green-500 mr-2"></i>
                        <span>Books & Guides</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <i className="fas fa-certificate text-blue-500 mr-2"></i>
                        <span>Certifications</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <i className="fas fa-graduation-cap text-indigo-500 mr-2"></i>
                        <span>Online Courses</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl shadow-lg p-6 border border-indigo-200 transform transition-transform duration-300 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <i className="fas fa-project-diagram text-indigo-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Visual Learning Path</h2>
              <p className="text-gray-700 mb-5">View your learning path as an interactive flowchart for better visualization.</p>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/flowchart')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold mx-auto"
              >
                <i className="fas fa-project-diagram"></i>
                <span>View Interactive Flowchart</span>
                <i className="fas fa-arrow-right"></i>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRoadmap;