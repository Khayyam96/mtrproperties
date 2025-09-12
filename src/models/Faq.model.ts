export interface FaqItem {
  id: number;
  sortOrder: number;
  question: string;
  answer: string;
}

export interface FaqListResponse {
  data: FaqItem[];
  total_count: number;
  page: number;
  per_page: number;
}
