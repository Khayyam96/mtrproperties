export interface ReviewItem {
  id: number;
  created_at: string;
  fullname: string;
  rating: string;
  review: string;
}

export interface ReviewResponse {
  data: ReviewItem[];
  average: string;
  total: number;
  page: number;
  per_page: number;
}