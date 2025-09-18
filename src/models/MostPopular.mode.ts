export interface MostPopularItem {
  id: number;
  type: string;
  name: string;
  lat: string;
  long: string;
  image_url: string;
  is_most_popular: boolean;
}

export interface MostPopularResponse {
  data: MostPopularItem[];
  page: number;
  per_page: number;
  total: number;
}
