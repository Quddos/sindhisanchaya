import { NextResponse } from 'next/server';
import { generateBookSummary } from '@/lib/gemini';

export async function GET() {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'GEMINI_API_KEY is not configured',
        status: 'missing_api_key'
      }, { status: 503 });
    }

    // Test AI summary generation
    const testSummary = await generateBookSummary(
      'Test Book Title',
      'Test Author',
      'Test details'
    );

    return NextResponse.json({ 
      success: true,
      summary: testSummary,
      message: 'AI is working correctly'
    });
  } catch (error) {
    console.error('AI test error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'ai_error'
    }, { status: 500 });
  }
}
