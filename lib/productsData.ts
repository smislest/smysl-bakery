

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import { readJsonFallback, writeJsonFallback } from './supabaseFallback';

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

const PRODUCTS_FALLBACK_KEY = process.env.SUPABASE_PRODUCTS_KEY || 'products.json';

const normalizeProducts = (items: any[]): Product[] => {
  const list = Array.isArray(items) ? items : [];

  return list.map((item) => ({
    ...item,
    id: item.id || '',
    title: typograph(item.title),
    subtitle: typograph(item.subtitle),
    description: typograph(item.description),
    ingredients: typograph(item.ingredients),
  })) as Product[];
};

async function readSupabaseProducts(): Promise<Product[] | null> {
  const cached = await readJsonFallback<Product[]>(PRODUCTS_FALLBACK_KEY);
  if (Array.isArray(cached) && cached.length > 0) {
    console.log(`📦 Using Supabase fallback for products (${cached.length} items)`);
    return normalizeProducts(cached);
  }
  return null;
}

export async function getProductsData(): Promise<Product[]> {
  try {
    const data = await getCollectionFromDirectus('products');

    if (Array.isArray(data) && data.length > 0) {
      const normalized = normalizeProducts(data);
      console.log(`[Supabase] Attempting to save products...`);
      writeJsonFallback(PRODUCTS_FALLBACK_KEY, normalized).catch((err) => {
        console.warn('⚠️ Failed to persist products fallback to Supabase:', err instanceof Error ? err.message : err);
      });
      return normalized;
    }

    console.log('⚠️ No products from Directus, trying Supabase fallback...');
    const supabaseFallback = await readSupabaseProducts();
    if (supabaseFallback) return supabaseFallback;

    return [];
  } catch (error) {
    console.error('❌ Error in getProductsData:', error instanceof Error ? error.message : error);

    const supabaseFallback = await readSupabaseProducts();
    if (supabaseFallback) return supabaseFallback;

    return [];
  }
}
