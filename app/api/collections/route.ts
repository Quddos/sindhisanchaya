import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getMockCollections } from '@/lib/mock-data';

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({
      collections,
    });
  } catch (error) {
    console.error('Collections error:', error);
    
    // If database connection fails, return empty collections instead of error
    if (error.code === 'P1001' || error.message?.includes('Can\'t reach database server')) {
      return NextResponse.json({
        collections: []
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}
