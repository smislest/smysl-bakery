

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';

export interface MissionData {
  id: string;
  mission_img?: string;
  mission_right_img?: string;
  mission_description?: string;
}

export async function getMissionData(): Promise<MissionData | null> {
  const data = await getCollectionFromDirectus('mission');
  let item: MissionData | null = null;
  
  if (Array.isArray(data) && data.length > 0) {
    item = data[0] as MissionData;
  } else if (data) {
    item = data as unknown as MissionData;
  }
  
  if (!item) return null;
  
  return {
    ...item,
    mission_description: typograph(item.mission_description),
  };
}
