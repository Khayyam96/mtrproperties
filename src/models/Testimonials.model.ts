export type TestimonialPosition = {
  id: number;
  name: string;
};

export type TestimonialItem = {
  id: number;
  name: string;
  image_url?: string | null;
  content?: string | null;
  position?: TestimonialPosition | null;
};

export type TestimonialsResponse = {
  data: TestimonialItem[];
  total: number;
  page: number;
  per_page: number;
};
