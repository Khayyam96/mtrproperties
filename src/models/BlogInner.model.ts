export type BlogCategory = { id: number; name: string };
export type BlogRelatedGroup = { name: string; children: string[] };
export type BlogTranslation = {
  id: number;
  lang: string;
  title: string;
  subtitle: string;
  content_1: string | null;
  content_2: string | null;
  content_3: string | null;
  keys: string[];
  related_content: BlogRelatedGroup[];
};
export type AgentPosition = { id: number; name: string };
export type BlogAgent = {
  id: number;
  name: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  image_url?: string | null;
  bio?: string | null;
  position?: AgentPosition | null;
};
export type BlogInnerResponse = {
  id: number;
  created_at: string;
  slug: string;
  main_image: string;
  content_image: string;
  category: BlogCategory;
  translation: BlogTranslation;
  agent?: BlogAgent | null;
};

const BASE = process.env.NEXT_PUBLIC_IMG_BASE?.trim() || "https://api.dubaiyachts.com/uploads/properties";

export const withBase = (pathOrUrl?: string | null) => {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${BASE.replace(/\/$/, "")}/${String(pathOrUrl).replace(/^\//, "")}`;
};
