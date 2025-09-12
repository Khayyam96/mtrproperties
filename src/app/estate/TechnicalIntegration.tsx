"use client";

import React from "react";
import { Row, Col, Card, Typography } from "antd";
import Image from "next/image";
import { Container as ProContainer } from "../../components/Lib/ProContainer/Container";
import "./TechnicalIntegration.scss";

const { Title, Paragraph } = Typography;

type FeatureCard = {
  key: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

const CARDS: FeatureCard[] = [
  {
    key: "xrp",
    image: "/image4.png",
    imageAlt: "XRP Ledger",
    title: "XRP Ledger Integration",
    subtitle: "Built on enterprise-grade blockchain technology",
    bullets: ["Fast transactions", "Low fees", "Environmental efficiency", "Enterprise security"],
  },
  {
    key: "prypco",
    image: "/image4.png",
    imageAlt: "Prypco Platform",
    title: "Prypco Platform",
    subtitle: "User-friendly interface for seamless investing",
    bullets: ["AED payments only", "Instant transactions", "Mobile app", "24/7 support"],
  },
  {
    key: "smart",
    image: "/image1.png",
    imageAlt: "Smart Contracts",
    title: "Smart Contracts",
    subtitle: "Automated and transparent property management",
    bullets: ["Rental distribution", "Voting rights", "Exit mechanisms", "Compliance automation"],
  },
];

export default function TechnicalIntegration() {
  return (
    <section className="technical-integration">
      <ProContainer>
        <div className="ti-header">
          <Paragraph className="ti-lead">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard.
          </Paragraph>
          <Title level={2} className="ti-title">Technical Integration</Title>
        </div>

        <Row gutter={[24, 24]}>
          {CARDS.map((card) => (
            <Col key={card.key} xs={24} md={12} lg={8}>
              <Card bordered={false} className="ti-card" hoverable>
                <div className="ti-cover">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="ti-cover-img"
                  />
                </div>

                <div className="ti-body">
                  <Title level={4} className="ti-card-title">{card.title}</Title>
                  <Paragraph className="ti-subtitle">{card.subtitle}</Paragraph>
                  <ul className="ti-list">
                    {card.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </ProContainer>
    </section>
  );
}
