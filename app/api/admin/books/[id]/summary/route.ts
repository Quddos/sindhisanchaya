import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { generateBookSummary } from '@/lib/gemini';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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

    // Generate summary
    const title = book.titleEnglish || book.titleDevanagari || book.titlePersoArabic || 'Untitled';
    const author = book.authorEnglish || book.authorDevanagari || book.authorPersoArabic || 'Unknown Author';
    
    const summary = await generateBookSummary(title, author, book.otherDetails || undefined);

    // Update the book with the summary
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
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
