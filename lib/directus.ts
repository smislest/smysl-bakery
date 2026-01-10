/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import { cache } from 'react';

// Переменные окружения для Directus
export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  'https://admin.smislest.ru';

export const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN || '';

// Счетчик вызовов для отладки
const callCounts: Record<string, number> = {};

// Создаём Directus клиент с REST (если есть токен, используем его)
const directusClient = (() => {
  let client = createDirectus(DIRECTUS_URL);
  if (DIRECTUS_TOKEN) {
    client = client.with(staticToken(DIRECTUS_TOKEN));
  }
  // Добавляем REST с явной кодировкой
  return client.with(rest({
    onRequest: (options) => {
      options.headers = {
        ...options.headers,
        'Accept-Charset': 'utf-8',
      };
      return options;
    }
  }));
})();

// Универсальная функция для получения коллекции из Directus с кэшированием
export const getCollectionFromDirectus = cache(async (collection: string) => {
  try {
    callCounts[collection] = (callCounts[collection] || 0) + 1;
    
    // Для новостей фильтруем: только опубликованные + есть slug
    const filter = collection === 'news' 
      ? { 
          _and: [
            { status: { _eq: 'published' } },
            { slug: { _nnull: true } }
          ]
        }
      : undefined;
    
    const response = await directusClient.request(
      readItems(collection as any, {
        fields: ['*.*'] as any,
        ...(filter ? { filter } : {})
      })
    );
    
    console.log(`✅ [Call #${callCounts[collection]}] Got ${Array.isArray(response) ? response.length : 1} items from ${collection}`);
    return response;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${collection} error:`, errorMsg);
    return null;
  }
});

// ...existing code...

// Получить hero (первый элемент коллекции hero)
export async function getHeroFromDirectus() {
  const response = await fetch(
    `${DIRECTUS_URL}/items/hero`,
    {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  // Если коллекция hero содержит только один объект, возвращаем его
  if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  // Если data.data — объект
  if (data && data.data && typeof data.data === 'object') {
    return data.data;
  }
  return null;
}
