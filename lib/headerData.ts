

import { getCollectionFromDirectus } from './directus';

export interface HeaderData {
  id: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  social_instagram_icon?: string;
  social_vk_icon?: string;
  social_telegram_icon?: string;
}

export async function getHeaderData(): Promise<HeaderData | null> {
  const data = await getCollectionFromDirectus('header');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as HeaderData;
  }
  return data as HeaderData;
}
