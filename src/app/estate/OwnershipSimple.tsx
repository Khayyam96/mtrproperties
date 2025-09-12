"use client";

import React from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Container as ProContainer } from "../../components/Lib/ProContainer/Container";
import "./OwnershipMadeSimple.scss";

const { Title, Paragraph } = Typography;

export default function OwnershipMadeSimple() {
  return (
    <section className="ownership-simple">
      <ProContainer>
        <Row justify="center">
          <Col xs={24} md={20} lg={16}>
            <div className="os-box">
              <Title level={4} className="os-title">Ownership Made Simple</Title>

              <div className="os-pill">
                Each token represents 0.004% ownership of the property. Buy as few as 1
                token or as many as you want!
              </div>

              <div className="os-flow">
                <Card bordered className="os-mini">
                  <div className="os-main-title">AED 1.8M Property</div>
                  <div className="os-sub">Premium Dubai real estate</div>
                </Card>

                <div className="os-arrow">
                  <Image
                    src="/arrow-right.png"
                    alt="Arrow Right"
                    width={24}
                    height={24}
                    className="os-arrow-icon"
                    priority={false}
                  />
                </div>

                <Card bordered className="os-mini">
                  <div className="os-main">900 Tokens</div>
                  <div className="os-sub">AED 2,000 each</div>
                </Card>
              </div>
            </div>

            <div className="os-cta">
              <Paragraph className="os-cta-text">
                Do you want to know more details contact our expert
              </Paragraph>

              <Button size="large" className="os-cta-btn">
                Contact Us <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </ProContainer>
    </section>
  );
}
