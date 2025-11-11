import { NextResponse } from 'next/server';

const API_URL = 'https://wttr.in/Moon?format=%m';

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'User-Agent': 'curl/7.64.1'
      }
    });

    if (!response.ok) {
      throw new Error();
    }

    const moonEmoji = await response.text();

    return NextResponse.json({ moonEmoji: moonEmoji.trim() });

  } catch (error) {
    console.error('API Route /api/moon Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch moon phase' },
      { status: 500 }
    );
  }
}