'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { SearchFilters, SearchResult } from '@/types';
import { BookOpen, Users, MapPin, Globe } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('q', filters.query);
      if (filters.script) params.append('script', filters.script);
      if (filters.availableOnline !== undefined) params.append('online', filters.availableOnline.toString());
      if (filters.collectionLocation) params.append('location', filters.collectionLocation);
      if (filters.author) params.append('author', filters.author);
      if (filters.fuzzy !== undefined) params.append('fuzzy', filters.fuzzy.toString());

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              SindhiSanchaya
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover and explore the rich collection of Sindhi literature
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{stats.totalBooks.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Total Books</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{stats.onlineBooks.toLocaleString()}</div>
                <div className="text-sm text-green-700">Online Books</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{stats.collections}</div>
                <div className="text-sm text-purple-700">Collections</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-900">500+</div>
                <div className="text-sm text-orange-700">Authors</div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
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
                <button className="text-blue-600 hover:text-blue-800 font-medium">Browse Collection →</button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Religious Texts</h3>
                <p className="text-gray-600 mb-4">Sacred texts and spiritual literature in Sindhi</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Browse Collection →</button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Works</h3>
                <p className="text-gray-600 mb-4">Contemporary Sindhi literature and academic works</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Browse Collection →</button>
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
