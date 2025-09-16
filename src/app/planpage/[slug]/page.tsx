// planpage/[slug]/page.tsx
import type { Metadata } from "next";
import { Row, Col } from "antd";
import Banner from "./Banner";
import CountdownStrip from "../../../components/Lib/Countdown/CountdownStrip";
import PlanBlogInfo from "./PlanBlogInfo";
import VirtualTours from "./VirtualTours";
import GallerySection from "../../../components/Lib/GallerySection";
import PaymentPlan from "./PaymentPlan";
import ContactSection from "./ContactSection";
import AmenitiesSection from "./AmenitiesSection";
import FloorPlanSection from "./FloorPlanSection";
import RealestateInfoCard from "@/app/Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import "./index.scss";
import { fetchAPI } from "@/utils";
import { RealEstate } from "@/models/RealEstate.model";

function humanizeSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const titlePart = humanizeSlug(slug);
  return {
    title: `${titlePart} — Payment Plan & Details`,
    description: `${titlePart}. Explore payment plan, amenities, floor plans and more.`,
  };
}

type ApiPaymentPlan = { label?: string | null; value?: string | null };

type OffPlanProjectResp = {
  id: number;
  slug: string;
  address?: string | null;
  handover_at?: string | null;
  price_from?: string | null;
  price_to?: string | null;
  currency?: string | null;
  segment?: string | null;
  media?: { id: number; gallery?: string[] } | null;
  propertyType?: { id: number; name?: string | null } | null;
  developer?: { id?: number; logoUrl?: string | null } | null;
  translation?: {
    id?: number;
    lang?: string;
    title?: string | null;
    subtitle?: string | null;
    content_1?: string | null;
    content_2?: string | null;
    amenity_1?: string | null;
    amenity_2?: string | null;
    amenity_3?: string | null;
    amenity_4?: string | null;
    amenity_5?: string | null;
    payment_plans?: ApiPaymentPlan[] | null;
  } | null;
};

type DecoratedPaymentPlan = { key: string; percent: number; label: string };

const PROPERTIES_BASE = "https://api.dubaiyachts.com/uploads/properties";

function withBase(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${PROPERTIES_BASE}/${path}`;
}

function extractPercent(label?: string | null, value?: string | null): number {
  const s = `${label ?? ""} ${value ?? ""}`;
  const m = s.match(/(\d+(?:\.\d+)?)\s*%/);
  return m ? parseFloat(m[1]) : 0;
}

export default async function PlanPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // ⚡ Error-safe fetch
  let realestateRes: RealEstate | null = null;
  let offPlanRes: OffPlanProjectResp | null = null;

  try {
    realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active");
  } catch (err) {
    console.error("[PlanPage] realestate fetch error:", err);
  }

  try {
    offPlanRes = await fetchAPI<OffPlanProjectResp>("/off-plan-new/" + slug);
  } catch (err) {
    console.error("[PlanPage] offplan fetch error:", err);
  }

  const handoverDeadline = offPlanRes?.handover_at ?? undefined;

  const tours =
    undefined as
      | { id: string; title: string; poster: string; videoPath: string }[]
      | undefined;

  const floorplanPaths: string[] = [];

  const decoratedPaymentPlan: DecoratedPaymentPlan[] =
    (offPlanRes?.translation?.payment_plans ?? []).map((p, idx) => ({
      key: p?.value ?? `step-${idx + 1}`,
      label: p?.label ?? p?.value ?? `Step ${idx + 1}`,
      percent: extractPercent(p?.label, p?.value),
    }));

  const galleryItems =
    (offPlanRes?.media?.gallery ?? []).map((filename, i) => ({
      id: i + 1,
      src: withBase(filename),
      alt: `Gallery ${i + 1}`,
    })) ?? [];

  return (
    <div className="plan-page-inner">
      <Banner />

      {handoverDeadline && (
        <div className="countdown-block">
          <Row justify="center" align="middle">
            <Col xs={24} lg={12} style={{ display: "flex", justifyContent: "center" }}>
              <CountdownStrip
                deadline={handoverDeadline}
                size="lg"
                labels={{ days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" }}
              />
            </Col>
          </Row>
        </div>
      )}

      <PlanBlogInfo />

      {galleryItems.length > 0 && <GallerySection items={galleryItems} />}

      <PaymentPlan items={decoratedPaymentPlan} />
      <ContactSection />
      <AmenitiesSection />

      <FloorPlanSection paths={floorplanPaths} />
      {tours && <VirtualTours tours={tours} />}

      {realestateRes && <RealestateInfoCard data={realestateRes} />}
      <SubscribeSection />
    </div>
  );
}
