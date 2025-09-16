import PropertyFilterBar, { PropertyFilterValues } from "@/components/Lib/PropertyFilterBar";
import PlanBanner from "./PlanBanner";
import { Row, Col } from "antd";
import ProjectDubai from "../Home/ProjectDubai";
// import ReasonToInvest from "../newProject/ReasonToInvest";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import "./index.scss"
import { fetchAPI } from "@/utils";
import { RealEstate } from "@/models/RealEstate.model";
import { OffPlanListResponse } from "@/models/OffPlan.model";


export default async function PlanPage() {

    const realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active")
    const offPlanRes = await fetchAPI<OffPlanListResponse>("/client/offPlanProjects");

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
            {/* <PlanCardSection /> */}
            <ProjectDubai data={offPlanRes.data} />
            {/* <ReasonToInvest /> */}
            <RealestateInfoCard data={realestateRes} />
            <SubscribeSection />
        </div>
    );
}
