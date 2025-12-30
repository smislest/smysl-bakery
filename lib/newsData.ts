
import { getCollectionFromDirectus } from './directus';
import { NewsItem } from '../lib/news';
import { typograph } from './typograph';

export async function getNewsData(): Promise<NewsItem[]> {
  const data = await getCollectionFromDirectus('news');
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    ...item,
    title: typograph(item.title),
    description: typograph(item.description),
    content: typograph(item.content),
  }));
}
