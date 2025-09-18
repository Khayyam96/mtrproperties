export interface LuxuryTabItem {
  id: number;
  name: string;
}

export interface LuxuryTabResponse {
  data: LuxuryTabItem[];
  page: number;
  per_page: number;
  total: number;
}
