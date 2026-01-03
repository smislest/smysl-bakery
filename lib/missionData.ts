

import { getCollectionFromDirectus } from './directus';
import { typograph } from './typograph';

export interface MissionData {
  id: string;
  mission_img?: string;
  mission_right_img?: string;
  mission_description?: string;
}

const missionFallback: MissionData = {
  id: '0',
  mission_description: typograph('Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным — Без компромисса между пользой и удовольствием'),
};

export async function getMissionData(): Promise<MissionData | null> {
  try {
    const data = await getCollectionFromDirectus('mission');
    let item: MissionData | null = null;
    
    if (Array.isArray(data) && data.length > 0) {
      item = data[0] as MissionData;
    } else if (data) {
      item = data as unknown as MissionData;
    }
    
    if (!item) return missionFallback;
    
    return {
      ...item,
      mission_description: typograph(item.mission_description),
    };
  } catch (error) {
    console.error('❌ Error loading mission data:', error);
    return missionFallback;
  }
}
