import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const BookSearchTest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  const searchBooks = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    setBooks([]);
    
    try {
      // Use the Google Books API with the API key from env
      const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
      const keyParam = GOOGLE_BOOKS_API_KEY ? `&key=${GOOGLE_BOOKS_API_KEY}` : '';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=6${keyParam}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
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
          
          setBooks(processedBooks);
        } else {
          setError('No books found for your search term.');
        }
      } else {
        setError('Failed to fetch books. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className={`text-3xl font-black mb-8 animate-float ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Google Books API Test
      </h2>
      
      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books by title, author, or topic..."
            className={`w-full px-6 py-4 rounded-2xl text-lg backdrop-blur-xl border gradient-border focus:outline-none focus:ring-4 transition-all duration-300 shadow-lg ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500/30' 
                : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500/20'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 gradient-border ${
              loading || !searchTerm.trim()
                ? (isDark 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                : (isDark 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600')
            }`}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-search mr-2"></i>
                Search
              </>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className={`p-6 rounded-2xl backdrop-blur-xl border mb-8 animate-fadeIn gradient-border ${
          isDark 
            ? 'bg-red-900/20 border-red-700/50 text-red-200' 
            : 'bg-red-50/50 border-red-200/50 text-red-700'
        }`}>
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-xl mr-3"></i>
            <span className="font-bold">{error}</span>
          </div>
        </div>
      )}
      
      {books.length > 0 && (
        <div className="animate-fadeIn">
          <h3 className={`text-2xl font-bold mb-6 flex items-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-book mr-3"></i>
            Search Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div 
                key={index} 
                className={`rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-500 hover:scale-[1.02] gradient-border tilt-effect animate-fadeIn ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600/70' 
                    : 'bg-white/50 border-gray-200/50 hover:border-gray-300/70'
                }`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <img 
                        src={book.thumbnail} 
                        alt={book.title}
                        className="h-56 object-contain rounded-2xl shadow-lg"
                      />
                      <div className={`absolute -bottom-3 -right-3 px-3 py-1 rounded-full text-xs font-bold ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      }`}>
                        <i className="fas fa-book mr-1"></i>
                        Book
                      </div>
                    </div>
                  </div>
                  <h4 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{book.title}</h4>
                  <p className={`text-sm mb-3 ${
                    isDark ? 'text-blue-300' : 'text-blue-600'
                  }`}>{book.authors}</p>
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{book.description}</p>
                  <div className={`flex justify-between text-xs mb-5 p-3 rounded-xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                  }`}>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      <i className="far fa-calendar mr-1"></i>
                      {book.publishedDate}
                    </span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      <i className="far fa-file mr-1"></i>
                      {book.pageCount} pages
                    </span>
                  </div>
                  <a 
                    href={book.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-block w-full text-center py-3 px-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] gradient-border ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                    }`}
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Book Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {books.length === 0 && !loading && !error && (
        <div className={`text-center p-12 rounded-3xl backdrop-blur-xl border gradient-border ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        }`}>
          <div className="mb-6">
            <i className={`fas fa-book-open text-5xl ${isDark ? 'text-blue-400' : 'text-blue-500'}`}></i>
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Search for Books
          </h3>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter a topic, title, or author in the search box above to find relevant books and learning resources.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookSearchTest;
