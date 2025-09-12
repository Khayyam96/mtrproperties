"use client";

import PropertyFilterBar, { PropertyFilterValues } from "@/components/Lib/PropertyFilterBar";
import PlanBanner from "./PlanBanner";
import { Row, Col } from "antd";
import ProjectDubai from "../Home/ProjectDubai";
import ReasonToInvest from "../newProject/ReasonToInvest";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import "./index.scss"


export default function PlanPage() {

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
            <ProjectDubai />
            <ReasonToInvest />
            <RealestateInfoCard
                title="Realestate agency in dubai"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                moreDesc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            />
            <SubscribeSection />
        </div>
    );
}
