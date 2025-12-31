/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Agent, setGlobalDispatcher } from 'undici';

// Переменные окружения для Directus (с безопасным запасным URL)
export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  'https://smysl-bakery-directus.onrender.com';

export const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN || '';

// На сервере отключаем кэш TLS сессий (ошибка ERR_SSL_INVALID_SESSION_ID на некоторых хостингах)
if (typeof window === 'undefined') {
  try {
    setGlobalDispatcher(new Agent({ connect: { maxCachedSessions: 0 } }));
  } catch (err) {
    console.error('Failed to set undici agent for Directus:', err);
  }
}

// Создаём Directus клиент с REST
const directusClient = createDirectus(DIRECTUS_URL).with(rest());

// Универсальная функция для получения коллекции из Directus
export async function getCollectionFromDirectus(collection: string) {
  try {
    console.log(`📡 Fetching ${collection} from Directus...`);
    
    const response = await directusClient.request(
      readItems(collection as any, {
        fields: ['*.*'] as any
      })
    );
    
    console.log(`✅ Got ${Array.isArray(response) ? response.length : 1} items from ${collection}`);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching collection ${collection}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

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
