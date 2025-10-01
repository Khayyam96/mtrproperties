export interface LastBlogTranslation {
  id: number;
  lang: string;
  title: string;
  subtitle: string;
}

export interface LastBlogCategory {
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

export interface LastBlogItem {
  id: number;
  created_at: string;
  slug: string;
  author_name: string | null;
  main_image: string;
  translations: LastBlogTranslation[];
  category: LastBlogCategory;
}

export interface LastBlogResponse {
  data: LastBlogItem[];
  page: number;
  per_page: number;
  total: number;
}
