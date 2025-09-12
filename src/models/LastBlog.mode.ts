export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type LastBlogListItem = {
  id: number;
  slug: string;
  title: string;
  summary?: string | null;
  content?: string | null; // HTML ola bilər
  seoTitle?: string | null;
  seoDescription?: string | null;
  mainImage?: string | null;
  gallery?: string[] | null;
  publishedAt?: string | null; // ISO
  authorName?: string | null;
  category?: BlogCategory | null;
};

export type LastBlogListResponse = LastBlogListItem[];
