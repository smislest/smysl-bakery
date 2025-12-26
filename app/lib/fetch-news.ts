// app/lib/fetch-news.ts
import { cache } from 'react';
import directus from '@/app/lib/directus';
import { readItems } from '@directus/sdk';

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
    width?: number;
    height?: number;
  } | null;
}

export const fetchNewsBySlug = async (slug: string): Promise<NewsItem | null> => {
  const data = await directus.request<NewsItem[]>(
    readItems('news', {
      fields: [
        'id',
        'slug',
        'title',
        'excerpt',
        'date',
        'content',
        'news_photo.id',
        'news_photo.filename_disk',
        'news_photo.width',
        'news_photo.height',
      ],
      filter: { slug: { _eq: slug } },
      limit: 1,
    })
  );

  return data?.[0] || null;
};