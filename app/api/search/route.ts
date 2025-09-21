import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SearchFilters } from '@/types';
import { enhanceSearchQuery } from '@/lib/gemini';
import { buildSearchQuery } from '@/lib/search';
import { searchMockBooks } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: SearchFilters = {
      query: searchParams.get('q') || undefined,
      script: (searchParams.get('script') as 'english' | 'devanagari' | 'perso-arabic' | 'all') || 'all',
      availableOnline: searchParams.get('online') ? searchParams.get('online') === 'true' : undefined,
      collectionLocation: searchParams.get('location') || undefined,
      author: searchParams.get('author') || undefined,
    };

    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Cap at 100 to prevent memory issues
    const offset = (page - 1) * limit;
    const fuzzy = searchParams.get('fuzzy') === 'true';

    // Enhance search query with AI only for longer, more complex queries
    let enhancedQuery = filters.query;
    if (filters.query && filters.query.length > 5 && process.env.GEMINI_API_KEY) {
      try {
        enhancedQuery = await enhanceSearchQuery(filters.query, filters.script);
      } catch (error) {
        console.error('Query enhancement failed:', error);
        // Continue with original query
      }
    }

    // Build the where clause using enhanced search
    const where = buildSearchQuery({
      query: enhancedQuery || filters.query,
      script: filters.script,
      availableOnline: filters.availableOnline,
      collectionLocation: filters.collectionLocation,
      author: filters.author,
      fuzzy,
    });

    // If no query is provided, show all books (for browsing)
    const finalWhere = Object.keys(where).length === 0 ? {} : where;

    // Execute the search with optimized query and timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Search timeout')), 15000)
    );

    const searchPromise = Promise.all([
      prisma.book.findMany({
        where: finalWhere,
        orderBy: [
          { availableOnline: 'desc' }, // Online books first
          { createdAt: 'desc' },
        ],
        skip: offset,
        take: limit,
        select: {
          id: true,
          titleEnglish: true,
          titleDevanagari: true,
          titlePersoArabic: true,
          authorEnglish: true,
          authorDevanagari: true,
          authorPersoArabic: true,
          collectionLocation: true,
          imageUrl: true,
          availableOnline: true,
          onlineUrl: true,
          createdAt: true,
        },
      }),
      prisma.book.count({ where: finalWhere }),
    ]);

    const [books, total] = await Promise.race([
      searchPromise,
      timeoutPromise
    ]) as [any[], number];

    return NextResponse.json({
      books,
      total,
      page,
      limit,
      hasMore: offset + books.length < total,
      fuzzy,
    });
  } catch (error) {
    console.error('Search error:', error);
    
    // Return mock results if database is unavailable
    const { searchParams } = new URL(request.url);
    const filters: SearchFilters = {
      query: searchParams.get('q') || undefined,
      script: (searchParams.get('script') as 'english' | 'devanagari' | 'perso-arabic' | 'all') || 'all',
      availableOnline: searchParams.get('online') ? searchParams.get('online') === 'true' : undefined,
      collectionLocation: searchParams.get('location') || undefined,
      author: searchParams.get('author') || undefined,
    };
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const mockResult = searchMockBooks(filters.query || '', filters, page, limit);
    
    return NextResponse.json({
      books: mockResult.books,
      total: mockResult.total,
      page: mockResult.page,
      limit: mockResult.limit,
      hasMore: mockResult.page < mockResult.totalPages,
      fuzzy: false,
      error: 'Database temporarily unavailable - showing sample data',
      fallback: true,
    });
  }
}

