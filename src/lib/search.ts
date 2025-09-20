// Enhanced search functionality with fuzzy matching and global search

export interface SearchOptions {
  query: string;
  script?: 'english' | 'devanagari' | 'perso-arabic' | 'all';
  availableOnline?: boolean;
  collectionLocation?: string;
  author?: string;
  fuzzy?: boolean;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Levenshtein distance
  const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  
  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  const distance = matrix[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (distance / maxLength);
}

export function fuzzySearch(query: string, text: string, threshold: number = 0.6): boolean {
  if (!query || !text) return false;
  
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  
  // Exact match
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Word-by-word fuzzy matching
  const queryWords = normalizedQuery.split(' ');
  const textWords = normalizedText.split(' ');
  
  for (const queryWord of queryWords) {
    let found = false;
    for (const textWord of textWords) {
      if (calculateSimilarity(queryWord, textWord) >= threshold) {
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  
  return true;
}

export function generateSearchTerms(query: string): string[] {
  const terms = [query];
  
  // Add variations
  const words = query.split(' ');
  
  // Add partial words (for autocomplete-like behavior)
  words.forEach(word => {
    if (word.length > 2) {
      for (let i = 3; i <= word.length; i++) {
        terms.push(word.substring(0, i));
      }
    }
  });
  
  // Add common variations
  const variations = [
    query.replace(/s$/, ''), // Remove plural
    query + 's', // Add plural
    query.replace(/ing$/, ''), // Remove -ing
    query + 'ing', // Add -ing
  ];
  
  terms.push(...variations);
  
  return [...new Set(terms)]; // Remove duplicates
}

export function buildSearchQuery(options: SearchOptions): Record<string, unknown> {
  const { query, availableOnline, collectionLocation, author, fuzzy } = options;
  
  if (!query) {
    return {};
  }
  
  const searchTerms = fuzzy ? generateSearchTerms(query) : [query];
  
  const where: Record<string, unknown> = {
    OR: []
  };
  
  // Add search conditions for each term
  searchTerms.forEach(term => {
    const termConditions = [
      { titleEnglish: { contains: term, mode: 'insensitive' } },
      { titleDevanagari: { contains: term, mode: 'insensitive' } },
      { titlePersoArabic: { contains: term, mode: 'insensitive' } },
      { authorEnglish: { contains: term, mode: 'insensitive' } },
      { authorDevanagari: { contains: term, mode: 'insensitive' } },
      { authorPersoArabic: { contains: term, mode: 'insensitive' } },
      { collectionLocation: { contains: term, mode: 'insensitive' } },
      { otherDetails: { contains: term, mode: 'insensitive' } },
      { searchVector: { contains: term, mode: 'insensitive' } },
    ];
    
    where.OR.push(...termConditions);
  });
  
  // Add filters
  if (availableOnline !== undefined) {
    where.availableOnline = availableOnline;
  }
  
  if (collectionLocation) {
    where.collectionLocation = { contains: collectionLocation, mode: 'insensitive' };
  }
  
  if (author) {
    where.OR = [
      { authorEnglish: { contains: author, mode: 'insensitive' } },
      { authorDevanagari: { contains: author, mode: 'insensitive' } },
      { authorPersoArabic: { contains: author, mode: 'insensitive' } },
    ];
  }
  
  return where;
}
