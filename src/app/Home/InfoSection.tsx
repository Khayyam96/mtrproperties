"use client";

import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph } = Typography;

function InfoSection() {
  return (
    <section className="info-section">
      <Container>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={16}>
            <div className="info-box">
              <Title level={2} className="info-section-title">
                Looking for Something Specific?
              </Title>
              <Paragraph className="info-section-subtitle">
                Our land specialists can help you find the perfect plot that matches your exact requirements and budget.
              </Paragraph>
              <Button type="primary" size="large" className="info-section-btn">
                Speak to Expert
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default InfoSection;
