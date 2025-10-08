// app/(routes)/about/OurVision.tsx
"use client";

import React from "react";
import { Col, Row, Typography, Empty } from "antd";
import { Container } from "../../components/Lib/ProContainer/Container";
import type { OurVisionResponse } from "@/models/OurVision.model";

const { Title, Text } = Typography;

type TProps = { data: OurVisionResponse };

export const OurVision: React.FC<TProps> = ({ data }) => {
  const items = data?.data ?? [];

  return (
    <div className="our-vision-section">
      <Container>
        <div className="text-center">
          <Title level={2}>Our Vision</Title>
          <Text className="subtitle">
            We’re building long-term value through clarity, focus, and consistent execution.
          </Text>
        </div>

        {items.length === 0 ? (
          <div style={{ padding: 24 }}>
            <Empty description="No vision items found" />
          </div>
        ) : (
          <Row gutter={[24, 24]} justify="center" className="vision-cards">
            {items.map((item) => (
              <Col xs={24} md={6} key={item.id}>
                <div className="vision-card">
                  <h4>{item.title}</h4>
                  <Text className="desc">{item.description}</Text>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default OurVision;
