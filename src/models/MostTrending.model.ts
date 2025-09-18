export interface Media {
  id: number;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  project_id?: number | null;
  gallery: string[];
}

export interface Translation {
  id: number;
  title: string;
  subtitle: string;
}

export type PropertyState = 'READY_TO_BUILD' | null;

export type ProjectType = 'off_plan' | 'land';

export interface MostTrendingItem {
  id: number;
  slug: string;
  property_state: PropertyState;
  price: number;
  media: Media;
  translations: Translation[];
  project_type: ProjectType;
}

export interface MostTrendingResponse {
  data: MostTrendingItem[];
  page: number;
  per_page: number;
  total: number;
}
