'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut, Upload, AlertCircle, CheckCircle, Database
} from 'lucide-react';

export default function ImportPage() {
  const [uploading, setUploading] = useState(false);
  const [importStatus, setImportStatus] = useState<{ status: string; recordCount: number; errors?: Array<{ error: string }> } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setImportStatus(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setImportStatus(result);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus({
        status: 'failed',
        recordCount: 0,
        errors: [{ error: error instanceof Error ? error.message : 'Unknown error' }]
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Import</h1>
              <p className="text-sm text-gray-600">Import Sindhi books from CSV files</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  tab.id === 'import' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Import Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">CSV Import</h2>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload CSV File
              </h3>
              <p className="text-gray-600 mb-6">
                Select the consolidated Sindhi books CSV file to import. The file should contain columns for book titles, authors, and collection information.
              </p>
              
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose CSV File
              </label>
              
              {selectedFile && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={handleImport}
                      disabled={uploading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Database className="w-4 h-4 mr-2" />
                          Start Import
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Import Status */}
          {importStatus && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                {importStatus.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : importStatus.status === 'failed' ? (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <Database className="w-6 h-6 text-yellow-600" />
                )}
                <h4 className="text-lg font-medium text-gray-900">Import Status</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 font-medium ${
                    importStatus.status === 'completed' ? 'text-green-600' :
                    importStatus.status === 'failed' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {importStatus.status.charAt(0).toUpperCase() + importStatus.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Records Processed:</span>
                  <span className="ml-2 font-medium">{importStatus.recordCount.toLocaleString()}</span>
                </div>
              </div>
              
              {importStatus.errors && importStatus.errors.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Errors ({importStatus.errors.length})</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto bg-red-50 border border-red-200 rounded-md p-3">
                    {importStatus.errors.slice(0, 10).map((error, index: number) => (
                      <div key={index} className="text-xs text-red-700 mb-1">
                        {error.error}
                      </div>
                    ))}
                    {importStatus.errors.length > 10 && (
                      <div className="text-xs text-red-500 mt-2">
                        ... and {importStatus.errors.length - 10} more errors
                      </div>
                    )}
                  </div>
                </div>
              )}

              {importStatus.status === 'completed' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✅ Import completed successfully! {importStatus.recordCount.toLocaleString()} books have been imported.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Import Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• The CSV file should have headers: id, book_name_english, book_name_devanagari, book_name_perso_arabic, author_name_english, author_name_devanagari, author_name_perso_arabic, collection_location, address, other_details, image, available_online</li>
              <li>• The import process will create search vectors for multi-script search</li>
              <li>• Large files may take several minutes to process</li>
              <li>• Duplicate records (based on original ID) will be updated</li>
              <li>• AI features (summaries, embeddings) are optional and can be added later</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
