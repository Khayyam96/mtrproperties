"use client";

import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

type PaymentItem = {
  key: string;
  percent: number;
  label: string;
};

type Props = {
  items?: PaymentItem[];
};

export default function PaymentPlan({ items = [] }: Props) {
  if (!items.length) return null;

  return (
    <div className="payment-plan-section">
      <Container>
        <Title level={3} className="title">
          Payment Plan
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {items.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.key}>
              <Card className="payment-card" bordered={false}>
                <Title level={3} className="percent">
                  {`${item.percent}%`}
                </Title>
                <Text className="description">{item.label}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
