"use client";

import { FC } from "react";
import { Card, Button, Row, Col, Typography, Tag } from "antd";
import Image from "next/image";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

const features = [
    {
        icon: "/icc1.png",
        title: "90-100% Commission",
        desc: "Keep what you earn with our revolutionary commission structure",
    },
    {
        icon: "/icc2.png",
        title: "Full Support System",
        desc: "Complete back-office support and transaction coordination",
    },
    {
        icon: "/icc3.png",
        title: "Unlimited Growth",
        desc: "No caps or limits on your earning potential",
    },
    {
        icon: "/icc4.png",
        title: "10,000+ Brokers",
        desc: "Join our thriving community of successful agents",
    },
];

export const CommissionSection: FC = () => {
    return (
        <div className="commission-section">
            <Container>
                <Title level={2} className="commission-title">
                    Maximize Your Commission
                </Title>
                <Text className="commission-desc">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
                </Text>
                <Row gutter={[40, 40]} className="commission-main-row">
                    <Col xs={24} lg={16}>
                        <Title level={4} className="features-title">
                            Why Choose Our Broker Program?
                        </Title>
                        <Row gutter={[24, 24]}>
                            {features.map((item, idx) => (
                                <Col xs={24} sm={12} key={idx}>
                                    <Card bordered={false} className="feature-card">
                                        <div className="feature-card-inner">
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                width={40}
                                                height={40}
                                                className="feature-icon"
                                            />
                                            <div>
                                                <Text strong className="feature-title">{item.title}</Text>
                                                <div className="feature-desc">{item.desc}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Text className="program-desc">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
                        </Text>
                        <Button type="primary" className="full-program-btn">
                            View Full Program
                            <Image src="/buttonicon.png" alt="dropdown" width={16} height={16} />
                        </Button>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card className="calculator-card" bordered={false}>
                            <div className="tags">
                                <Tag color="purple" className="preview-tag">Quick Preview</Tag>
                            </div>
                            <Title level={4} className="calculator-title">Commission Calculator</Title>
                            <div className="calc-row">
                                <div className="calc-label">Property Sale Price</div>
                                <div className="calc-value bold">AED 500,000</div>
                            </div>
                            <div className="calc-row">
                                <div className="calc-label">Commission Rate</div>
                                <div className="calc-value">3%</div>
                            </div>
                            <div className="calc-row earnings">
                                <div>
                                    <div className="calc-label">Your Earnings (100%)</div>
                                    <div className="calc-earning-value">AED 15,000</div>
                                    <div className="calc-compare">+ AED 6,000 vs traditional 60% split</div>
                                </div>
                            </div>
                            <Button type="primary" block className="calculator-btn">
                                Try Calculator
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CommissionSection;
