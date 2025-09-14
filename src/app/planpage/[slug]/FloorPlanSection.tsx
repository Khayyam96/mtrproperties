"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Typography, Row, Col, Card } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title } = Typography;

// Şəkil bazası: lazım olsa dəyişdirə bilərsən
const PROPERTIES_BASE = "https://api.dubaiyachts.com/uploads/properties";

type Props = {
  paths?: string[]; // API-dən gələn filename-lər
};

export default function FloorPlanSection({ paths = [] }: Props) {
  const items = useMemo(
    () =>
      (paths ?? []).map((p, i) => {
        const src = p?.startsWith("http") ? p : `${PROPERTIES_BASE}/${p}`;
        return { src, alt: `Floor Plan ${i + 1}` };
      }),
    [paths]
  );

  if (!items.length) return null;

  return (
    <div className="floor-plan-section">
      <Container>
        <Title level={3} className="section-title">
          Floor Plan
        </Title>
        <Row gutter={[20, 20]} justify="center">
          {items.map((plan, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className="floor-card" bordered={false}>
                <div className="image-wrap" style={{ position: "relative", paddingTop: "70%" }}>
                  <Image
                    src={plan.src}
                    alt={plan.alt}
                    fill
                    className="floor-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
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
