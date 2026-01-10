/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSiteSettings, type SiteSettings } from './siteSettingsData';
import { cache } from 'react';

export type FooterData = SiteSettings;

// Используем напрямую SiteSettings так как там уже есть все контакты и соцсети
export const getFooterData = cache(async (): Promise<FooterData | null> => {
  try {
    const siteSettings = await getSiteSettings();
    return siteSettings;
  } catch (error) {
    console.error('❌ Error loading footer data:', error instanceof Error ? error.message : error);
    return null;
  }
});
