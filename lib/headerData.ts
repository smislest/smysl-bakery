import { getCollectionFromDirectus } from './directus';
import { getSiteSettings } from './siteSettingsData';
import { typograph } from './typograph';
import { cache } from 'react';
import headerFallback from '../content/header.json';

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

export const headerFallbackData: HeaderData = {
  ...(headerFallback as HeaderData),
  address: headerFallback.address || '111675, Россия, г. Москва, ул. Святоозерская, дом 8',
};

export const getHeaderData = cache(async (): Promise<HeaderData> => {
  try {
    // Загружаем меню из header коллекции
    const headerMenuData = await getCollectionFromDirectus('header');
    // Загружаем контакты из site_settings
    const siteSettings = await getSiteSettings();

    type DirectusMenuJunction = {
      menu_items_id?: {
        label?: string;
        slug?: string;
        order?: number;
        visible?: boolean;
      };
    };

    type DirectusHeader = HeaderData & {
      adress?: string;
      menu?: DirectusMenuJunction[];
    };

    let menuItem: DirectusHeader | null = null;

    if (Array.isArray(headerMenuData) && headerMenuData.length > 0) {
      menuItem = headerMenuData[0] as DirectusHeader;
    } else if (headerMenuData && typeof headerMenuData === 'object' && !Array.isArray(headerMenuData)) {
      menuItem = headerMenuData as DirectusHeader;
    }
    
    if (!menuItem) {
      console.log('⚠️ No header menu data from Directus, using fallback');
      // Используем контакты из site_settings, но меню из fallback
      return {
        ...headerFallbackData,
        phone: siteSettings.business_phone,
        email: siteSettings.business_email,
        address: siteSettings.business_address,
        telegram: siteSettings.social_telegram,
        instagram: siteSettings.social_instagram,
        vkontakte: siteSettings.social_vk,
      };
    }

    // Разворачиваем many-to-many menu: header.menu -> header_menu_items -> menu_items
    let menuItems: MenuItem[] = [];
    if (Array.isArray(menuItem.menu)) {
      const mapped: Array<MenuItem | null> = menuItem.menu.map((junction: DirectusMenuJunction) => {
        const menuItemData = junction.menu_items_id;
        if (!menuItemData || !menuItemData.visible) return null;
        return {
          label: typograph(menuItemData.label),
          href: menuItemData.slug || '#',
          order: menuItemData.order || 0,
        };
      });

      menuItems = mapped
        .filter((value): value is MenuItem => value !== null)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // Если меню пустое, берём из фолбэка
    if (menuItems.length === 0) {
      menuItems = headerFallbackData.menu;
    }

    return {
      id: menuItem.id,
      phone: siteSettings.business_phone,
      email: siteSettings.business_email,
      address: siteSettings.business_address,
      instagram: siteSettings.social_instagram,
      vkontakte: siteSettings.social_vk,
      telegram: siteSettings.social_telegram,
      menu: menuItems,
    };
  } catch (error) {
    console.error('❌ Error loading header data:', error instanceof Error ? error.message : error);
    console.log('📦 Using fallback header data');
    return headerFallbackData;
  }
});

