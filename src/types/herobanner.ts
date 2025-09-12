export type BackgroundType = "VIDEO" | "IMAGE";

export type HeroAPI = {
  id: number;
  isActive: boolean;
  backgroundType: BackgroundType | string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  imageUrlMobile: string | null;
  videoUrl: string | null;
  videoPosterUrl: string | null;
};
