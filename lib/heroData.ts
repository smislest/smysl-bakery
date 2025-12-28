

import { getCollectionFromDirectus } from './directus';

export interface HeroData {
  id: string;
  title?: string;
  subtitle?: string;
  hero_photo?: string;
}

export async function getHeroData(): Promise<HeroData | null> {
  const data = await getCollectionFromDirectus('hero');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as HeroData;
  }
  return data as HeroData;
}
