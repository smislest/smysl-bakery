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

// Fallback данные если Directus недоступен
const fallbackSettings: SiteSettings = {
  default_title: 'Безглютеновая пекарня в Москве — свежая выпечка и десерты',
  default_description: 'Свежая безглютеновая выпечка в Москве: хлеб, пироги, десерты. Натуральные ингредиенты, собственное производство. Доставка и самовывоз.',
  site_name: 'СМЫСЛ есть',
  site_url: 'https://smysl-bakery-8e13.vercel.app',
  og_image_width: 1200,
  og_image_height: 630,
  business_name: 'СМЫСЛ есть',
  business_phone: '+7-999-123-45-67',
  business_email: 'info@smysl-est.ru',
  business_address: '111675, Россия, г. Москва, ул. Святоозерская, дом 8',
  business_city: 'Москва',
  business_postal_code: '111675',
  geo_latitude: '55.735878',
  geo_longitude: '37.838814',
  opening_hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00'
    },
    {
      days: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00'
    }
  ],
  social_telegram: 'https://t.me/smyslest',
  social_instagram: 'https://instagram.com/smyslest',
  price_range: '₽₽',
  serves_cuisine: 'Безглютеновая выпечка'
};

// Кэшируем результат с помощью React cache для дедупликации запросов в рамках одного рендера
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
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
      
      return {
        ...fallbackSettings,
        ...settings,
      };
    }
    
    console.warn('⚠️ Site settings not found, using fallback');
    return fallbackSettings;
  } catch (error) {
    console.error('❌ Error loading site settings:', error instanceof Error ? error.message : error);
    return fallbackSettings;
  }
});
