'use client';

import { useState } from 'react';
import { Book } from '@/types';
import { ExternalLink, MapPin, User, Calendar, BookOpen, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';
import BookDetailsModal from './BookDetailsModal';
import { useAutoScrapeCover } from '@/hooks/useAutoScrapeCover';
import MultiScriptText from './MultiScriptText';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { coverImage, isScraping } = useAutoScrapeCover(book);
  const getDisplayTitle = () => {
    // Prioritize English title, fallback to others if English is not meaningful
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
    // Prioritize English author, fallback to others if English is not meaningful
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

  const getCoverImage = () => {
    if (!coverImage) {
      // Generate SVG cover for books without images
      return generateSVGCover(getDisplayTitle(), getDisplayAuthor(), book.availableOnline);
    }
    return coverImage;
  };


  const generateSVGCover = (title: string, author: string, isOnline: boolean) => {
    const gradientColors = isOnline 
      ? { start: '#3B82F6', end: '#1E40AF' } // Blue for online
      : { start: '#10B981', end: '#059669' }; // Green for offline
    
    const svg = `
      <svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${gradientColors.start};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${gradientColors.end};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <!-- Book shadow -->
        <rect x="8" y="8" width="200" height="300" fill="rgba(0,0,0,0.2)" rx="8"/>
        <!-- Main book -->
        <rect width="200" height="300" fill="url(#bookGradient)" rx="8" filter="url(#shadow)"/>
        <!-- Book spine -->
        <rect x="10" y="10" width="20" height="280" fill="rgba(0,0,0,0.2)" rx="4"/>
        <!-- Book pages effect -->
        <rect x="15" y="15" width="180" height="270" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" rx="4"/>
        <!-- Title area -->
        <rect x="40" y="60" width="140" height="80" fill="rgba(255,255,255,0.1)" rx="4"/>
        <!-- Book icon -->
        <g transform="translate(90, 40)">
          <rect x="0" y="0" width="20" height="15" fill="rgba(255,255,255,0.3)" rx="2"/>
          <rect x="2" y="2" width="16" height="11" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1" rx="1"/>
          <line x1="4" y1="5" x2="16" y2="5" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
          <line x1="4" y1="7" x2="16" y2="7" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
          <line x1="4" y1="9" x2="12" y2="9" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        </g>
        <!-- Title text -->
        <text x="110" y="90" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${title.length > 18 ? title.substring(0, 18) + '...' : title}
        </text>
        <!-- Author text -->
        <text x="110" y="120" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">
          ${author.length > 22 ? author.substring(0, 22) + '...' : author}
        </text>
        <!-- Decorative elements -->
        <circle cx="50" cy="200" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="170" cy="200" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="50" cy="220" r="1" fill="rgba(255,255,255,0.2)"/>
        <circle cx="170" cy="220" r="1" fill="rgba(255,255,255,0.2)"/>
        <!-- Bottom text -->
        <text x="110" y="250" font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">
          SindhiSanchaya
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Book Cover */}
      <div className="aspect-[2/3] bg-gray-100 relative">
        <SafeImage
          src={getCoverImage()}
          alt={getDisplayTitle()}
          fill
          className="object-cover"
          fallbackTitle={getDisplayTitle()}
          fallbackAuthor={getDisplayAuthor()}
          isOnline={book.availableOnline}
        />
        {book.availableOnline && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Online
          </div>
        )}
        {!book.availableOnline && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Physical
          </div>
        )}
        {isScraping && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          <MultiScriptText
            titleEnglish={book.titleEnglish}
            titleDevanagari={book.titleDevanagari}
            titlePersoArabic={book.titlePersoArabic}
            type="title"
          />
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <User className="w-4 h-4" />
          <span className="line-clamp-1">
            <MultiScriptText
              authorEnglish={book.authorEnglish}
              authorDevanagari={book.authorDevanagari}
              authorPersoArabic={book.authorPersoArabic}
              type="author"
            />
          </span>
        </div>

        {book.collectionLocation && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{book.collectionLocation}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>Added {new Date(book.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {book.availableOnline && book.onlineUrl && (
            <a
              href={book.onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Read Online
            </a>
          )}
          
          {!book.availableOnline && book.address && (
            <button
              onClick={() => {
                const encodedAddress = encodeURIComponent(book.address!);
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                window.open(mapUrl, '_blank');
              }}
              className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              View Location
            </button>
          )}
          
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            View Details & AI Summary
          </button>
          
        </div>
      </div>
      
      {/* Book Details Modal */}
      <BookDetailsModal
        book={book}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

