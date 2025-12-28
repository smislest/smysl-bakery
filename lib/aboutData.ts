

import { getCollectionFromDirectus } from './directus';

export interface AboutData {
  id: string;
  title?: string;
  text_r?: string;
  text_c?: string;
  text_r2?: string;
}

export async function getAboutData(): Promise<AboutData | null> {
  const data = await getCollectionFromDirectus('about');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as AboutData;
  }
  return data as AboutData;
}
