export interface OffPlanListResponse {
  data: OffPlanAPIItem[];
  page: number;
  per_page: number;
  total: number;
}

export interface OffPlanAPIItem {
  id: number;
  title: string;
  slug: string;
  address: string | null;
  handover_at: string | null; // ISO
  segment?: string | null;
  media?: { gallery?: string[] } | null;
  developer?: { id: number; name?: string; image_url?: string | null } | null;
  translation?: { subtitle?: string } | null;
}