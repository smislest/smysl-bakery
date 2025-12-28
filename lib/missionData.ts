

import { getCollectionFromDirectus } from './directus';

export interface MissionData {
  id: string;
  mission_img?: string;
  mission_right_img?: string;
  mission_description?: string;
}

export async function getMissionData(): Promise<MissionData | null> {
  const data = await getCollectionFromDirectus('mission');
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as MissionData;
  }
  return data as MissionData;
}
