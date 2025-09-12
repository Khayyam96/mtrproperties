import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Row, Col } from "antd";

import Banner from "./Banner";
import CountdownStrip from "../../../components/Lib/Countdown/CountdownStrip";
import PlanBlogInfo from "./PlanBlogInfo";
import VirtualTours from "./VirtualTours";
import GallerySection from "../../../components/Lib/GallerySection/index";
import PaymentPlan from "./PaymentPlan";
import ContactSection from "./ContactSection";
import AmenitiesSection from "./AmenitiesSection";
import FloorPlanSection from "./FloorPlanSection";
import RealestateInfoCard from "@/app/Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";

type Plan = {
  slug: string;
  title: string;
  location: string;
};

const PLANS: Plan[] = [
  { slug: "six-senses", title: "Six Senses", location: "The Palm Jumeirah, Dubai" },
  { slug: "palm-views", title: "Palm Views", location: "The Palm Jumeirah, Dubai" },
  { slug: "dubai-marina-heights", title: "Dubai Marina Heights", location: "Dubai Marina, Dubai" },
  { slug: "emaar-beachfront", title: "Emaar Beachfront", location: "Dubai Harbour, Dubai" },
];

async function getPlanBySlug(slug: string): Promise<Plan | null> {
  const found = PLANS.find((p) => p.slug === slug);
  return found ?? null;
}

export async function generateStaticParams() {
  return PLANS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) {
    return { title: "Plan not found" };
  }
  return {
    title: `${plan.title} — Payment Plan & Details`,
    description: `${plan.title} in ${plan.location}. Explore payment plan, amenities, floor plans and more.`,
  };
}

export default async function PlanPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) notFound();

  return (
    <div className="plan-page-inner">
      <Banner />

      <div className="countdown-block">
        <Row justify="center" align="middle">
          <Col xs={24} lg={12} style={{ display: "flex", justifyContent: "center" }}>
            <CountdownStrip deadline="2025-09-01T08:00:00+04:00" size="lg" />
          </Col>
        </Row>
      </div>

      <PlanBlogInfo />
      <GallerySection />
      <PaymentPlan />
      <ContactSection />
      <AmenitiesSection />
      <FloorPlanSection />
      <VirtualTours />

      <RealestateInfoCard
        title="Realestate agency in dubai"
        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        moreDesc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      />

      <SubscribeSection />
    </div>
  );
}
