export type InterestRateType = "fixed" | "variable" | "fixed/reducing" | "reducing";

export interface Bank {
  id: number;
  name: string;
  imgUrl: string;            
  product: string;
  link: string;             
  interest_rate: string;     
  interest_rate_type: InterestRateType;
  down_payment: string;      
  tenure_years: number;     
  features: string;
}

export interface BankListResponse {
  data: Bank[];
  total: number;
  page: number;
  per_page: number;
}
