export type PartnerItem = {
  id: number;
  name: string;
  image_url: string | null;
};

export type PartnerListResponse = {
  data: PartnerItem[];
  page: number;
  per_page: number;
  total: number;
};

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties/";

export function buildPartnerImgUrl(name?: string | null) {
  if (!name) return "/placeholder.png";
  if (/^https?:\/\//i.test(name)) return name;
  return `${MEDIA_BASE}${name}`.replace(/([^:]\/)\/+/g, "$1");
}
