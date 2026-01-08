/* eslint-disable @typescript-eslint/no-explicit-any */


import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import { cache } from 'react';

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

const footerFallback: FooterData = {
  id: '0',
  phone: typograph('+7 (903) 169-68-88'),
  email: typograph('hello@smysl.ru'),
  address: typograph('Москва'),
  address_details: typograph(''),
  copyright: typograph('© 2024 Смысл. Все права защищены.'),
};

export const getFooterData = cache(async (): Promise<FooterData | null> => {
  try {
    const data = await getCollectionFromDirectus('footer');
    let item: FooterData | null = null;
    
    if (Array.isArray(data) && data.length > 0) {
      item = data[0] as FooterData;
    } else if (data) {
      item = data as unknown as FooterData;
    }
    
    if (!item) return footerFallback;
    
    return {
      ...item,
      phone: typograph(item.phone),
      email: typograph(item.email),
      address: typograph(item.address),
      address_details: typograph(item.address_details),
      copyright: typograph(item.copyright),
    };
  } catch (error) {
    console.error('❌ Error loading footer data:', error);
    return footerFallback;
  }
});
