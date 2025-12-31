import { newsData } from '../../lib/news';
import { DIRECTUS_URL, DIRECTUS_TOKEN } from '@/lib/directus';

export interface NewsItem {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	content: string;
	news_photo: {
		id: string;
		filename_disk: string;
	} | null;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {

	try {
		const url = `${DIRECTUS_URL}/items/news?fields=id,slug,title,excerpt,date,content,news_photo.id,news_photo.filename_disk,news_photo.width,news_photo.height&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;
		const headers: Record<string, string> = {};
		if (DIRECTUS_TOKEN) headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;

		const res = await fetch(url, { headers, cache: 'no-store' });
		if (!res.ok) {
			throw new Error(`Failed to fetch news ${slug}: ${res.status}`);
		}
		const json = await res.json();
		const item = json.data?.[0];
		return item ?? null;
	} catch (error) {
		// Fallback to static data if Directus is unavailable or env vars are missing
		const fallback = newsData.find((n) => n.slug === slug) || null;
		return fallback;
	}
}