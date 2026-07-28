export interface ActivityItem {
  id: number;
  title: string;
  slug: string;
  icon?: string | null;
  short_description: string;
  description: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  meta_image?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ActivitiesListResponse {
  status: string;
  data: ActivityItem[];
  message?: string;
}

export interface ActivityDetailResponse {
  status: string;
  data: ActivityItem;
  message?: string;
}
