'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, FileText, Database, Users, BookOpen, 
  LogOut, UserPlus, Edit, Trash2, Plus, Search
} from 'lucide-react';

interface Stats {
  totalBooks: number;
  onlineBooks: number;
  collections: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalBooks: 0, onlineBooks: 0, collections: 0, totalUsers: 0 });
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SindhiSanchaya Admin</h1>
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
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Database, href: '/admin/dashboard' },
              { id: 'books', label: 'Books', icon: BookOpen, href: '/admin/books' },
              { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
              { id: 'import', label: 'Import', icon: Upload, href: '/admin/import' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBooks.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Online Books</p>
                <p className="text-2xl font-bold text-gray-900">{stats.onlineBooks.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Collections</p>
                <p className="text-2xl font-bold text-gray-900">{stats.collections}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/books"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Manage Books</p>
                <p className="text-sm text-gray-600">View, edit, and delete books</p>
              </div>
            </a>
            
            <a
              href="/admin/users"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Users className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-600">Add, edit, and manage users</p>
              </div>
            </a>
            
            <a
              href="/admin/import"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Upload className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Import Data</p>
                <p className="text-sm text-gray-600">Upload CSV files</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
