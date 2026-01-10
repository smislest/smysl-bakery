
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCollectionFromDirectus, DIRECTUS_URL } from './directus';
import { typograph } from './typograph';
import { cache } from 'react';

export interface HeroData {
  id?: string;
  title?: string;
  subtitle?: string;
  // normalized image URL
  image?: string;
  imageAlt?: string;
  backgroundImage?: string;
  ctaLink?: string;
  ctaText?: string;
}

function normalizeFileRef(fileRef: any): string | undefined {
  if (!fileRef) return undefined;
  // If Directus returned an object with id or filename_disk
  if (typeof fileRef === 'object') {
    if (fileRef.url) return fileRef.url;
    if (fileRef.filename_disk) return `${DIRECTUS_URL}/assets/${fileRef.filename_disk}`;
    if (fileRef.id) return `${DIRECTUS_URL}/assets/${fileRef.id}`;
    return undefined;
  }
  // If it's a string: either full URL, path, or file id
  if (typeof fileRef === 'string') {
    if (fileRef.startsWith('http') || fileRef.startsWith('/')) return fileRef;
    return `${DIRECTUS_URL}/assets/${fileRef}`;
  }
  return undefined;
}

export const getHeroData = cache(async (): Promise<HeroData | null> => {
  try {
    const data: any = await getCollectionFromDirectus('hero');
    const item = Array.isArray(data) && data.length > 0 ? data[0] : data;
    if (!item) return null;

    const image = normalizeFileRef(item.hero_image || item.hero_photo || item.image || item.hero_photo_id || item.image_file);

    return {
      id: item.id,
      title: typograph(item.title || item.name || undefined),
      subtitle: typograph(item.subtitle || item.description || undefined),
      image,
      imageAlt: item.image_alt || item.hero_image_alt || undefined,
      backgroundImage: normalizeFileRef(item.background_image) || undefined,
      ctaLink: item.cta_link || item.cta || undefined,
      ctaText: typograph(item.cta_text || undefined),
    } as HeroData;
  } catch (error) {
    console.error('❌ Error loading hero data:', error);
    return null;
  }
});
