import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET() {
	try {
		const url = `${DIRECTUS_URL}/items/menu?fields=id,label,href,order&limit=-1&sort=order`;
		
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		
		if (DIRECTUS_TOKEN) {
			headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
		}

		const res = await fetch(url, {
			headers,
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error(`Failed to fetch menu: ${res.status}`);
			return new Response(
				JSON.stringify({ data: [], error: 'Failed to fetch menu' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		const menu = json.data || [];

		return new Response(JSON.stringify(menu), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/menu:', error);
		return new Response(
			JSON.stringify({ data: [], error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
