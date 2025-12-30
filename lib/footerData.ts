

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';

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
  let item: FooterData | null = null;
  
  if (Array.isArray(data) && data.length > 0) {
    item = data[0] as FooterData;
  } else {
    item = data as FooterData;
  }
  
  if (!item) return null;
  
  return {
    ...item,
    phone: typograph(item.phone),
    email: typograph(item.email),
    address: typograph(item.address),
    address_details: typograph(item.address_details),
    copyright: typograph(item.copyright),
  };
}
