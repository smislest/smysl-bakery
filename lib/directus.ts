// Переменные окружения для Directus
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || '';

// Универсальная функция для получения коллекции из Directus
export async function getCollectionFromDirectus(collection: string) {
  const response = await fetch(
    `${DIRECTUS_URL}/items/${collection}`,
    {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  if (data && data.data) {
    return data.data;
  }
  return null;
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
