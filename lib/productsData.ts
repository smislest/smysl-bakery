

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import { cache } from 'react';
import { getBaseUrl } from './baseUrl';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  ingredients?: string;
  weight?: number | string;
  // Может быть: id файла Directus, объект {id, filename_disk} или {url}
  product_photo?: string | { id: string; filename_disk: string } | { url: string };
}

type RawProduct = Record<string, unknown>;


const toText = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
};

const normalizeProducts = (items: Array<RawProduct | Product>): Product[] => {
  const list = Array.isArray(items) ? items : [];

  return list.map((item) => ({
    ...item,
    id: toText(item.id),
    title: typograph(toText(item.title)),
    subtitle: typograph(toText(item.subtitle)),
    description: typograph(toText(item.description)),
    ingredients: typograph(toText(item.ingredients)),
    weight: item.weight as Product['weight'],
    product_photo: item.product_photo as Product['product_photo'],
  })) as Product[];
};

export const getProductsData = cache(async (): Promise<Product[]> => {
  try {
    // Получаем данные через безопасный API route
    const apiUrl = `${getBaseUrl()}/api/products`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // ISR: кэшировать на 1 час
    });

    if (!response.ok) {
      console.log('⚠️ getProductsData: API вернул', response.status);
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const normalized = normalizeProducts(data);
      console.log('✅ getProductsData: загружено', normalized.length, 'продуктов из API');
      return normalized;
    }

    console.log('⚠️ getProductsData: API вернул пустой массив');
    return [];
  } catch (error) {
    console.error('❌ Error in getProductsData:', error instanceof Error ? error.message : error);
    return [];
  }
});
