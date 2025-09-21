import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getMockStats } from '@/lib/mock-data';

export async function GET() {
  try {
    // Try to get stats from database with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    );
    
    const statsPromise = Promise.all([
      prisma.book.count(),
      prisma.book.count({ where: { availableOnline: true } }),
      prisma.collection.count(),
      prisma.user.count(),
    ]);
    
    const [totalBooks, onlineBooks, collections, totalUsers] = await Promise.race([
      statsPromise,
      timeoutPromise
    ]) as [number, number, number, number];

    return NextResponse.json({
      totalBooks,
      onlineBooks,
      collections,
      totalUsers,
      fallback: false,
    });
  } catch (error) {
    console.error('Stats error:', error);
    
    // Return mock stats if database is unavailable
    const mockStats = getMockStats();
    return NextResponse.json({
      ...mockStats,
      fallback: true, // Indicate this is fallback data
    });
  }
}

