'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Buffer } from 'buffer';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackTitle?: string;
  fallbackAuthor?: string;
  isOnline?: boolean;
}

export default function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "object-cover",
  fallbackTitle = "Untitled",
  fallbackAuthor = "Unknown Author",
  isOnline = false,
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

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

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(generateSVGCover(fallbackTitle, fallbackAuthor, isOnline));
    }
  };

  const imageProps = fill 
    ? { fill: true }
    : { width: width || 200, height: height || 300 };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      {...imageProps}
      className={className}
      onError={handleError}
      unoptimized={imageSrc.startsWith('data:')}
    />
  );
}
