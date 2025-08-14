"use client";

import { Row, Col } from "antd";
import Banner from "./Banner";
import CountdownStrip from "../../../components/Lib/Countdown/CountdownStrip";
import PlanBlogInfo from "./PlanBlogInfo";
import VirtualTours from "./VirtualTours";
import GallerySection from "../../../components/Lib/GallerySection/index"
import PaymentPlan from "./PaymentPlan";
import ContactSection from "./ContactSection";
import AmenitiesSection from "./AmenitiesSection";
import FloorPlanSection from "./FloorPlanSection";
import RealestateInfoCard from "@/app/Home/RealestateInfoCard";
import RealEstateFaqSection from "@/app/Home/RealEstateFaqSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";

export default function PlanPageInner() {
    return (
        <div className="plan-page-inner">
            <Banner />

            <div className="countdown-block">
                <Row justify="center" align="middle">
                    <Col xs={24} lg={12} style={{ display: "flex", justifyContent: "center" }}>
                        <CountdownStrip
                            deadline="2025-09-01T08:00:00+04:00"
                            size="lg"
                            onFinish={() => console.log("Countdown finished")}
                        />
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
            <RealEstateFaqSection />
            <SubscribeSection />
        </div>
    );
}
