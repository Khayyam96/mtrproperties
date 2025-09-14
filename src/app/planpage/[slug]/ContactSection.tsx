
"use client";

import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

export default function ContactSection() {
  return (
    <div className="contact-section">
      <Container>
        <Row justify="space-between" align="middle">
          <Col xs={24} md={16}>
            <Title level={4} className="contact-title">
              Do You Have Questions?
            </Title>
            <Text className="contact-subtitle">
              We&#39;ll help you to grow
            </Text>
          </Col>
          <Col xs={24} md={8} className="contact-btn-col">
            <Button
              type="primary"
              className="contact-btn"
              onClick={() => console.log("Contact Us Clicked")}
            >
              Contact Us Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
