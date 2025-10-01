export interface Area {
  id: number;
  name: string;
}

export type ProjectType = 'ready' | 'off_plan' | 'land' | string;

export interface MostTrendingItem {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
  price_from: string;       
  project_type: ProjectType;
  area?: Area | null;
}

export interface MostTrendingResponse {
  data: MostTrendingItem[];
  page: number;
  per_page: number;
  total: number;
}
