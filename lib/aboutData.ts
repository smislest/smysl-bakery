

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';

export interface AboutData {
  id: string;
  title?: string;
  text_r?: string;
  text_c?: string;
  text_r2?: string;
  passion_text?: string;
  pride_text?: string;
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
  const data = await getCollectionFromDirectus('about');
  let item: AboutData | null = null;
  
  if (Array.isArray(data) && data.length > 0) {
    item = data[0] as AboutData;
  } else {
    item = data as AboutData;
  }
  
  if (!item) return null;
  
  // Типографирование текстовых полей
  return {
    ...item,
    text_r: typograph(item.text_r),
    text_c: typograph(item.text_c),
    text_r2: typograph(item.text_r2),
    passion_text: typograph(item.passion_text),
    pride_text: typograph(item.pride_text),
    mission_text: typograph(item.mission_text),
  };
}
