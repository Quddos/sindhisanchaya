'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, Edit, Trash2, Plus, Search, BookOpen, Eye, EyeOff
} from 'lucide-react';

interface Book {
  id: number;
  titleEnglish?: string;
  titleDevanagari?: string;
  titlePersoArabic?: string;
  authorEnglish?: string;
  availableOnline: boolean;
  collectionLocation?: string;
  createdAt: Date;
}

export default function BooksManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books || []);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const deleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const response = await fetch(`/api/admin/books/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredBooks = books.filter(book => 
    book.titleEnglish?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.titleDevanagari?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.titlePersoArabic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.authorEnglish?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Books Management</h1>
              <p className="text-sm text-gray-600">Manage your Sindhi books catalog</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard' },
              { id: 'books', label: 'Books', href: '/admin/books' },
              { id: 'users', label: 'Users', href: '/admin/users' },
              { id: 'import', label: 'Import', href: '/admin/import' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  tab.id === 'books' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Books ({filteredBooks.length})</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search books by title, author, or collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading books...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {book.titleEnglish || book.titleDevanagari || book.titlePersoArabic || 'Untitled'}
                        </div>
                        {book.titleDevanagari && book.titleDevanagari !== book.titleEnglish && (
                          <div className="text-sm text-gray-500">{book.titleDevanagari}</div>
                        )}
                        {book.titlePersoArabic && book.titlePersoArabic !== book.titleEnglish && (
                          <div className="text-sm text-gray-500">{book.titlePersoArabic}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.authorEnglish || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.availableOnline 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {book.availableOnline ? 'Online' : 'Physical'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.collectionLocation || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteBook(book.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredBooks.length === 0 && (
                <div className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No books found</p>
                  {searchQuery && (
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
