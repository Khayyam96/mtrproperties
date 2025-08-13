export type TProperty = {
  id: string;
  slug: string;
  images: string[];
  name: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  isReadyToMove?: boolean;
  isOffPlan?: boolean;
  description?: string;
  amenities?: string[];
};
