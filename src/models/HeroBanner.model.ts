export type BackgroundType = "IMAGE" | "VIDEO";

export interface HeroBanner {
  id: number;
  isActive: boolean;
  backgroundType: BackgroundType;
  imageUrl: string | null;
  imageUrlMobile: string | null;
  videoUrl: string | null;
  videoPosterUrl: string | null;
  title: string;
  subtitle: string;
}
