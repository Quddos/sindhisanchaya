'use client';

import { Book } from '@/types';
import { ExternalLink, MapPin, User, Calendar } from 'lucide-react';
import Image from 'next/image';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
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
    if (book.availableOnline && !book.imageUrl) {
      // Generate SVG cover for online books without images
      return generateSVGCover(getDisplayTitle(), getDisplayAuthor());
    }
    return book.imageUrl || '/placeholder-book.svg';
  };

  const generateSVGCover = (title: string, author: string) => {
    const svg = `
      <svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="300" fill="url(#grad)" rx="8"/>
        <rect x="10" y="10" width="180" height="280" fill="none" stroke="white" stroke-width="2" rx="4"/>
        <text x="100" y="80" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${title.length > 20 ? title.substring(0, 20) + '...' : title}
        </text>
        <text x="100" y="120" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${author.length > 25 ? author.substring(0, 25) + '...' : author}
        </text>
        <text x="100" y="200" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">
          Available Online
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Book Cover */}
      <div className="aspect-[2/3] bg-gray-100 relative">
        <Image
          src={getCoverImage()}
          alt={getDisplayTitle()}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-book.svg';
          }}
        />
        {book.availableOnline && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Online
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {getDisplayTitle()}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <User className="w-4 h-4" />
          <span className="line-clamp-1">{getDisplayAuthor()}</span>
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
        <div className="flex gap-2">
          {book.availableOnline && book.onlineUrl && (
            <a
              href={book.onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Read Online
            </a>
          )}
          <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

