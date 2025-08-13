"use client";

import { Row, Col } from "antd";
import Banner from "./Banner";
import CountdownStrip from "../../../components/Lib/Countdown/CountdownStrip";
import "./index.scss";
import PlanBlogInfo from "./PlanBlogInfo";
import VirtualTours from "./VirtualTours";
import GallerySection from "../../../components/Lib/GallerySection/index"

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
            <VirtualTours />
        </div>
    );
}
