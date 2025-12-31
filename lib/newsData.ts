
import { getCollectionFromDirectus } from './directus';
import { NewsItem, newsData } from '../lib/news';
import { typograph } from './typograph';

export async function getNewsData(): Promise<NewsItem[]> {
  try {
    console.log('🔍 Fetching news from Directus...');
    const data = await getCollectionFromDirectus('news');
    console.log('📦 Directus response:', data ? `${data.length} items` : 'null');
    
    if (!Array.isArray(data) || data.length === 0) {
      console.log('⚠️ No news data from Directus, returning empty array');
      return [];
    }

    const filtered = data.filter((item) => item.slug);
    console.log(`✅ Filtered ${filtered.length} news items with slugs`);

    return filtered.map((item) => ({
        ...item,
        title: typograph(item.title),
        description: typograph(item.description || item.excerpt || ''),
        excerpt: typograph(item.excerpt || ''),
        content: typograph(item.content),
      }));
  } catch (error) {
    console.error('❌ Error in getNewsData:', error instanceof Error ? error.message : error);
    return [];
  }
}
