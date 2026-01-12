import { getCollectionFromDirectus, DIRECTUS_URL } from "./directus";
import { getBaseUrl } from './baseUrl';
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
    // Получаем данные через безопасный API route
    const response = await fetch(`${getBaseUrl()}/api/site-settings`, {
      next: { revalidate: 3600 }, // ISR: кэшировать на 1 час
    });

    if (!response.ok) {
      console.log('⚠️ getSiteSettings: API вернул', response.status);
      return null;
    }

    const settings = await response.json();
    
    if (settings && !settings.error) {
      return settings;
    }
    
    console.warn('⚠️ Site settings not found in API');
    return null;
  } catch (error) {
    console.error('❌ Error loading site settings:', error instanceof Error ? error.message : error);
    return null;
  }
});
