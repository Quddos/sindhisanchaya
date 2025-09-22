'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { SearchFilters, SearchResult } from '@/types';
import { BookOpen, Users, MapPin, Globe, Sparkles, Archive, Search, Zap } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});
  const [stats, setStats] = useState({
    totalBooks: 0,
    onlineBooks: 0,
    collections: 0,
  });

  // Load initial stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleSearch = async (filters: SearchFilters, page: number = 1) => {
    setLoading(true);
    setCurrentPage(page);
    setCurrentFilters(filters);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('q', filters.query);
      if (filters.script) params.append('script', filters.script);
      if (filters.availableOnline !== undefined) params.append('online', filters.availableOnline.toString());
      if (filters.collectionLocation) params.append('location', filters.collectionLocation);
      if (filters.author) params.append('author', filters.author);
      if (filters.fuzzy !== undefined) params.append('fuzzy', filters.fuzzy.toString());
      params.append('page', page.toString());
      params.append('limit', '20');

      const response = await fetch(`/api/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    handleSearch(currentFilters, newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/logo.svg" alt="SindhiSanchaya" className="h-12" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-amber-700 hover:text-amber-900 transition-colors">
                About
              </Link>
              <Link href="/copyright" className="text-amber-700 hover:text-amber-900 transition-colors">
                Copyright
              </Link>
            </div>
          </nav>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-2">
              SindhiSanchaya
            </h1>
            <p className="text-lg text-amber-700 mb-6">
              Discover and explore the rich collection of Sindhi literature
            </p>
            
            {/* Animated Digital Archive Description */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-center justify-center mb-4">
                  <Archive className="w-8 h-8 text-amber-600 mr-3 animate-pulse" />
                  <h2 className="text-2xl font-bold text-amber-800">Digital Literature Archive</h2>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-amber-700 text-lg leading-relaxed">
                    Welcome to the world&apos;s most comprehensive digital archive of Sindhi literature. 
                    Our platform brings together <span className="font-semibold text-amber-600">40,000+ books</span> from 
                    classical poetry to modern prose, spanning centuries of literary excellence.
                  </p>
                  <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 mt-4 overflow-x-auto">
                    <div className="flex items-center bg-white rounded-full px-2 sm:px-4 py-2 shadow-sm whitespace-nowrap">
                      <Search className="w-4 h-4 text-green-600 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">AI-Powered Search</span>
                    </div>
                    <div className="flex items-center bg-white rounded-full px-2 sm:px-4 py-2 shadow-sm whitespace-nowrap">
                      <Sparkles className="w-4 h-4 text-purple-600 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Smart Summaries</span>
                    </div>
                    <div className="flex items-center bg-white rounded-full px-2 sm:px-4 py-2 shadow-sm whitespace-nowrap">
                      <Zap className="w-4 h-4 text-yellow-600 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Multi-Script Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-amber-50 rounded-lg p-4">
                <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-900">{stats.totalBooks.toLocaleString()}</div>
                <div className="text-sm text-amber-700">Total Books</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-900">{stats.onlineBooks.toLocaleString()}</div>
                <div className="text-sm text-orange-700">Online Books</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-900">{stats.collections}</div>
                <div className="text-sm text-yellow-700">Collections</div>
              </div>
              <div className="bg-amber-100 rounded-lg p-4">
                <Users className="w-8 h-8 text-amber-700 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-800">500+</div>
                <div className="text-sm text-amber-600">Authors</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Search Results
              </h2>
              <span className="text-gray-600">
                {searchResults.total.toLocaleString()} books found
              </span>
            </div>
            
            {searchResults.books.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
                
                {/* Pagination */}
                {searchResults.total > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-2">
                      {/* First Page */}
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        First
                      </button>
                      
                      {/* Previous Page */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {/* Page Numbers */}
                      {(() => {
                        const totalPages = Math.ceil(searchResults.total / 20);
                        const startPage = Math.max(1, currentPage - 2);
                        const endPage = Math.min(totalPages, currentPage + 2);
                        const pages = [];
                        
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`px-3 py-2 text-sm font-medium border ${
                                i === currentPage
                                  ? 'text-amber-600 bg-amber-50 border-amber-300'
                                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                        return pages;
                      })()}
                      
                      {/* Next Page */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(searchResults.total / 20)}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                      
                      {/* Last Page */}
                      <button
                        onClick={() => handlePageChange(Math.ceil(searchResults.total / 20))}
                        disabled={currentPage >= Math.ceil(searchResults.total / 20)}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Last
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Browse All Books Button */}
        {!searchResults && (
          <div className="mt-12 text-center">
            <button
              onClick={() => handleSearch({}, 1)}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Browse All Books ({stats.totalBooks.toLocaleString()})
            </button>
          </div>
        )}

        {/* Featured Collections */}
        {!searchResults && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Classical Literature</h3>
                <p className="text-gray-600 mb-4">Explore timeless Sindhi poetry and prose from renowned authors</p>
                <button 
                  onClick={() => handleSearch({ collectionLocation: 'Classical' }, 1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Collection →
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Religious Texts</h3>
                <p className="text-gray-600 mb-4">Sacred texts and spiritual literature in Sindhi</p>
                <button 
                  onClick={() => handleSearch({ collectionLocation: 'Religious' }, 1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Collection →
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Works</h3>
                <p className="text-gray-600 mb-4">Contemporary Sindhi literature and academic works</p>
                <button 
                  onClick={() => handleSearch({ collectionLocation: 'Modern' }, 1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Collection →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 SindhiSanchaya. Preserving and sharing Sindhi literature for future generations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
