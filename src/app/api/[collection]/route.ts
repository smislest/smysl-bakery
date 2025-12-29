


export const runtime = 'nodejs'; // важно!
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { collection } = params;

  const url = `${process.env.DIRECTUS_URL}/items/${collection}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Directus error: ${res.status}`);
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      return NextResponse.json([
        {
          title: 'Заглушка',
          image: '/img/placeholder.jpg',
          description: 'Нет данных',
        },
      ]);
    }

    return NextResponse.json(json.data);
  } catch (e) {
    console.error(`Directus fetch failed for ${collection}`, e);

    // fallback
    try {
      const base = path.join(process.cwd(), 'content');

      let filePath = path.join(base, `${collection}.json`);

      let file;

      try {
        file = await fs.readFile(filePath, 'utf-8');
      } catch {
        filePath = path.join(base, `${collection}-fallback.json`);
        file = await fs.readFile(filePath, 'utf-8');
      }

      return NextResponse.json(JSON.parse(file));
    } catch (fallbackError) {
      console.error(`Fallback failed for ${collection}`, fallbackError);
      return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
    }
  }
}
}
