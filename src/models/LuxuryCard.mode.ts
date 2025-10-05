// /properties/api/v1/client/properties/luxury cavabına uyğun tiplər

export type LuxuryMedia = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  project_id: number;
  gallery: string[]; // ["<filename>.webp", ...]
};

export type LuxuryPropertyInner = {
  id: number;
  title: string;
  slug: string;
  segment: string; // "LUXURY"
  media: LuxuryMedia;
};

export type LuxuryItem = {
  id: number;               // list item id
  property_type_id: number;
  property: LuxuryPropertyInner;
};

export type LuxuryListResponse = {
  data: LuxuryItem[];
  page: number;
  per_page: number;
  total: number;
};
