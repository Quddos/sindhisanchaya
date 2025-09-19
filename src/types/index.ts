export interface Book {
  id: number;
  originalId: number;
  titleEnglish?: string;
  titleDevanagari?: string;
  titlePersoArabic?: string;
  authorEnglish?: string;
  authorDevanagari?: string;
  authorPersoArabic?: string;
  collectionLocation?: string;
  address?: string;
  otherDetails?: string;
  imageUrl?: string;
  availableOnline: boolean;
  onlineUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
}

export interface Author {
  id: number;
  nameEnglish?: string;
  nameDevanagari?: string;
  namePersoArabic?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: number;
  name: string;
  location?: string;
  address?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  query?: string;
  availableOnline?: boolean;
  collectionLocation?: string;
  author?: string;
  script?: 'english' | 'devanagari' | 'perso-arabic' | 'all';
  fuzzy?: boolean;
}

export interface SearchResult {
  books: Book[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface TransliterationData {
  english: string;
  devanagari: string;
  persoArabic: string;
}

export interface BookCover {
  type: 'svg' | 'image';
  url: string;
  title: string;
  author?: string;
}

export interface ImportStatus {
  id: number;
  fileName: string;
  recordCount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors?: Array<{ error: string; record?: string }>;
  startedAt: Date;
  completedAt?: Date;
}

