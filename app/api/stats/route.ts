import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getMockStats } from '@/lib/mock-data';

export async function GET() {
  try {
    const [totalBooks, onlineBooks, collections, totalUsers] = await Promise.all([
      prisma.book.count(),
      prisma.book.count({ where: { availableOnline: true } }),
      prisma.collection.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      totalBooks,
      onlineBooks,
      collections,
      totalUsers,
    });
  } catch (error) {
    console.error('Stats error:', error);
    console.log('Falling back to mock data due to database connection issue');
    
    // Return mock data when database is unavailable
    const mockStats = getMockStats();
    return NextResponse.json(mockStats);
  }
}

