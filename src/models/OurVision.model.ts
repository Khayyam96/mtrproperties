

export type VisionItem = {
  id: number;      
  title: string;
  description: string;
};

export type OurVisionResponse = {
  data: VisionItem[];
  total: number;
  page: number;
  per_page: number;
};
