'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters } from '@/types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    script: 'all',
    availableOnline: undefined,
  });
  const [fuzzySearch, setFuzzySearch] = useState(true);

  const handleSearch = () => {
    onSearch({
      ...filters,
      query: query.trim() || undefined,
      fuzzy: fuzzySearch,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      script: 'all',
      availableOnline: undefined,
    });
    setQuery('');
    setFuzzySearch(true);
    onSearch({ script: 'all', fuzzy: true });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search Sindhi books by title, author, or content..."
              className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none"
              disabled={loading}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-4 border-l border-gray-200 hover:bg-gray-50 transition-colors ${
              showFilters ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-4 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Script Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Script
              </label>
              <select
                value={filters.script || 'all'}
                onChange={(e) => setFilters({ ...filters, script: e.target.value as 'english' | 'devanagari' | 'perso-arabic' | 'all' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Scripts</option>
                <option value="english">English</option>
                <option value="devanagari">Devanagari</option>
                <option value="perso-arabic">Perso-Arabic</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availableOnline === undefined ? 'all' : filters.availableOnline.toString()}
                onChange={(e) => {
                  const value = e.target.value === 'all' ? undefined : e.target.value === 'true';
                  setFilters({ ...filters, availableOnline: value });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Books</option>
                <option value="true">Online Only</option>
                <option value="false">Physical Only</option>
              </select>
            </div>

            {/* Collection Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection
              </label>
              <input
                type="text"
                value={filters.collectionLocation || ''}
                onChange={(e) => setFilters({ ...filters, collectionLocation: e.target.value || undefined })}
                placeholder="Filter by location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Fuzzy Search Toggle */}
            <div className="md:col-span-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={fuzzySearch}
                  onChange={(e) => setFuzzySearch(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Enable fuzzy search (find similar words and partial matches)
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

