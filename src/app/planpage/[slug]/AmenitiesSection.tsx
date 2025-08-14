"use client";

import React from "react";
import Image from "next/image";
import { Col, Row, Typography } from "antd";
import {
    CrownOutlined,
    SmileOutlined,
    HomeOutlined,
    HeartOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title } = Typography;

type Amenity = {
    icon: React.ReactNode;
    label: string;
};

const amenities: Amenity[] = [
    { icon: <CrownOutlined />, label: "Infinity Leisure Pool" },
    { icon: <SmileOutlined />, label: "Kids PlayArea" },
    { icon: <HomeOutlined />, label: "Private Beach" },
    { icon: <HeartOutlined />, label: "Fitness Facilities" },
    { icon: <ShopOutlined />, label: "Floating Restaurants" },
];

export default function AmenitiesSection() {
    return (
        <div className="amenities-section">
            <Container>
                <Row gutter={[40, 20]} align="middle">
                    <Col xs={24} md={12}>
                        <div className="amenities-image-wrap">
                            <Image
                                src="/iiii.png"
                                alt="Amenities"
                                fill
                                className="amenities-image"
                                priority
                            />
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={3} className="amenities-title">
                            Explore the Amenities
                        </Title>
                        <ul className="amenities-list">
                            {amenities.map((item, index) => (
                                <li key={index} className="amenity-item">
                                    <span className="amenity-icon">{item.icon}</span>
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
