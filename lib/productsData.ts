

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import { cache } from 'react';

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
    const data = await getCollectionFromDirectus('products');

    if (Array.isArray(data) && data.length > 0) {
      const normalized = normalizeProducts(data);
      return normalized;
    }

    return [];
  } catch (error) {
    console.error('❌ Error in getProductsData:', error instanceof Error ? error.message : error);
    return [];
  }
});
