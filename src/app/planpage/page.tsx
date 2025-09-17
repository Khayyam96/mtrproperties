
import PlanBanner from "./PlanBanner";
import ProjectDubai from "../Home/ProjectDubai";
// import RealestateInfoCard from "../Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import "./index.scss"
import { fetchAPI } from "@/utils";
import { RealEstate } from "@/models/RealEstate.model";
import { OffPlanListResponse } from "@/models/OffPlan.model";
import { Col, Row } from "antd";
import PropertyFilterBar from "@/components/Lib/PropertyFilterBar";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import { FaqListResponse } from "@/models/Faq.model";
import { LastBlogListResponse } from "@/models/LastBlog.mode";
import LatestBlogSection from "../Home/LatestBlogSection";

export default async function PlanPage() {
  const realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active")
  const offPlanRes = await fetchAPI<OffPlanListResponse>("/off-plan-new");
  const faqData = await fetchAPI<FaqListResponse>('/client/faq')
  const blogRes = await fetchAPI<LastBlogListResponse>('/client/blogPosts/latest')


  console.log(offPlanRes, "offPlanResoffPlanResoffPlanRes")
  console.log(blogRes,"blogResblogResblogRes")


  return (
    <div className="plan-page">
      <PlanBanner />
      <div className="filter-bar-block">
        <Row justify="center">
          <Col xs={24} sm={12} md={10} lg={10}>
            <PropertyFilterBar />
          </Col>
        </Row>
      </div>

      <ProjectDubai data={offPlanRes.data} />

      <RealestateInfoCard data={realestateRes} />
      <RealEstateFaqSection data={faqData} />
      <LatestBlogSection data={blogRes} />
      <SubscribeSection />
    </div>
  );
}
