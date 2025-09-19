import { Book, SearchResult } from '@/types';

export const mockBooks: Book[] = [
  {
    id: 1,
    originalId: 64043,
    titleEnglish: "Yoga Darpan",
    titleDevanagari: "योग दर्पण",
    titlePersoArabic: "يوگ درپڻ",
    authorEnglish: "Unknown Author",
    authorDevanagari: "",
    authorPersoArabic: "",
    collectionLocation: "Swami Teooram Sindhi High School, Rajkot",
    address: "8Q8W+2J8, Shastri Nagar, Rajkot, Gujarat 360397",
    otherDetails: "",
    imageUrl: null,
    availableOnline: false,
    onlineUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    originalId: 62490,
    titleEnglish: "Zubdah al Manasik Maa Umdah al Manasik",
    titleDevanagari: "ज़ुब्दह् अल् मनसिक् मअ उम्दह् अल् मनसिक्",
    titlePersoArabic: "زُبْدَہْ اَلْ مَنَسِکْ مَءاَ اُمْدَہْ اَلْ مَنَسِکْ",
    authorEnglish: "Unknown Author",
    authorDevanagari: "उन्क्नोwन् औथोर्",
    authorPersoArabic: "اُنْکْنوwنْ اَوتھورْ",
    collectionLocation: "https://archive.org/details/Zubdah-al-Manasik-Maa-Umdah-al-Manasik",
    address: "",
    otherDetails: "",
    imageUrl: null,
    availableOnline: true,
    onlineUrl: "https://archive.org/details/Zubdah-al-Manasik-Maa-Umdah-al-Manasik",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    originalId: 62489,
    titleEnglish: "Zikar Eid Milad Un Nabi (Salallhu alaihi wasalam) Sindhi",
    titleDevanagari: "ज़िकर् एइद् मिलद् उन् नबि (सलल्ल्हु अलैहि wअसलम्)सिन्धि",
    titlePersoArabic: "زِکَرْ اےئِدْ مِلَدْ اُنْ نَبِ (سَلَلّْہُ اَلَیہِ wاَسَلَمْ)سِنْدھِ",
    authorEnglish: "Mufit abdul raheem sikandari r.a.",
    authorDevanagari: "मुफ़ित् अब्दुल् रहेएम् सिकन्दरि र्।अ।",
    authorPersoArabic: "مُفِتْ اَبْدُلْ رَہےئیمْ سِکَنْدَرِ رْ۔اَ۔",
    collectionLocation: "https://archive.org/details/zikareidmiladunnabisindhibyhazratallamamufitabdulraheemsikandarir.a.",
    address: "",
    otherDetails: "",
    imageUrl: null,
    availableOnline: true,
    onlineUrl: "https://archive.org/details/zikareidmiladunnabisindhibyhazratallamamufitabdulraheemsikandarir.a.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    originalId: 62488,
    titleEnglish: "Zhartha",
    titleDevanagari: "ज़्हर्थ",
    titlePersoArabic: "زْہَرْتھَ",
    authorEnglish: "Premanad",
    authorDevanagari: "प्रेमनद्",
    authorPersoArabic: "پْریمَنَدْ",
    collectionLocation: "https://archive.org/details/in.ernet.dli.2015.359818",
    address: "",
    otherDetails: "",
    imageUrl: null,
    availableOnline: true,
    onlineUrl: "https://archive.org/details/in.ernet.dli.2015.359818",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    originalId: 62487,
    titleEnglish: "Zenana : everyday peace in a Karachi apartment building",
    titleDevanagari: "ज़ेनन : एवेर्य्दय् पेअचे इन् अ करछि अपर्त्मेन्त् बुइल्दिन्ग्",
    titlePersoArabic: "زینَنَ : ایویرْیْدَیْ پےءاَچے اِنْ اَ کَرَچھِ اَپَرْتْمینْتْ بُئِلْدِنْگْ",
    authorEnglish: "Ring, Laura A., 1968-",
    authorDevanagari: "रिन्ग्, लौर अ।, १९६८-",
    authorPersoArabic: "رِنْگْ، لَورَ اَ۔، ۱۹۶۸-",
    collectionLocation: "https://archive.org/details/zenanaeverydaype0000ring",
    address: "",
    otherDetails: "",
    imageUrl: null,
    availableOnline: true,
    onlineUrl: "https://archive.org/details/zenanaeverydaype0000ring",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function searchBooks(query: string, filters: Record<string, unknown> = {}): SearchResult {
  let filteredBooks = [...mockBooks];

  // Apply search query
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredBooks = filteredBooks.filter(book => 
      book.titleEnglish?.toLowerCase().includes(searchTerm) ||
      book.titleDevanagari?.toLowerCase().includes(searchTerm) ||
      book.titlePersoArabic?.toLowerCase().includes(searchTerm) ||
      book.authorEnglish?.toLowerCase().includes(searchTerm) ||
      book.authorDevanagari?.toLowerCase().includes(searchTerm) ||
      book.authorPersoArabic?.toLowerCase().includes(searchTerm) ||
      book.collectionLocation?.toLowerCase().includes(searchTerm)
    );
  }

  // Apply filters
  if (filters.availableOnline !== undefined) {
    filteredBooks = filteredBooks.filter(book => book.availableOnline === filters.availableOnline);
  }

  if (filters.collectionLocation) {
    filteredBooks = filteredBooks.filter(book => 
      book.collectionLocation?.toLowerCase().includes(filters.collectionLocation.toLowerCase())
    );
  }

  if (filters.author) {
    filteredBooks = filteredBooks.filter(book => 
      book.authorEnglish?.toLowerCase().includes(filters.author.toLowerCase()) ||
      book.authorDevanagari?.toLowerCase().includes(filters.author.toLowerCase()) ||
      book.authorPersoArabic?.toLowerCase().includes(filters.author.toLowerCase())
    );
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;
  
  const paginatedBooks = filteredBooks.slice(offset, offset + limit);

  return {
    books: paginatedBooks,
    total: filteredBooks.length,
    page,
    limit,
    hasMore: offset + paginatedBooks.length < filteredBooks.length,
  };
}

export function getStats() {
  return {
    totalBooks: mockBooks.length,
    onlineBooks: mockBooks.filter(book => book.availableOnline).length,
    collections: new Set(mockBooks.map(book => book.collectionLocation)).size,
  };
}
