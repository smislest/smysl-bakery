import { createDirectus, rest } from '@directus/sdk';

// URL Directus API (замените на свой, например, Railway)
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus(DIRECTUS_URL).with(rest());

// Пример функции для получения коллекции
export async function getCollection(collection: string) {
  const response = await directus.request(
    rest.items(collection).readMany()
  );
  return response.data;
}

// Пример функции для получения одного элемента
export async function getItem(collection: string, id: string | number) {
  const response = await directus.request(
    rest.items(collection).readOne(id)
  );
  return response.data;
}
