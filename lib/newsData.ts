
import { getCollectionFromDirectus } from './directus';
import { NewsItem, newsData } from '../lib/news';
import { typograph, typographHtml } from './typograph';
import { readJsonFallback, writeJsonFallback } from './supabaseFallback';

const NEWS_FALLBACK_KEY = process.env.SUPABASE_NEWS_KEY || 'news.json';

const normalizeNews = (items: any[], source: 'directus' | 'supabase' | 'local'): NewsItem[] => {
  const filtered = (Array.isArray(items) ? items : []).filter((item) => item.slug);

  return filtered.map((item) => ({
    ...item,
    id: item.id || '',
    slug: item.slug,
    date: item.date || '',
    news_photo: item.news_photo || null,
    title: typograph(item.title),
    description: typograph(item.description || item.excerpt || ''),
    excerpt: typograph(item.excerpt || ''),
    // Не типографируем HTML WYSIWYG, чтобы не потерять теги; сохраняем как есть
    content: typeof (item.content ?? item.body ?? item.text) === 'string'
      ? (item.content ?? item.body ?? item.text)
      : String(item.content ?? item.body ?? item.text ?? ''),
    rawContent: item.content ?? item.body ?? item.text ?? '',
    source,
  })) as NewsItem[];
};

async function readSupabaseNews(): Promise<NewsItem[] | null> {
  const cached = await readJsonFallback<NewsItem[]>(NEWS_FALLBACK_KEY);
  if (Array.isArray(cached) && cached.length > 0) {
    console.log(`📦 Using Supabase fallback for news (${cached.length} items)`);
    return normalizeNews(cached, 'supabase');
  }
  return null;
}

export async function getNewsData(): Promise<NewsItem[]> {
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
}
