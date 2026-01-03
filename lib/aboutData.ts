

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import aboutFallback from '../content/about-fallback.json';

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

const localFallback: AboutData = {
  ...(aboutFallback as AboutData),
  svg_title: '/svg/logo_white.svg',
  image_main: '/img/staf1.png',
  image_top_right: '/img/staf2.png',
  image_bottom_left: '/img/staf3.png',
  image_bottom_right: '/img/staf4.png',
  image_extra1: '/img/staf5.png',
  isFallback: true,
};

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

function normalizeImages(raw: AboutData | Record<string, any>): AboutData {
  const anyRaw = raw as Record<string, any>;
  return {
    ...raw,
    image_main: (raw as AboutData).image_main || anyRaw.main_image,
    image_top_right: (raw as AboutData).image_top_right || anyRaw.top_right_image || anyRaw.right_top_image,
    image_bottom_left: (raw as AboutData).image_bottom_left || anyRaw.bottom_left_image || anyRaw.right_bottom_image,
    image_bottom_right: (raw as AboutData).image_bottom_right || anyRaw.bottom_right_image || anyRaw.right_bottom_image2 || anyRaw.right_bottom_image,
    image_extra1: (raw as AboutData).image_extra1 || anyRaw.extra1_image || anyRaw.lab_image,
    image_extra2: (raw as AboutData).image_extra2 || anyRaw.extra2_image,
    svg_title: (raw as AboutData).svg_title || anyRaw.svg_logo,
  } as AboutData;
}

export async function getAboutData(): Promise<AboutData | null> {
  try {
    const data = await getCollectionFromDirectus('about');
    let item: AboutData | null = null;
    
    if (Array.isArray(data) && data.length > 0) {
      item = data[0] as AboutData;
    } else if (data) {
      item = data as unknown as AboutData;
    }
    
    if (!item) {
      console.log('⚠️ No about data from Directus, using fallback');
      // Типографируем fallback данные
      return {
        ...localFallback,
        text_r: typograph(localFallback.text_r),
        text_c: typograph(localFallback.text_c),
        text_r2: typograph(localFallback.text_r2),
        passion_title: typograph(localFallback.passion_title),
        passion_text: typograph(localFallback.passion_text),
        pride_title: typograph(localFallback.pride_title),
        pride_text: typograph(localFallback.pride_text),
        mission_title: typograph(localFallback.mission_title),
        mission_text: typograph(localFallback.mission_text),
      };
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
    console.log('📦 Using fallback about data');
    // Типографируем fallback данные
    return {
      ...localFallback,
      text_r: typograph(localFallback.text_r),
      text_c: typograph(localFallback.text_c),
      text_r2: typograph(localFallback.text_r2),
      passion_title: typograph(localFallback.passion_title),
      passion_text: typograph(localFallback.passion_text),
      pride_title: typograph(localFallback.pride_title),
      pride_text: typograph(localFallback.pride_text),
      mission_title: typograph(localFallback.mission_title),
      mission_text: typograph(localFallback.mission_text),
    };
  }
}
