"use client";

import React from "react";
import { Card, Col, Row, Typography } from "antd";
import "./index.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

type PaymentStep = {
    percent: string;
    description: string;
};

const mockData: PaymentStep[] = [
    { percent: "20%", description: "as Down Payment" },
    { percent: "20%", description: "after completing 40% construction" },
    { percent: "20%", description: "after completing 80% construction" },
    { percent: "40%", description: "Handover time" },
];

export default function PaymentPlan() {
    return (
        <div className="payment-plan-section">
            <Container>
                <Title level={3} className="title">
                    Payment Plan
                </Title>
                <Row gutter={[16, 16]} justify="center">
                    {mockData.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <Card className="payment-card" bordered={false}>
                                <Title level={3} className="percent">
                                    {item.percent}
                                </Title>
                                <Text className="description">{item.description}</Text>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
