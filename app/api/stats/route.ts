import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

