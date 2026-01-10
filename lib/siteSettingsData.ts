import { getCollectionFromDirectus, DIRECTUS_URL } from "./directus";
import { cache } from "react";

export interface SiteSettings {
  // Основные SEO
  default_title: string;
  default_description: string;
  site_name: string;
  site_url: string;
  
  // OpenGraph
  og_image?: {
    id: string;
    filename_download: string;
  };
  og_image_url?: string;
  og_image_width?: number;
  og_image_height?: number;
  
  // Контакты для Schema.org
  business_name: string;
  business_phone: string;
  business_email: string;
  business_address: string;
  business_city: string;
  business_postal_code: string;
  geo_latitude: string;
  geo_longitude: string;
  
  // Часы работы
  opening_hours: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  
  // Социальные сети
  social_telegram?: string;
  social_instagram?: string;
  social_vk?: string;
  
  // Дополнительно
  price_range?: string;
  serves_cuisine?: string;
}

// Кэшируем результат с помощью React cache для дедупликации запросов в рамках одного рендера
export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    const data = await getCollectionFromDirectus('site_settings');
    
    let settings: any = null;
    
    // Обработка: если это массив (коллекция с несколькими записями)
    if (Array.isArray(data) && data.length > 0) {
      settings = data[0];
    }
    // Обработка: если это объект (singleton collection - одна запись)
    else if (data && typeof data === 'object' && !Array.isArray(data)) {
      settings = data;
    }
    
    if (settings) {
      console.log('✨ Using site settings from Directus');
      
      // Преобразуем og_image в полный URL если есть
      if (settings.og_image) {
        settings.og_image_url = `${DIRECTUS_URL}/assets/${
          typeof settings.og_image === 'string' 
            ? settings.og_image 
            : settings.og_image.id
        }`;
      }
      
      return settings;
    }
    
    console.warn('⚠️ Site settings not found in Directus');
    return null;
  } catch (error) {
    console.error('❌ Error loading site settings:', error instanceof Error ? error.message : error);
    return null;
  }
});
