import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { scrapeBookCover, validateImageUrl } from '@/lib/bookCoverScraper';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    let book;
    try {
      book = await prisma.book.findUnique({
        where: { id: bookId },
      });
    } catch (dbError) {
      console.error('Database error, using fallback:', dbError);
      // If database is unavailable, try to get book from mock data
      const { mockBooks } = await import('@/lib/mock-data');
      book = mockBooks.find(b => b.id === bookId);
      
      if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
    }

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const title = book.titleEnglish || book.titleDevanagari || book.titlePersoArabic || 'Untitled';
    const author = book.authorEnglish || book.authorDevanagari || book.authorPersoArabic || 'Unknown Author';

    console.log('Scraping cover for book:', { id: bookId, title, author, onlineUrl: book.onlineUrl });

    // Try to scrape cover
    const scrapeResult = await scrapeBookCover(title, author, book.onlineUrl || undefined);
    
    if (!scrapeResult.success || !scrapeResult.imageUrl) {
      return NextResponse.json({
        success: false,
        error: scrapeResult.error || 'Failed to scrape cover'
      }, { status: 404 });
    }

    // Validate the scraped image URL
    const isValid = await validateImageUrl(scrapeResult.imageUrl);
    if (!isValid) {
      return NextResponse.json({
        success: false,
        error: 'Scraped image URL is not accessible'
      }, { status: 404 });
    }

    // Try to update the book with the scraped cover
    try {
      const updatedBook = await prisma.book.update({
        where: { id: bookId },
        data: { imageUrl: scrapeResult.imageUrl },
      });

      return NextResponse.json({
        success: true,
        imageUrl: updatedBook.imageUrl,
        message: 'Cover scraped and updated successfully'
      });
    } catch (updateError) {
      console.error('Database update error, returning scraped image:', updateError);
      // If we can't update the database, just return the scraped image
      return NextResponse.json({
        success: true,
        imageUrl: scrapeResult.imageUrl,
        message: 'Cover scraped successfully (database update failed)'
      });
    }
  } catch (error) {
    console.error('Cover scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape cover. Please try again.' },
      { status: 500 }
    );
  }
}
