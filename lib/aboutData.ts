

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';
import aboutFallback from '../content/about-fallback.json';

export interface AboutData {
  id: string;
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
      return aboutFallback as AboutData;
    }
    
    // Типографирование текстовых полей
    return {
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
    };
  } catch (error) {
    console.error('❌ Error loading about data:', error);
    console.log('📦 Using fallback about data');
    return aboutFallback as AboutData;
  }
}
