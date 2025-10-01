export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};


export interface BlogTranslation {
  id: number;
  lang: string;
  title: string;
  subtitle: string;
  content_1: string | null;
  content_2: string | null;
}


export interface Blog {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  content_1: string;
  content_2: string;
  seoTitle: string | null;
  created_at: string | null;
  seoDescription: string | null;
  main_image: string | null; 
  content_image: string | null;
  gallery: string[];       
  publishedAt: string;   
  authorName: string | null;
  category: BlogCategory | null;
   translation: BlogTranslation;
}


export interface LastBlogResponse {
  data: Blog[];
  page: number;
  per_page: number;
  total: number;
}

