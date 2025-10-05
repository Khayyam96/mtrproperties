export interface LandPropertyMedia {
  gallery: string[];
}

export interface LandAgent {
  phone: string;
  whatsapp: string;
}

export interface LandProperty {
  id: number;
  slug: string;
  segment: string;
  price_from: number;
  sq_ft_from: number;
  property_type_list: string[]; 
  address: string;
  agent: LandAgent;
  media: LandPropertyMedia;
}

export interface LandPropertiesResponse {
  data: LandProperty[];
  page: number;
  per_page: number;
  total: number;
}
