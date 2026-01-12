import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET() {
	try {
		// Убираем wildcard, запрашиваем без явного указания полей
		const url = `${DIRECTUS_URL}/items/site_settings?limit=1`;
		
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
			console.error(`Failed to fetch site settings: ${res.status}`);
			return new Response(
				JSON.stringify({ data: null, error: 'Failed to fetch site settings' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		// site_settings возвращает объект напрямую, а не массив
		const settings = json.data;

		if (!settings || typeof settings !== 'object') {
			return new Response(
				JSON.stringify({ data: null, error: 'Site settings not found' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Добавляем URL для og_image
		if (settings.og_image) {
			const ogImageId = typeof settings.og_image === 'string' 
				? settings.og_image 
				: settings.og_image.id;
			settings.og_image_url = `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru'}/assets/${ogImageId}`;
		}

		return new Response(JSON.stringify(settings), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/site-settings:', error);
		return new Response(
			JSON.stringify({ data: null, error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
