"use client";

import React from "react";
import Image from "next/image";
import { Typography, Row, Col, Card } from "antd";
import "./index.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title } = Typography;

type FloorPlan = {
    src: string;
    alt: string;
};

const floorPlans: FloorPlan[] = [
    { src: "/plan.png", alt: "Floor Plan 1" },
    { src: "/plan.png", alt: "Floor Plan 2" },
    { src: "/plan.png", alt: "Floor Plan 3" },
];

export default function FloorPlanSection() {
    return (
        <div className="floor-plan-section">
            <Container>
                <Title level={3} className="section-title">
                    Floor Plan
                </Title>
                <Row gutter={[20, 20]} justify="center">
                    {floorPlans.map((plan, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card className="floor-card" bordered={false}>
                                <div className="image-wrap">
                                    <Image
                                        src={plan.src}
                                        alt={plan.alt}
                                        fill
                                        className="floor-image"
                                    />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
