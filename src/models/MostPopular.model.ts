
export type LangCode = "EN" | "RUS" | "DE" | "FR" | "ES" | "UAE";

export interface MostPopularTranslation {
  id: number;
  lang: LangCode;
  title: string;
}

export interface MostPopularItem {
  id: number;
  isActive: boolean;
  sortOrder: number;
  imagePath: string; 
  translations: MostPopularTranslation[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total_count: number;
  page: number;
  per_page: number;
}

export type MostPopularResponse = PaginatedResponse<MostPopularItem>;


export interface ClientMostPopularItem {
  id: number;
  title: string;
  image: string; 
}

export interface ClientMostPopularListResponse {
  items: ClientMostPopularItem[];
}
