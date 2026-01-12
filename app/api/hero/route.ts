import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET() {
	try {
		// Запрашиваем доступные поля: title, subtitle, button_text, button_link, hero_photo
		const url = `${DIRECTUS_URL}/items/hero?fields=id,title,subtitle,button_text,button_link,hero_photo.id,hero_photo.filename_disk&limit=1`;
		
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
			console.error(`Failed to fetch hero: ${res.status}`);
			return new Response(
				JSON.stringify({ data: null, error: 'Failed to fetch hero data' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		// hero коллекция возвращает объект напрямую, а не массив
		const heroItem = json.data;

		if (!heroItem || typeof heroItem !== 'object') {
			return new Response(
				JSON.stringify({ data: null, error: 'Hero data not found' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Добавляем URL для изображения
		const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';
		if (heroItem.hero_photo) {
			heroItem.hero_photo.url = `${directusUrl}/assets/${heroItem.hero_photo.id}`;
		}

		return new Response(JSON.stringify(heroItem), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/hero:', error);
		return new Response(
			JSON.stringify({ data: null, error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
