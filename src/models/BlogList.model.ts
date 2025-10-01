// BlogList.model.ts
// Auto-generated interfaces matching the provided API response

export interface BlogTranslation {
  id: number;
  lang: string;
  title: string;
  subtitle: string | null;
}

export interface BlogCategory {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name_EN: string;
  name_RU: string;
  name_DE: string;
  name_FR: string;
  name_ES: string;
  name_UAE: string;
}

export interface BlogItem {
  id: number;
  created_at: string;
  slug: string;
  author_name: string | null;
  main_image: string | null;
  translations: BlogTranslation[];
  category: BlogCategory;
}

export interface BlogListResponse {
  data: BlogItem[];
  page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
}
