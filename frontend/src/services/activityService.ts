import type { ActivityItem } from '@/types/activity';
import { getApiBaseUrl } from '@/lib/apiBase';

const API_BASE = getApiBaseUrl();

export async function fetchActivitiesList(): Promise<ActivityItem[]> {
  try {
    const res = await fetch(`${API_BASE}/activities/list`);
    if (!res.ok) {
      console.warn(`Activities API returned HTTP ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (json.status === 'success' && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.error('Error fetching activities list:', err);
    return [];
  }
}

export async function fetchActivityDetail(slugOrId: string | number): Promise<ActivityItem | null> {
  const queryParam = typeof slugOrId === 'number' ? `id=${slugOrId}` : `slug=${encodeURIComponent(slugOrId)}`;
  try {
    const res = await fetch(`${API_BASE}/activities/get?${queryParam}`);
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    }
    return null;
  } catch (err) {
    console.error(`Error fetching activity detail for ${slugOrId}:`, err);
    return null;
  }
}
