

import { typograph } from './typograph';
import { cache } from 'react';
import { getBaseUrl } from './baseUrl';

export interface AboutData {
  id: string;
  isFallback?: boolean;
  title?: string;
  text_r?: string;
  text_c?: string;
  text_r2?: string;
  passion_title?: string;
  passion_text?: string;
  pride_title?: string;
  pride_text?: string;
  mission_title?: string;
  mission_text?: string;
  svg_title?: string | { id: string };
  image_main?: string | { id: string };
  image_top_right?: string | { id: string };
  image_bottom_left?: string | { id: string };
  image_bottom_right?: string | { id: string };
  image_extra1?: string | { id: string };
  image_extra2?: string | { id: string };
}

function withImageDefaults(item: AboutData): AboutData {
  return {
    ...item,
    svg_title: item.svg_title || '/svg/logo_white.svg',
    image_main: item.image_main || '/img/staf1.png',
    image_top_right: item.image_top_right || '/img/staf2.png',
    image_bottom_left: item.image_bottom_left || '/img/staf3.png',
    image_bottom_right: item.image_bottom_right || '/img/staf4.png',
    image_extra1: item.image_extra1 || '/img/staf5.png',
  };
}

type ImageField = string | { id: string };

function pickImage(value: unknown): ImageField | undefined {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value as { id: string };
  return undefined;
}

function normalizeImages(raw: AboutData | Record<string, unknown>): AboutData {
  const record = raw as Record<string, unknown>;
  const base = raw as AboutData;

  return {
    ...raw,
    image_main: base.image_main || pickImage(record.main_image),
    image_top_right: base.image_top_right || pickImage(record.top_right_image) || pickImage(record.right_top_image),
    image_bottom_left: base.image_bottom_left || pickImage(record.bottom_left_image) || pickImage(record.right_bottom_image),
    image_bottom_right: base.image_bottom_right || pickImage(record.bottom_right_image) || pickImage(record.right_bottom_image2) || pickImage(record.right_bottom_image),
    image_extra1: base.image_extra1 || pickImage(record.extra1_image) || pickImage(record.lab_image),
    image_extra2: base.image_extra2 || pickImage(record.extra2_image),
    svg_title: base.svg_title || pickImage(record.svg_logo),
  } as AboutData;
}

export const getAboutData = cache(async (): Promise<AboutData | null> => {
  try {
    const apiUrl = `${getBaseUrl()}/api/about`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn('⚠️ getAboutData: API returned', res.status);
      return null;
    }
    const item = await res.json() as AboutData | null;
    if (!item) {
      return null;
    }
    
    // Типографирование текстовых полей + нормализация и дефолты картинок
    return withImageDefaults(normalizeImages({
      ...item,
      text_r: typograph(item.text_r),
      text_c: typograph(item.text_c),
      text_r2: typograph(item.text_r2),
      passion_title: typograph(item.passion_title),
      passion_text: typograph(item.passion_text),
      pride_title: typograph(item.pride_title),
      pride_text: typograph(item.pride_text),
      mission_title: typograph(item.mission_title),
      mission_text: typograph(item.mission_text),
    }));
  } catch (error) {
    console.error('❌ Error loading about data:', error);
    return null;
  }
});
