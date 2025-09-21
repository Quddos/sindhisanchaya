'use client';

import { useState } from 'react';
import { Globe, BookOpen } from 'lucide-react';

interface MultiScriptTextProps {
  titleEnglish?: string;
  titleDevanagari?: string;
  titlePersoArabic?: string;
  authorEnglish?: string;
  authorDevanagari?: string;
  authorPersoArabic?: string;
  type: 'title' | 'author';
  className?: string;
}

export default function MultiScriptText({
  titleEnglish,
  titleDevanagari,
  titlePersoArabic,
  authorEnglish,
  authorDevanagari,
  authorPersoArabic,
  type,
  className = ''
}: MultiScriptTextProps) {
  const [activeScript, setActiveScript] = useState<'english' | 'devanagari' | 'perso-arabic'>('english');

  const getDisplayText = () => {
    if (type === 'title') {
      switch (activeScript) {
        case 'devanagari':
          return titleDevanagari || titleEnglish || 'No title available';
        case 'perso-arabic':
          return titlePersoArabic || titleEnglish || 'No title available';
        default:
          return titleEnglish || 'No title available';
      }
    } else {
      switch (activeScript) {
        case 'devanagari':
          return authorDevanagari || authorEnglish || 'Unknown author';
        case 'perso-arabic':
          return authorPersoArabic || authorEnglish || 'Unknown author';
        default:
          return authorEnglish || 'Unknown author';
      }
    }
  };

  const hasMultipleScripts = () => {
    if (type === 'title') {
      return !!(titleDevanagari || titlePersoArabic);
    } else {
      return !!(authorDevanagari || authorPersoArabic);
    }
  };

  const getScriptLabel = (script: string) => {
    switch (script) {
      case 'devanagari':
        return 'देवनागरी';
      case 'perso-arabic':
        return 'عربي';
      default:
        return 'English';
    }
  };

  if (!hasMultipleScripts()) {
    // If only English is available, just display it
    return (
      <span className={className}>
        {getDisplayText()}
      </span>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <div className="flex items-center gap-2">
        <span className="flex-1">
          {getDisplayText()}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Globe className="w-4 h-4 text-amber-600" />
        </div>
      </div>
      
      {/* Script selector dropdown */}
      <div className="absolute top-full left-0 mt-1 bg-white border border-amber-200 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity min-w-[120px]">
        <div className="p-2">
          <div className="text-xs text-amber-600 font-medium mb-2 px-2">
            {type === 'title' ? 'Title Script' : 'Author Script'}
          </div>
          <button
            onClick={() => setActiveScript('english')}
            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-amber-50 ${
              activeScript === 'english' ? 'bg-amber-100 text-amber-800' : 'text-gray-700'
            }`}
          >
            English
          </button>
          {titleDevanagari || authorDevanagari ? (
            <button
              onClick={() => setActiveScript('devanagari')}
              className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-amber-50 ${
                activeScript === 'devanagari' ? 'bg-amber-100 text-amber-800' : 'text-gray-700'
              }`}
            >
              देवनागरी
            </button>
          ) : null}
          {titlePersoArabic || authorPersoArabic ? (
            <button
              onClick={() => setActiveScript('perso-arabic')}
              className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-amber-50 ${
                activeScript === 'perso-arabic' ? 'bg-amber-100 text-amber-800' : 'text-gray-700'
              }`}
            >
              عربي
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
