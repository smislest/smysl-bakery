
import { getCollectionFromDirectus } from './directus';
import { NewsItem, newsData } from '../lib/news';
import { typograph } from './typograph';
import { readJsonFallback, writeJsonFallback } from './supabaseFallback';
import { cache } from 'react';

const NEWS_FALLBACK_KEY = process.env.SUPABASE_NEWS_KEY || 'news.json';

type RawNews = Record<string, unknown>;

const isNewsWithSlug = (item: RawNews): item is RawNews & { slug: string } => {
  return typeof item.slug === 'string' && item.slug.trim().length > 0;
};

const normalizeNews = (items: RawNews[], source: 'directus' | 'supabase' | 'local'): NewsItem[] => {
  const filtered = (Array.isArray(items) ? items : []).filter(isNewsWithSlug);

  return filtered.map((item) => {
    const contentRaw = item.content ?? item.body ?? item.text ?? '';
    const rawContent = typeof contentRaw === 'string' ? contentRaw : String(contentRaw);
    const newsPhoto = typeof item.news_photo === 'object' && item.news_photo !== null
      ? (item.news_photo as NewsItem['news_photo'])
      : null;

    return {
      id: typeof item.id === 'string' ? item.id : '',
      slug: item.slug,
      date: typeof item.date === 'string' ? item.date : '',
      news_photo: newsPhoto,
      title: typograph(typeof item.title === 'string' ? item.title : ''),
      excerpt: typograph(
        typeof item.excerpt === 'string'
          ? item.excerpt
          : typeof item.description === 'string'
            ? item.description
            : ''
      ),
      // Не типографируем HTML WYSIWYG, чтобы не потерять теги; сохраняем как есть
      content: rawContent,
      rawContent,
      source,
    } satisfies NewsItem;
  });
};

async function readSupabaseNews(): Promise<NewsItem[] | null> {
  const cached = await readJsonFallback<NewsItem[]>(NEWS_FALLBACK_KEY);
  if (Array.isArray(cached) && cached.length > 0) {
    console.log(`📦 Using Supabase fallback for news (${cached.length} items)`);
    return normalizeNews(cached, 'supabase');
  }
  return null;
}

export const getNewsData = cache(async (): Promise<NewsItem[]> => {
  try {
    console.log('🔍 Fetching news from Directus...');
    const data = await getCollectionFromDirectus('news');
    console.log('📦 Directus response:', data ? `${data.length} items` : 'null');

    if (Array.isArray(data) && data.length > 0) {
      const normalized = normalizeNews(data, 'directus');
      console.log(`✅ Filtered ${normalized.length} news items with slugs`);

      if (normalized.length > 0) {
        console.log(`[Supabase] Attempting to save news...`);
        writeJsonFallback(NEWS_FALLBACK_KEY, normalized).catch((err) => {
          console.warn('⚠️ Failed to persist news fallback to Supabase:', err instanceof Error ? err.message : err);
        });
        return normalized;
      }
    }

    console.log('⚠️ No news data from Directus, trying Supabase fallback...');
    const supabaseFallback = await readSupabaseNews();
    if (supabaseFallback) return supabaseFallback;

    console.log('📦 Using local news fallback');
    return normalizeNews(newsData, 'local');
  } catch (error) {
    console.error('❌ Error in getNewsData:', error instanceof Error ? error.message : error);

    const supabaseFallback = await readSupabaseNews();
    if (supabaseFallback) return supabaseFallback;

    return normalizeNews(newsData, 'local');
  }
});
