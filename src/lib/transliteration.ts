// Basic transliteration mappings for Sindhi scripts
// This is a simplified version - in production, you'd want more comprehensive mappings

export const transliterationMaps = {
  // English to Devanagari (basic mapping)
  englishToDevanagari: {
    'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
    'e': 'ए', 'o': 'ओ', 'ai': 'ऐ', 'au': 'औ',
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
    'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'sh': 'श',
    's': 'स', 'h': 'ह', 'ksh': 'क्ष', 'tr': 'त्र', 'jny': 'ज्ञ'
  },

  // English to Perso-Arabic (basic mapping)
  englishToPersoArabic: {
    'a': 'ا', 'aa': 'آ', 'i': 'اِ', 'ii': 'اِی', 'u': 'اُ', 'uu': 'اُو',
    'e': 'اے', 'o': 'او', 'ai': 'اَے', 'au': 'اَو',
    'k': 'ک', 'kh': 'کھ', 'g': 'گ', 'gh': 'گھ', 'ng': 'نگ',
    'ch': 'چ', 'chh': 'چھ', 'j': 'ج', 'jh': 'جھ', 'ny': 'نی',
    't': 'ت', 'th': 'تھ', 'd': 'د', 'dh': 'دھ', 'n': 'ن',
    'p': 'پ', 'ph': 'پھ', 'b': 'ب', 'bh': 'بھ', 'm': 'م',
    'y': 'ی', 'r': 'ر', 'l': 'ل', 'v': 'و', 'sh': 'ش',
    's': 'س', 'h': 'ہ', 'ksh': 'کش', 'tr': 'تر', 'jny': 'جنی'
  }
};

export function transliterateToDevanagari(text: string): string {
  if (!text) return '';
  
  const result = text.toLowerCase();
  
  // Simple word-by-word transliteration
  const words = result.split(' ');
  const transliteratedWords = words.map(word => {
    let transliterated = word;
    
    // Apply basic mappings
    Object.entries(transliterationMaps.englishToDevanagari).forEach(([eng, dev]) => {
      transliterated = transliterated.replace(new RegExp(eng, 'g'), dev);
    });
    
    return transliterated;
  });
  
  return transliteratedWords.join(' ');
}

export function transliterateToPersoArabic(text: string): string {
  if (!text) return '';
  
  const result = text.toLowerCase();
  
  // Simple word-by-word transliteration
  const words = result.split(' ');
  const transliteratedWords = words.map(word => {
    let transliterated = word;
    
    // Apply basic mappings
    Object.entries(transliterationMaps.englishToPersoArabic).forEach(([eng, perso]) => {
      transliterated = transliterated.replace(new RegExp(eng, 'g'), perso);
    });
    
    return transliterated;
  });
  
  return transliteratedWords.join(' ');
}

export function createSearchVector(book: {
  titleEnglish?: string;
  titleDevanagari?: string;
  titlePersoArabic?: string;
  authorEnglish?: string;
  authorDevanagari?: string;
  authorPersoArabic?: string;
  collectionLocation?: string;
  otherDetails?: string;
}): string {
  const searchTerms = [
    book.titleEnglish,
    book.titleDevanagari,
    book.titlePersoArabic,
    book.authorEnglish,
    book.authorDevanagari,
    book.authorPersoArabic,
    book.collectionLocation,
    book.otherDetails,
  ].filter(Boolean).join(' ');

  return searchTerms.toLowerCase();
}

