import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export const revalidate = 3600; // ISR: кэшировать на 1 час

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const slug = params.slug;
		const url = `${DIRECTUS_URL}/items/news?fields=id,slug,title,excerpt,date,content,news_photo.id,news_photo.filename_disk,news_photo.width,news_photo.height&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;

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
			console.error(`Failed to fetch news by slug: ${res.status}`);
			return new Response(
				JSON.stringify({ data: null, error: 'News not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const json = await res.json();
		const newsItem = json.data?.[0];

		if (!newsItem) {
			return new Response(
				JSON.stringify({ data: null, error: 'News not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Добавляем URL для изображения
		const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.smislest.ru';
		if (newsItem.news_photo) {
			newsItem.news_photo.url = `${directusUrl}/assets/${newsItem.news_photo.id}`;
		}

		return new Response(JSON.stringify(newsItem), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in /api/news/[slug]:', error);
		return new Response(
			JSON.stringify({ data: null, error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
