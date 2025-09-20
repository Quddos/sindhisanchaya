'use client';

import { useState } from 'react';
import { Book } from '@/types';
import { X, MapPin, Calendar, User, ExternalLink, Sparkles, Loader2 } from 'lucide-react';

interface BookDetailsModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const [aiSummary, setAiSummary] = useState<string | null>(book.summary || null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  if (!isOpen) return null;

  const getDisplayTitle = () => {
    if (book.titleEnglish && book.titleEnglish.trim() && !book.titleEnglish.includes('?')) {
      return book.titleEnglish;
    }
    if (book.titleDevanagari && book.titleDevanagari.trim() && !book.titleDevanagari.includes('?')) {
      return book.titleDevanagari;
    }
    if (book.titlePersoArabic && book.titlePersoArabic.trim() && !book.titlePersoArabic.includes('?')) {
      return book.titlePersoArabic;
    }
    return 'Untitled';
  };

  const getDisplayAuthor = () => {
    if (book.authorEnglish && book.authorEnglish.trim() && !book.authorEnglish.includes('?')) {
      return book.authorEnglish;
    }
    if (book.authorDevanagari && book.authorDevanagari.trim() && !book.authorDevanagari.includes('?')) {
      return book.authorDevanagari;
    }
    if (book.authorPersoArabic && book.authorPersoArabic.trim() && !book.authorPersoArabic.includes('?')) {
      return book.authorPersoArabic;
    }
    return 'Unknown Author';
  };

  const generateAISummary = async () => {
    setLoadingSummary(true);
    setSummaryError(null);
    
    try {
      const response = await fetch(`/api/books/${book.id}/summary`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiSummary(data.summary);
      } else {
        const error = await response.json();
        setSummaryError(error.error || 'Failed to generate summary');
      }
    } catch (error) {
      setSummaryError('Network error. Please try again.');
    } finally {
      setLoadingSummary(false);
    }
  };

  const openMapLocation = () => {
    if (book.address) {
      const encodedAddress = encodeURIComponent(book.address);
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Cover */}
            <div className="space-y-4">
              <div className="aspect-[2/3] bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-lg font-bold text-center mb-2 leading-tight">
                    {getDisplayTitle()}
                  </h3>
                  <p className="text-sm text-center opacity-90">
                    {getDisplayAuthor()}
                  </p>
                </div>
                {book.availableOnline && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Online
                  </div>
                )}
                {!book.availableOnline && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Physical
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {book.availableOnline && book.onlineUrl && (
                  <a
                    href={book.onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Online
                  </a>
                )}
                
                {!book.availableOnline && book.address && (
                  <button
                    onClick={openMapLocation}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    View Location
                  </button>
                )}

                <button
                  onClick={generateAISummary}
                  disabled={loadingSummary}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loadingSummary ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {aiSummary ? 'Regenerate AI Summary' : 'Generate AI Summary'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="font-medium">{getDisplayAuthor()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Added</p>
                      <p className="font-medium">{new Date(book.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {book.collectionLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Collection</p>
                        <p className="font-medium">{book.collectionLocation}</p>
                      </div>
                    </div>
                  )}

                  {book.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-sm">{book.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Summary */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Summary
                </h3>
                
                {summaryError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <p className="text-red-700 text-sm">{summaryError}</p>
                  </div>
                )}

                {aiSummary ? (
                  <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                    <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 text-sm">
                      Click "Generate AI Summary" to get an AI-powered summary of this book.
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Details */}
              {book.otherDetails && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{book.otherDetails}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
