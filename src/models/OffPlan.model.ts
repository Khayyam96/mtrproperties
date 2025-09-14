export interface OffPlanListResponse {
  data: OffPlanItem[];
  total_count: number;
  page: number;
  per_page: number;
}

export type OffPlanItem = {
  id: number;
  slug?: string;
  currency?: string;
  startingPrice?: string;
  segment?: string;
  handoverAt?: string | null;
  developer?: { id: number; name?: string; key?: string; logoUrl?: string | null } | null;
  propertyType?: { id: number; key?: string; name?: string } | null;
  paymentPlan?: { key?: string; percent?: number }[];
  translations?: { title?: string }[];
  media?: { galleryPaths?: string[] } | null;
};

export interface PaymentPlanPart {
  key: 'dp' | 'installments' | 'handover' | string;
  percent: number;
}

export interface OffPlanTranslation {
  title: string;
  excerpt: string;
  paymentPlan?: unknown[][];
}

export interface DeveloperInfo {
  id: number;
  name: string;
  key: string;
  logoUrl: string;
}

export interface PropertyTypeInfo {
  id: number;
  key: string;
  name: string;
}
