
export interface LandProjectMedia {
  gallery: string[];
}

export interface LandProjectAgent {
  phone?: string | null;
  whatsapp?: string | null;
}

export interface LandProjectItem {
  id: number;
  slug: string;
  segment?: string | null;
  price_from?: number | null;
  price_to?: number | null;
  property_type_list?: string[]; 
  address?: string | null;
  bedroom_count_min?: number | null;
  bedroom_count_max?: number | null;
  bathroom_count_min?: number | null;
  bathroom_count_max?: number | null;
  sq_ft_from?: number | null;
  sq_ft_to?: number | null;
  agent?: LandProjectAgent | null;
  title?: string | null;
  media?: LandProjectMedia | null;
}

export interface LandProjectResponse {
  data: LandProjectItem[];
  page: number;
  per_page: number;
  total: number;
}
