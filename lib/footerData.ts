

import { getCollectionFromDirectus } from './directus';

export interface FooterData {
  id: string;
  social_links?: any;
  phone?: string;
  email?: string;
  address?: string;
  address_details?: string;
  buyers_links?: any;
  copyright?: string;
}

export async function getFooterData(): Promise<FooterData | null> {
  const data = await getCollectionFromDirectus('footer');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as FooterData;
  }
  return data as FooterData;
}
