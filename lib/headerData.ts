import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
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

export async function getHeaderData(): Promise<HeaderData> {
  try {
    const data = await getCollectionFromDirectus('header');
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

    let item: DirectusHeader | null = null;
    
    if (Array.isArray(data) && data.length > 0) {
      item = data[0] as DirectusHeader;
    } else if (data) {
      item = data as DirectusHeader;
    }
    
    if (!item) {
      console.log('⚠️ No header data from Directus, using fallback');
      return headerFallbackData; // Ensure localFallback retained; already exported alias
    }

    // Разворачиваем many-to-many menu: header.menu -> header_menu_items -> menu_items
    let menuItems: MenuItem[] = [];
    if (Array.isArray(item.menu)) {
      menuItems = item.menu
        .map((junction: DirectusMenuJunction) => {
          const menuItem = junction.menu_items_id;
          if (!menuItem || !menuItem.visible) return null;
          return {
            label: typograph(menuItem.label),
            href: menuItem.slug || '#',
            order: menuItem.order || 0,
          };
        })
        .filter(Boolean)
        .sort((a, b) => (a?.order || 0) - (b?.order || 0));
    }

    // Если меню пустое, берём из фолбэка
    if (menuItems.length === 0) {
      menuItems = headerFallbackData.menu;
    }

    return {
      id: item.id,
      phone: typograph(item.phone),
      email: typograph(item.email),
      // Directus имеет опечатку "adress", поддерживаем оба варианта
      address: typograph(item.address || item.adress),
      instagram: item.instagram,
      vkontakte: item.vkontakte,
      telegram: item.telegram,
      menu: menuItems,
    };
  } catch (error) {
    console.error('❌ Error loading header data:', error instanceof Error ? error.message : error);
    console.log('📦 Using fallback header data');
    return headerFallbackData;
  }
}

