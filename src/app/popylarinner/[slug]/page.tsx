import { notFound } from "next/navigation";
import PropertyInner from "./property-inner";
import { fetchAPI } from "@/utils";
import ProductSection from "@/app/Home/ProductList";
import { LandProjectResponse } from "@/models/LatesProject.model";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import GoogleReviewsSection from "@/app/Home/GoogleReviewsSection";
import { ReviewResponse } from "@/models/Review.model";
import "./index.scss";
import LatestBlogSection from "@/app/Home/LatestBlogSection";
import { LastBlogResponse } from "@/models/LastBlog.model";
import RealEstateFaqSection from "@/app/Home/RealEstateFaqSection";
import { FaqResponse } from "@/models/Faq.model";

type Landmark = {
  id: number;
  type: string;
  name: string;
  lat: string | number;
  long: string | number;
  image_url?: string | null;
  is_most_popular?: boolean;
};

export type ProjectTimelineType =
  | "announcement"
  | "expected_booking_date"
  | "construction_started"
  | "expected_completion";

export interface ProjectTimelineItem {
  type: ProjectTimelineType | string;
  date: string;
}

export interface PropertyDetail {
  id: number;
  title: string;
  slug: string;
  lat?: string | null;
  long?: string | null;
  address?: string | null;
  handover_at?: string | null;
  sale_start_at?: string | null;
  sq_ft_from?: string | null;
  is_balcony?: boolean;
  is_sea_view?: boolean;
  is_new_listing?: boolean;
  segment?: string | null;
  category?: string | null;
  project_type?: string | null;
  video_url?: string | null;
  amenities?: string[];
  landmarks?: Landmark[];
  project?: {
    id: number;
    name: string;
    slug: string;
    image_url?: string | null;
    timeline?: ProjectTimelineItem[] | null;
  } | null;

  developer?: { id: number; name: string; image_url?: string | null } | null;
  regulatory_info?: {
    id: number;
    agency_name?: string | null;
    link?: string | null;
    zone_name?: string | null;
    permit_number?: number | null;
    broker_license?: string | null;
    rera?: string | null;
    ded?: string | null;
    listed_at?: string | null;
  } | null;
  units: Array<{
    id: number;
    room_count?: number | null;
    bathroom_count?: number | null;
    sq_ft_from?: number | null;
    sq_ft_to?: number | null;
    price_from?: string | null;
    price_to?: string | null;
    types?: Array<{ label?: string; sq_ft?: string | null; image_url?: string | null; uid?: number }>;
    property_type?: { id: number; listing_type?: string | null; name_EN?: string | null } | null;
  }>;
  agent?: { id: number; name?: string; phone?: string; email?: string; image_url?: string | null } | null;
  translation?: {
    id: number;
    lang?: string;
    subtitle?: string | null;
    description?: string | null;
    payment_plans?: Array<{ label: string; value: string }>;
  } | null;
}

// ✅ Next-in .next/types faylındakı gözləntini qarşılayır: params optional və Promise-dır.
type PageProps = { params?: Promise<{ slug: string }> };

export default async function PropertyPage({ params }: PageProps) {
  // await non-promise dəyər üzərində də işləyir -> runtime təhlükəsiz
  const resolved = await (params ?? Promise.resolve<{ slug: string } | undefined>(undefined));
  const slug = resolved?.slug;
  if (!slug) return notFound();

  let item: PropertyDetail | null = null;
  try {
    item = await fetchAPI<PropertyDetail>(`/client/properties/${encodeURIComponent(slug)}`);
  } catch {
    // istəyə görə logging
  }
  if (!item) return notFound();

  const latesProject = await fetchAPI<LandProjectResponse>("/client/properties/latest-project");
  const reviewData   = await fetchAPI<ReviewResponse>("/client/google-reviews");
  const blogRes      = await fetchAPI<LastBlogResponse>("/client/blogs");
  const faqData      = await fetchAPI<FaqResponse>("/client/faq");

  return (
    <div className="property-inner-page">
      <PropertyInner data={item} />
      <ProductSection data={latesProject} />
      <GoogleReviewsSection data={reviewData} />
      <SubscribeSection />
      <LatestBlogSection data={blogRes} />
      <RealEstateFaqSection data={faqData} />
    </div>
  );
}
