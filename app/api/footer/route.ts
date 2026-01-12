import { NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

export async function GET() {
  if (!DIRECTUS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing DIRECTUS_TOKEN' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${DIRECTUS_URL}/items/footer?limit=1`, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // ISR: 1 hour
    });

    if (!response.ok) {
      console.error('Directus API error:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Failed to fetch footer data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return the first footer item
    const footerData = Array.isArray(data.data) && data.data.length > 0 
      ? data.data[0] 
      : data.data;

    return NextResponse.json(footerData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
