

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';

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

export async function getProductsData(): Promise<Product[]> {
  const data = await getCollectionFromDirectus('products');
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    ...item,
    id: item.id || '',
    title: typograph(item.title),
    subtitle: typograph(item.subtitle),
    description: typograph(item.description),
    ingredients: typograph(item.ingredients),
  })) as Product[];
}
