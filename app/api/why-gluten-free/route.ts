import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600;

export async function GET() {
  try {
    const url = `${DIRECTUS_URL}/items/why_gluten_free?sort=id`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (DIRECTUS_TOKEN) {
      headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
    }

    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch why_gluten_free: ${res.status}`);
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in /api/why-gluten-free:', err);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
