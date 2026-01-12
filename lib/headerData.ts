import { getSiteSettings } from './siteSettingsData';
import { getBaseUrl } from './baseUrl';
import { typograph } from './typograph';
import { cache } from 'react';

export interface MenuItem {
  label: string;
  href: string;
  order?: number;
}

export interface HeaderData {
  id?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  vkontakte?: string;
  telegram?: string;
  menu: MenuItem[];
}

export const getHeaderData = cache(async (): Promise<HeaderData | null> => {
  try {
    // Загружаем меню и контакты через внутренний API (без CORS)
    const apiRes = await fetch(`${getBaseUrl()}/api/header`, { next: { revalidate: 3600 } });
    if (!apiRes.ok) {
      console.warn('⚠️ getHeaderData: API header returned', apiRes.status);
      return null;
    }
    const apiHeader = await apiRes.json();
    // Загружаем контакты из site_settings
    const siteSettings = await getSiteSettings();

    if (!apiHeader || !siteSettings) {
      return null;
    }
    const menuItems: MenuItem[] = Array.isArray(apiHeader.menu)
      ? apiHeader.menu.map((m: any) => ({
          label: typograph(m.label),
          href: m.href || '#',
          order: m.order || 0,
        }))
      : [];

    // Если меню пустое, возвращаем null
    if (menuItems.length === 0) {
      return null;
    }

    return {
      id: apiHeader.id,
      phone: siteSettings.business_phone || apiHeader.phone,
      email: siteSettings.business_email || apiHeader.email,
      address: siteSettings.business_address,
      instagram: siteSettings.social_instagram,
      vkontakte: siteSettings.social_vk,
      telegram: siteSettings.social_telegram,
      menu: menuItems,
    };
  } catch (error) {
    console.error('❌ Error loading header data:', error instanceof Error ? error.message : error);
    return null;
  }
});

