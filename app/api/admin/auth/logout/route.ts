import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    {
      headers: {
        'Set-Cookie': 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      },
    }
  );
}
