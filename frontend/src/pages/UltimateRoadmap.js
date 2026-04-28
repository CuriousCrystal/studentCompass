import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { careerAPI } from '../services/api';

const SimplifiedUltimateRoadmap = () => {
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
  const [usingDemoData, setUsingDemoData] = useState(false); // New state to track demo data usage
  
  const navigate = useNavigate();
  const { currentSkills, currentExpertise } = useAppContext();
  const { isDark } = useTheme();

  // Fetch roadmap data from your API
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingDemoData(false); // Reset demo data flag
        
        // Check if skills and expertise are available
        if (!currentSkills || !currentExpertise) {
          throw new Error('Skills and expertise are required to generate a personalized roadmap');
        }
        
        const data = await careerAPI.analyzeCareer(currentSkills, currentExpertise);
        setRoadmapData(data);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        // Set flag to indicate we're using demo data
        setUsingDemoData(true);
        // Only show error if it's not a network error (since we have fallback)
        if (!err.message.includes('Network Error') && !err.message.includes('Unable to connect to server')) {
          setError(err.message || 'Failed to fetch roadmap data. Please try again.');
        }
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
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm + ' course')}&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`;
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
          setYoutubeVideos(getDemoVideos(12));
          setShowYouTubeVideos(true);
        }
      } else {
        console.log('YouTube API response not OK, using demo videos');
        // Fallback to demo videos
        setYoutubeVideos(getDemoVideos(12));
        setShowYouTubeVideos(true);
      }
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      // Fallback to demo videos without showing error
      setYoutubeVideos(getDemoVideos(12));
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
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm + ' course')}&maxResults=12&key=${GOOGLE_BOOKS_API_KEY}`;
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
          setBooks(getDemoBooks(12));
          setShowBooks(true);
        }
      } else {
        console.log('Google Books API response not OK, using demo books');
        // Fallback to demo books
        setBooks(getDemoBooks(12));
        setShowBooks(true);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to demo books without showing error
      setBooks(getDemoBooks(12));
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
        const demoCertifications = getDemoCertifications(12);
        setCertifications(demoCertifications);
        setShowCertifications(true);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      // Fallback to demo certifications without showing error
      setCertifications(getDemoCertifications(12));
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
        console.log('No courses in roadmapData, using demo courses');
        // Fallback to demo courses if no data from backend
        const demoCourses = getDemoCourses(12);
        setCourses(demoCourses);
        setShowCourses(true);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to demo courses without showing error
      const demoCourses = getDemoCourses(12);
      setCourses(demoCourses);
      setShowCourses(true);
    } finally {
      setLoadingResources(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${isDark ? 'dark' : 'light'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Generating Your Roadmap
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Creating a personalized learning path for {currentSkills || 'your selected domain'}...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Demo videos as fallback
  const getDemoVideos = (count = 12) => {
    const videos = [];
    for (let i = 1; i <= count; i++) {
      videos.push({
        title: `${i <= 4 ? 'Complete Course' : i <= 8 ? "Beginner's Guide" : 'Advanced'} on ${currentSkills || "Engineering"} - Part ${i}`,
        channel: `${i <= 4 ? 'Educational Channel' : i <= 8 ? 'Learning Academy' : 'Expert Tutorials'} ${Math.ceil(i/4)}`,
        description: `${i <= 4 ? 'Learn' : i <= 8 ? 'Perfect for beginners to start their' : 'Master advanced concepts in'} ${currentSkills || "Engineering"} from ${i <= 4 ? 'basics to advanced level' : i <= 8 ? 'the beginning' : 'expert techniques'}`,
        thumbnail: `https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=${i <= 4 ? 'Course' : i <= 8 ? 'Beginner' : 'Advanced'}+${i}`,
        url: `https://youtube.com/watch?v=demo${i}`
      });
    }
    return videos;
  };

  // Demo books as fallback
  const getDemoBooks = (count = 12) => {
    const books = [];
    for (let i = 1; i <= count; i++) {
      books.push({
        title: `${i <= 4 ? 'Complete Guide' : i <= 8 ? 'Mastering' : 'Career Path'} to ${currentSkills || "Engineering"} - Volume ${i}`,
        authors: `${i <= 4 ? 'Expert Author' : i <= 8 ? 'Professional Developer' : 'Industry Expert'} ${Math.ceil(i/4)}`,
        description: `${i <= 4 ? 'Comprehensive guide covering all aspects' : i <= 8 ? 'Practical approach to mastering' : 'Step-by-step guide to building a successful career in'} ${currentSkills || "Engineering"}`,
        thumbnail: `https://via.placeholder.com/128x192/4F46E5/FFFFFF?text=Book+${i}`,
        url: "https://www.google.com/search?q=" + encodeURIComponent("best books on " + (currentSkills || "Engineering")) + " filetype:pdf",
        publishedDate: `202${i % 3}`,
        pageCount: `${150 + i * 10}`
      });
    }
    return books;
  };

  // Demo certifications as fallback
  const getDemoCertifications = (count = 12) => {
    const certificationPlatforms = [
      { name: 'Credly', url: 'https://www.credly.com/search?q=', category: 'professional' },
      { name: 'Coursera', url: 'https://www.coursera.org/search?query=', category: 'university' },
      { name: 'CompTIA', url: 'https://www.comptia.org/certifications/search?q=', category: 'it' },
      { name: 'PMI', url: 'https://www.pmi.org/certifications/search?q=', category: 'management' },
      { name: 'AWS', url: 'https://aws.amazon.com/training/search/?search=', category: 'cloud' },
      { name: 'Microsoft', url: 'https://learn.microsoft.com/en-us/search/?terms=', category: 'technology' },
      { name: 'Google', url: 'https://cloud.google.com/certification/search?q=', category: 'cloud' },
      { name: 'Cisco', url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/search.html?q=', category: 'networking' }
    ];
    
    const certs = [];
    for (let i = 1; i <= count; i++) {
      const platform = certificationPlatforms[(i - 1) % certificationPlatforms.length];
      const skillTerm = encodeURIComponent(currentSkills || 'certification');
      certs.push({
        title: `${currentSkills} ${i <= 3 ? 'Foundational' : i <= 6 ? 'Professional' : i <= 9 ? 'Expert' : 'Master'} Certification`,
        provider: platform.name,
        type: i % 2 === 0 ? "Paid" : "Free",
        description: `${i <= 4 ? 'Entry-level certification for beginners in' : i <= 8 ? 'Professional certification for experienced practitioners in' : 'Advanced certification for experts in'} ${currentSkills || "the field"}`,
        url: `${platform.url}${skillTerm}`,
        difficulty: i <= 4 ? "Beginner" : i <= 8 ? "Intermediate" : "Advanced",
        duration: `${i <= 4 ? '1-3' : i <= 8 ? '3-6' : '6-12'} months`
      });
    }
    return certs;
  };

  // Demo courses as fallback
  const getDemoCourses = (count = 12) => {
    const coursePlatforms = [
      { name: 'Coursera', url: 'https://www.coursera.org/courses?query=', category: 'university' },
      { name: 'Udemy', url: 'https://www.udemy.com/courses/search/?q=', category: 'professional' },
      { name: 'edX', url: 'https://www.edx.org/search?q=', category: 'university' },
      { name: 'Pluralsight', url: 'https://www.pluralsight.com/search?q=', category: 'it' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org/search?page_search_query=', category: 'educational' },
      { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/search?keywords=', category: 'professional' },
      { name: 'Skillshare', url: 'https://www.skillshare.com/search?query=', category: 'creative' },
      { name: 'FutureLearn', url: 'https://www.futurelearn.com/search?q=', category: 'university' }
    ];
    
    const courses = [];
    for (let i = 1; i <= count; i++) {
      const platform = coursePlatforms[(i - 1) % coursePlatforms.length];
      const skillTerm = encodeURIComponent(currentSkills || 'course');
      courses.push({
        title: `${currentSkills} ${i <= 4 ? 'Fundamentals' : i <= 8 ? 'Advanced' : 'Specialization'} Course`,
        provider: platform.name,
        type: i % 3 === 0 ? "Self-paced" : i % 3 === 1 ? "Instructor-led" : "Hybrid",
        description: `${i <= 4 ? 'Beginner-friendly introduction to' : i <= 8 ? 'Comprehensive coverage of' : 'Advanced mastery of'} ${currentSkills || "the subject"} with practical projects`,
        url: `${platform.url}${skillTerm}`,
        difficulty: i <= 4 ? "Beginner" : i <= 8 ? "Intermediate" : "Advanced",
        duration: `${i <= 4 ? '4-6' : i <= 8 ? '8-12' : '12-16'} weeks`
      });
    }
    return courses;
  };

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${isDark ? 'dark' : 'light'} relative overflow-hidden`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Learning Roadmap
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Personalized path for {currentSkills || 'your selected domain'}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-lg flex items-center ${isDark ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            <i className="fas fa-edit mr-2"></i>
            Change Skills
          </button>
        </div>

        {/* Error message display - only show non-network errors or when not using demo data */}
        {error && !usingDemoData && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900/50 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
              <span className={isDark ? 'text-red-200' : 'text-red-700'}>{error}</span>
            </div>
          </div>
        )}

        {/* Info message when using demo data */}
        {usingDemoData && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/50 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="flex items-center">
              <i className="fas fa-info-circle text-blue-500 mr-2"></i>
              <span className={isDark ? 'text-blue-200' : 'text-blue-700'}>
                Showing demo data. Connect to the backend server for personalized recommendations.
              </span>
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learning Roadmap Section */}
            <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Suggested Learning Roadmap
                </h2>
                <span className={`text-sm px-3 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                  {roadmapData?.roadmap?.length || 3} steps
                </span>
              </div>
              
              <div className="space-y-6">
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
                  <div 
                    key={index} 
                    className="relative pl-8 pb-6 border-l-2 border-indigo-500 last:border-l-0 last:pb-0"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {step.title}
                        </h3>
                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>
                          {step.duration}
                        </span>
                      </div>
                      <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {step.description}
                      </p>
                      
                      {/* Key Activities Section */}
                      <div className="mt-4">
                        <h4 className={`text-sm font-semibold mb-2 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          <i className="fas fa-tasks mr-2 text-indigo-500"></i>
                          Key Activities
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {(step.keyActivities || ["Complete assigned tasks", "Participate in team meetings", "Review documentation"]).map((activity, actIndex) => (
                            <li 
                              key={actIndex} 
                              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                            >
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Skills You'll Gain Section */}
                      <div className="mt-4">
                        <h4 className={`text-sm font-semibold mb-2 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          <i className="fas fa-graduation-cap mr-2 text-green-500"></i>
                          Skills You'll Gain
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(step.skillsGained || ["Technical skills", "Problem solving", "Communication"]).map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-green-100 text-green-800 border border-green-200'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Recommended Resources Section */}
                      <div className="mt-4">
                        <h4 className={`text-sm font-semibold mb-2 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          <i className="fas fa-book mr-2 text-blue-500"></i>
                          Recommended Resources
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(step.resources || ["Documentation", "Tutorials", "Community forums"]).map((resource, resIndex) => (
                            <span 
                              key={resIndex} 
                              className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}
                            >
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Resources Section */}
            <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recommended Resources
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => {
                    console.log('YouTube button clicked');
                    searchYouTubeVideos();
                  }}
                  disabled={loadingResources && selectedResourceType === 'youtube'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                    showYouTubeVideos 
                      ? (isDark ? 'bg-red-900/50 border-2 border-red-700 text-red-300' : 'bg-red-100 border-2 border-red-500 text-red-700') 
                      : (isDark ? 'bg-gray-700/50 border-2 border-gray-600 hover:bg-red-900/30 hover:border-red-600 text-gray-300' : 'bg-gray-50 border-2 border-gray-200 hover:bg-red-50 hover:border-red-300 text-gray-700')
                  }`}
                >
                  {loadingResources && selectedResourceType === 'youtube' ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mb-2"></div>
                  ) : (
                    <i className="fab fa-youtube text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">YouTube Videos</span>
                </button>
                
                <button
                  onClick={searchBooks}
                  disabled={loadingResources && selectedResourceType === 'books'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                    showBooks 
                      ? (isDark ? 'bg-green-900/50 border-2 border-green-700 text-green-300' : 'bg-green-100 border-2 border-green-500 text-green-700') 
                      : (isDark ? 'bg-gray-700/50 border-2 border-gray-600 hover:bg-green-900/30 hover:border-green-600 text-gray-300' : 'bg-gray-50 border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 text-gray-700')
                  }`}
                >
                  {loadingResources && selectedResourceType === 'books' ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mb-2"></div>
                  ) : (
                    <i className="fas fa-book text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Books</span>
                </button>
                
                <button
                  onClick={searchCertifications}
                  disabled={loadingResources && selectedResourceType === 'certifications'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                    showCertifications 
                      ? (isDark ? 'bg-blue-900/50 border-2 border-blue-700 text-blue-300' : 'bg-blue-100 border-2 border-blue-500 text-blue-700') 
                      : (isDark ? 'bg-gray-700/50 border-2 border-gray-600 hover:bg-blue-900/30 hover:border-blue-600 text-gray-300' : 'bg-gray-50 border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700')
                  }`}
                >
                  {loadingResources && selectedResourceType === 'certifications' ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                  ) : (
                    <i className="fas fa-certificate text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Certifications</span>
                </button>
                
                <button
                  onClick={searchCourses}
                  disabled={loadingResources && selectedResourceType === 'courses'}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                    showCourses 
                      ? (isDark ? 'bg-indigo-900/50 border-2 border-indigo-700 text-indigo-300' : 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700') 
                      : (isDark ? 'bg-gray-700/50 border-2 border-gray-600 hover:bg-indigo-900/30 hover:border-indigo-600 text-gray-300' : 'bg-gray-50 border-2 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 text-gray-700')
                  }`}
                >
                  {loadingResources && selectedResourceType === 'courses' ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mb-2"></div>
                  ) : (
                    <i className="fas fa-graduation-cap text-2xl mb-2"></i>
                  )}
                  <span className="font-medium">Online Courses</span>
                </button>
              </div>

              <div className="resource-content-area" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                {showYouTubeVideos && (
                  <div className="animate-fadeIn">
                    <h3 className={`text-lg font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <i className="fab fa-youtube text-red-500 mr-2"></i>
                      Recommended Videos
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                      {youtubeVideos.map((video, index) => (
                        <div 
                          key={index} 
                          className={`rounded-lg p-4 border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-24 h-16 object-cover rounded mr-4 flex-shrink-0"
                            />
                            <div className="flex-grow">
                              <h4 className={`font-semibold text-sm line-clamp-2 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {video.title}
                              </h4>
                              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {video.channel}
                              </p>
                              {video.publishedAt && (
                                <div className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                  Published: {new Date(video.publishedAt).toLocaleDateString()}
                                </div>
                              )}
                              <a 
                                href={video.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`text-xs font-medium inline-flex items-center ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                              >
                                Watch on YouTube
                                <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowYouTubeVideos(false)}
                        className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Hide Videos
                      </button>
                    </div>
                  </div>
                )}

                {showBooks && (
                  <div className="animate-fadeIn">
                    <h3 className={`text-lg font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <i className="fas fa-book text-green-500 mr-2"></i>
                      Recommended Books
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                      {books.map((book, index) => (
                        <div 
                          key={index} 
                          className={`rounded-lg p-4 border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex">
                            <img 
                              src={book.thumbnail} 
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded mr-4 flex-shrink-0"
                            />
                            <div className="flex-grow">
                              <h4 className={`font-semibold text-sm line-clamp-2 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {book.title}
                              </h4>
                              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {book.authors}
                              </p>
                              <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                {book.description}
                              </p>
                              <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                <span>{book.publishedDate}</span>
                                <span>{book.pageCount} pages</span>
                              </div>
                              <a 
                                href={book.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`text-xs font-medium inline-flex items-center mt-1 ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                              >
                                View Book
                                <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowBooks(false)}
                        className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Hide Books
                      </button>
                    </div>
                  </div>
                )}

                {showCertifications && (
                  <div className="animate-fadeIn">
                    <h3 className={`text-lg font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <i className="fas fa-certificate text-blue-500 mr-2"></i>
                      Recommended Certifications
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                      {certifications.map((cert, index) => (
                        <div 
                          key={index} 
                          className={`rounded-lg p-4 border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-semibold text-sm line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {cert.title || cert.name}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              cert.type === 'Free' 
                                ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800') 
                                : (isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800')
                            }`}>
                              {cert.type}
                            </span>
                          </div>
                          <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Provider: {cert.provider}
                          </p>
                          <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {cert.description}
                          </p>
                          <div className={`flex justify-between text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            <span>Difficulty: {cert.difficulty}</span>
                            <span>Duration: {cert.duration}</span>
                          </div>
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-xs font-medium inline-flex items-center mt-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                          >
                            View Certification
                            <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowCertifications(false)}
                        className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Hide Certifications
                      </button>
                    </div>
                  </div>
                )}

                {showCourses && (
                  <div className="animate-fadeIn">
                    <h3 className={`text-lg font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <i className="fas fa-graduation-cap text-indigo-500 mr-2"></i>
                      Recommended Courses
                    </h3>
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                      {courses.map((course, index) => (
                        <div 
                          key={index} 
                          className={`rounded-lg p-4 border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-semibold text-sm line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {course.title}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              course.type === 'Free' 
                                ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800') 
                                : (isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800')
                            }`}>
                              {course.type}
                            </span>
                          </div>
                          <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Provider: {course.provider}
                          </p>
                          <div className={`flex justify-between text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            <span>Difficulty: {course.difficulty}</span>
                            <span>Duration: {course.duration}</span>
                          </div>
                          <a 
                            href={course.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-xs font-medium inline-flex items-center mt-2 ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
                          >
                            View Course
                            <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowCourses(false)}
                        className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Hide Courses
                      </button>
                    </div>
                  </div>
                )}

                {!showYouTubeVideos && !showBooks && !showCertifications && !showCourses && !loadingResources && (
                  <div className="text-center py-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                      <i className="fas fa-book-open text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Resource Recommendations
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Select a category above to find recommended resources for your learning journey.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className={`flex items-center justify-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <i className="fab fa-youtube text-red-500 mr-2"></i>
                        <span>Video Tutorials</span>
                      </div>
                      <div className={`flex items-center justify-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <i className="fas fa-book text-green-500 mr-2"></i>
                        <span>Books & Guides</span>
                      </div>
                      <div className={`flex items-center justify-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <i className="fas fa-certificate text-blue-500 mr-2"></i>
                        <span>Certifications</span>
                      </div>
                      <div className={`flex items-center justify-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <i className="fas fa-graduation-cap text-indigo-500 mr-2"></i>
                        <span>Online Courses</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`mt-8 rounded-xl p-6 ${isDark ? 'bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200'}`}>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                <i className="fas fa-project-diagram text-indigo-600 text-2xl"></i>
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Visual Learning Path
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                View your learning path as an interactive flowchart for better visualization.
              </p>
              <button
                onClick={() => navigate('/flowchart')}
                className={`mt-5 px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-semibold mx-auto ${isDark ? 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'}`}
              >
                <i className="fas fa-project-diagram"></i>
                <span>View Interactive Flowchart</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedUltimateRoadmap;