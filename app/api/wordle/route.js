import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const url = `https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from NYT: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ solution: data.solution });

  } catch (error) {
    console.error('API Route /api/wordle Error:', error.message);
    
    return NextResponse.json(
      { error: 'Failed to fetch Wordle solution', details: error.message },
      { status: 500 }
    );
  }
}