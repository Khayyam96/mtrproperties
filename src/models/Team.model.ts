export type Agent = {
  id: number;
  name: string;
  image_url: string | null;       // API-də belə gəlir
  position: string | null;        // API-də string və ya null gəlir
};

export interface TeamListResponse {
  data: Agent[];
  total: number;
  page: number;
  per_page: number;
}

/** Media base helper: boşdursa fallback şəkil qaytarır */
export const withBase = (path?: string | null) => {
  if (!path) return "/images/noavatar.svg"; // öz fallback yolunla əvəz edə bilərsən
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE || "";
  return `${base}/${path}`.replace(/([^:]\/)\/+/g, "$1");
};
