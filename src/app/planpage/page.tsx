// planpage/page.tsx
import PropertyFilterBar, { PropertyFilterValues } from "@/components/Lib/PropertyFilterBar";
import PlanBanner from "./PlanBanner";
import { Row, Col } from "antd";
import ProjectDubai from "../Home/ProjectDubai";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import "./index.scss"
import { fetchAPI } from "@/utils";
import { RealEstate } from "@/models/RealEstate.model";
import { OffPlanListResponse } from "@/models/OffPlan.model";

export default async function PlanPage() {
  // ⚡ Error-safe fetch
  let realestateRes: RealEstate | null = null;
  let offPlanRes: OffPlanListResponse | null = null;

  try {
    realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active");
  } catch (err) {
    console.error("[PlanPage] realestate fetch error:", err);
  }

  try {
    offPlanRes = await fetchAPI<OffPlanListResponse>("/client/offPlanProjects");
  } catch (err) {
    console.error("[PlanPage] offplan fetch error:", err);
  }

  const handleSubmit = (values: PropertyFilterValues) => {
    console.log(values);
  };

  return (
    <div className="plan-page">
      <PlanBanner />
      <div className="filter-bar-block">
        <Row justify="center">
          <Col xs={24} sm={12} md={10} lg={10}>
            <PropertyFilterBar onSubmit={handleSubmit} />
          </Col>
        </Row>
      </div>

      {/* ProjectDubai safe */}
      <ProjectDubai data={offPlanRes?.data ?? []} />

      {realestateRes && <RealestateInfoCard data={realestateRes} />}
      <SubscribeSection />
    </div>
  );
}
