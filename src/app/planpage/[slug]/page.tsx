// planpage/[slug]/page.tsx
import { Row, Col } from "antd";
import Banner from "./Banner";
import CountdownStrip from "../../../components/Lib/Countdown/CountdownStrip";
import PlanBlogInfo from "./PlanBlogInfo";
// import VirtualTours from "./VirtualTours";
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

type ApiPaymentPlan = { label?: string | null; value?: string | null };

type OffPlanProjectResp = {
  id: number;
  slug: string;
  handover_at?: string | null;
  media?: { gallery?: string[] } | null;
  translation?: { payment_plans?: ApiPaymentPlan[] | null } | null;
};

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

export default async function PlanDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let realestateRes: RealEstate | null = null;
  let offPlanRes: OffPlanProjectResp | null = null;

  try {
    realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active");
  } catch (err) {
    console.error("[PlanDetailPage] realestate fetch error:", err);
  }

  try {
    offPlanRes = await fetchAPI<OffPlanProjectResp>("/off-plan-new/" + slug);
  } catch (err) {
    console.error("[PlanDetailPage] offplan fetch error:", err);
  }

  const handoverDeadline = offPlanRes?.handover_at ?? undefined;

  const galleryItems =
    (offPlanRes?.media?.gallery ?? []).map((filename, i) => ({
      id: i + 1,
      src: withBase(filename),
      alt: `Gallery ${i + 1}`,
    }));

  const decoratedPaymentPlan =
    (offPlanRes?.translation?.payment_plans ?? []).map((p, idx) => ({
      key: p.value ?? `step-${idx + 1}`,
      label: p.label ?? p.value ?? `Step ${idx + 1}`,
      percent: extractPercent(p.label, p.value),
    }));

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
      <FloorPlanSection paths={[]} />
      {realestateRes && <RealestateInfoCard data={realestateRes} />}
      <SubscribeSection />
    </div>
  );
}
