import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateBookSummary } from '@/lib/gemini';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    // Get the book
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Check if AI is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'AI features are not available. Please contact the administrator.' 
      }, { status: 503 });
    }

    // Generate summary
    const title = book.titleEnglish || book.titleDevanagari || book.titlePersoArabic || 'Untitled';
    const author = book.authorEnglish || book.authorDevanagari || book.authorPersoArabic || 'Unknown Author';
    
    console.log('Generating AI summary for book:', { id: bookId, title, author });
    
    const summary = await generateBookSummary(title, author, book.otherDetails || undefined);

    // Update the book with the summary (optional - you can remove this if you don't want to store summaries)
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { summary },
    });

    return NextResponse.json({ 
      success: true, 
      summary: updatedBook.summary,
      message: 'Summary generated successfully' 
    });
  } catch (error) {
    console.error('Summary generation error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error. Please try again later.' },
          { status: 503 }
        );
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { error: 'AI service is temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again.' },
      { status: 500 }
    );
  }
}
