import type { ActivityItem } from '@/types/activity';
import { getApiBaseUrl } from '@/lib/apiBase';

const API_BASE = getApiBaseUrl();

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
