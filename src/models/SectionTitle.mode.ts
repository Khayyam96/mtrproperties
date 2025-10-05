
export enum SectionKey {
  OFF_PLAN = "OFF_PLAN",
  LATEST_PROJECTS = "LATEST_PROJECTS",
  MOST_TRENDING_PROJECTS = "MOST_TRENDING_PROJECTS",
  LAND = "LAND",
  MAXIMIZE_COMMISSION = "MAXIMIZE_COMMISSION",
  LUXURY_PROPERTIES = "LUXURY_PROPERTIES",
  ABOUT_MTR_PROPERTIES = "ABOUT_MTR_PROPERTIES",
  POPULAR_PLACES = "POPULAR_PLACES",
}

export type SectionTitleItem = {
  key: SectionKey | string; 
  title_EN?: string | null;
  subtitle_EN?: string | null;
};

export type SectionTitleResponse = SectionTitleItem[];
