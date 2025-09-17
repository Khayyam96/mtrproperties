export type BackgroundType = "IMAGE" | "VIDEO";

export interface HeroBanner {
  id: number;
  isActive: boolean;
  background_type: BackgroundType;
  image_url: string | null;
  imageUrlMobile: string | null;
  video_url: string | null;
  title: string;
  subtitle: string;
}
