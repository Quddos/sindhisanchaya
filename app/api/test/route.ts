import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const bookCount = await prisma.book.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      bookCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
