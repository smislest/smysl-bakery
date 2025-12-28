

import { getCollectionFromDirectus } from './directus';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  ingredients?: string;
  weight?: number | string;
  product_photo?: string | { url: string };
}

export async function getProductsData(): Promise<Product[]> {
  const data = await getCollectionFromDirectus('products');
  return data as Product[];
}
