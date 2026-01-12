import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 60; // ISR: кэшировать на 1 минуту

export async function GET() {
	try {
		const url = `${DIRECTUS_URL}/items/news?fields=id,slug,title,excerpt,date,content,news_photo.id,news_photo.filename_disk&limit=-1&sort=-date`;
		
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
			console.error(`Failed to fetch news: ${res.status}`);
			return new Response(
				JSON.stringify({ data: [], error: 'Failed to fetch news' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		const newsItems = json.data || [];

		// Добавляем URL для изображений
		const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const processedNews = newsItems.map((item: Record<string, any>) => ({
			...item,
			news_photo: item.news_photo
				? {
						...item.news_photo,
						url: `${directusUrl}/assets/${item.news_photo.id}`,
					}
				: null,
		}));

		return new Response(JSON.stringify(processedNews), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/news:', error);
		return new Response(
			JSON.stringify({ data: [], error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
