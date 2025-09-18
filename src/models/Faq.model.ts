export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqResponse {
  data: FaqItem[];
  page: number;
  per_page: number;
  total: number;
}


