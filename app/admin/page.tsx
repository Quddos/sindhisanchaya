'use client';

import { useState } from 'react';
import { Upload, FileText, Database, Users, BookOpen, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [importStatus, setImportStatus] = useState<{ status: string; recordCount: number; errors?: Array<{ error: string }> } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setUploading(true);
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
        throw new Error('Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Import failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          {/* Import Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Data Import
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload CSV File
                </h3>
                <p className="text-gray-600 mb-4">
                  Select the consolidated Sindhi books CSV file to import
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Choose File
                </label>
                
                {selectedFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <button
                      onClick={handleImport}
                      disabled={uploading}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Importing...
                        </>
                      ) : (
                        'Start Import'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Import Status */}
            {importStatus && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Import Status</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 font-medium ${
                      importStatus.status === 'completed' ? 'text-green-600' :
                      importStatus.status === 'failed' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {importStatus.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Records:</span>
                    <span className="ml-2 font-medium">{importStatus.recordCount}</span>
                  </div>
                </div>
                
                {importStatus.errors && importStatus.errors.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Errors ({importStatus.errors.length})</span>
                    </div>
                    <div className="max-h-32 overflow-y-auto">
                      {importStatus.errors.slice(0, 5).map((error, index: number) => (
                        <div key={index} className="text-xs text-red-600 mb-1">
                          {error.error}
                        </div>
                      ))}
                      {importStatus.errors.length > 5 && (
                        <div className="text-xs text-gray-500">
                          ... and {importStatus.errors.length - 5} more errors
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">Total Books</p>
                  <p className="text-2xl font-bold text-blue-900">Loading...</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Online Books</p>
                  <p className="text-2xl font-bold text-green-900">Loading...</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-600">Collections</p>
                  <p className="text-2xl font-bold text-purple-900">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

