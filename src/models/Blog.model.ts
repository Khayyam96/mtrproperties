export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export interface Blog {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  content: string; // HTML
  seoTitle: string | null;
  seoDescription: string | null;
  mainImage: string | null; // şəkil URL-i və ya null
  gallery: string[];        // şəkil URL-lərinin siyahısı
  publishedAt: string;      // ISO datetime string
  authorName: string | null;
  category: BlogCategory | null;
}
