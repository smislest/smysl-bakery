
import { getCollectionFromDirectus } from './directus';
import { NewsItem, newsData } from '../lib/news';
import { cache } from 'react';
import { getBaseUrl } from './baseUrl';

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
      title: typeof item.title === 'string' ? item.title : '',
      excerpt: typeof item.excerpt === 'string'
        ? item.excerpt
        : typeof item.description === 'string'
          ? item.description
          : '',
      // Не типографируем HTML WYSIWYG, чтобы не потерять теги; сохраняем как есть
      content: rawContent,
      rawContent,
      source,
    } satisfies NewsItem;
  });
};

export const getNewsData = cache(async (): Promise<NewsItem[]> => {
  try {
    // Получаем данные через безопасный API route вместо прямого подключения к Directus
    // На локалке: localhost:3000/api/news
    // На production: http://localhost:3000/api/news (внутри Docker контейнера)
    const apiUrl = `${getBaseUrl()}/api/news`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // ISR: кэшировать на 1 минуту
    });

    if (!response.ok) {
      console.log('⚠️ getNewsData: API вернул', response.status);
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const normalized = normalizeNews(data, 'directus');
      console.log('✅ getNewsData: загружено', normalized.length, 'новостей из API');
      console.log('📋 Slugs:', normalized.map(n => n.slug).join(', '));
      return normalized;
    }

    console.log('⚠️ getNewsData: API вернул пустой массив');
    return [];
  } catch (error) {
    console.error('❌ Error in getNewsData:', error instanceof Error ? error.message : error);
    return [];
  }
});
