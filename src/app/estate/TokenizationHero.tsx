"use client";

import React from "react";
import Image from "next/image";
import { Button, Card, Space, Typography, Row, Col } from "antd";
import { ArrowRightOutlined, SafetyOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import "./TokenizationHero.scss";

const { Title, Paragraph, Text } = Typography;

type Feature = {
  key: string;
  iconSrc: string;
  alt?: string;
  width?: number;
  height?: number;
  text: string;
};

type PropertyStats = {
  name: string;
  subtitle?: string;
  propertyValue: number;
  totalTokens: number;
  tokenPriceMin: number;
  yourInvestment: number;
  expectedAnnualReturn: number;
  ctaText?: string;
  ctaHref?: string;
};

type HeroData = {
  pillText: string;
  headline: string;
  highlight: string;
  subheadlinePrefix: string;
  subheadlineHighlight: string;
  description: string;
  background: string;
  features: Feature[];
  property: PropertyStats;
};

const AED = (n: number) => `AED ${n.toLocaleString("en-US")}`;

const MOCK_HERO_DATA: HeroData = {
  pillText: "Government Backed",
  headline: "Dubai Real Estate",
  highlight: "Tokenization",
  subheadlinePrefix: "Invest in Premium Dubai Properties from",
  subheadlineHighlight: "AED 2,000",
  description:
    "Revolutionary blockchain-powered real estate investment platform. Own fractions of premium Dubai properties with government-backed security, transparent ownership, and digital title deeds.",
  background: "/iiii.png",
  features: [
    { key: "legal",   iconSrc: "/check-circle.png",   text: "Legally Compliant",    width: 18, height: 18 },
    { key: "instant", iconSrc: "/check-circle.png",   text: "Instant Transactions", width: 18, height: 18 },
    { key: "fees",    iconSrc: "/check-circle.png", text: "No Hidden Fees",       width: 18, height: 18 },
  ],
  property: {
    name: "Downtown Dubai Tower",
    subtitle: "Prime Property",
    propertyValue: 1_800_000,
    totalTokens: 900,
    tokenPriceMin: 2_000,
    yourInvestment: 10_000,
    expectedAnnualReturn: 8.5,
    ctaText: "Invest on this Property",
    ctaHref: "#invest",
  },
};

export type TokenizationHeroProps = {
  data?: HeroData;
  className?: string;
};

const TokenizationHero: React.FC<TokenizationHeroProps> = ({ data = MOCK_HERO_DATA, className }) => {
  const d = data;
  const p = d.property;

  return (
    <section className={["tokenization-hero", className].filter(Boolean).join(" ")}>
      <div className="bg">
        <Image src={d.background} alt="Dubai skyline" fill className="bgImg" priority sizes="100vw" />
        <div className="overlay" />
      </div>

      <Container>
        <Row gutter={[24, 24]} align="middle" className="heroRow">
          <Col xs={24} lg={14} className="left">
            <span className="pill">
              <SafetyOutlined />
              <span>{d.pillText}</span>
            </span>

            <Title level={1} className="h1">
              {d.headline} <span className="highlight">{d.highlight}</span>
            </Title>

            <Title level={4} className="sub">
              {d.subheadlinePrefix}{" "}
              <strong className="highlightGreen">{d.subheadlineHighlight}</strong>
            </Title>

            <Paragraph className="desc">{d.description}</Paragraph>

            <Space className="ctaRow" wrap>
              <Button type="primary" size="large" className="startBtn">
                Start Investing Now
                <ArrowRightOutlined />
              </Button>
            </Space>

            <div className="features">
              {d.features.map((f) => (
                <div key={f.key} className="feature">
                  <Image
                    src={f.iconSrc}
                    alt={f.alt ?? f.text}
                    width={f.width ?? 18}
                    height={f.height ?? 18}
                    className="featureIcon"
                  />
                  <Text className="featureText">{f.text}</Text>
                </div>
              ))}
            </div>
          </Col>

          <Col xs={24} lg={10} className="cardWrap">
            <Card bordered={false} className="infoCard">
              <div className="cardHead">
                <div className="cardTitle">{p.name}</div>
                {p.subtitle && <div className="cardSub">{p.subtitle}</div>}
              </div>

              <div className="stats">
                <div className="stat">
                  <span className="label">Property Value:</span>
                  <span className="value">{AED(p.propertyValue)}</span>
                </div>
                <div className="stat">
                  <span className="label">Total Tokens:</span>
                  <span className="value">{p.totalTokens.toLocaleString("en-US")}</span>
                </div>
                <div className="stat">
                  <span className="label">Token Price (min):</span>
                  <span className="value">{AED(p.tokenPriceMin)}</span>
                </div>
                <div className="stat">
                  <span className="label">Your Investment:</span>
                  <span className="value highlightGreen">{AED(p.yourInvestment)}</span>
                </div>

                <div className="returnBox">
                  <div className="returnLabel">Expected Annual Return</div>
                  <div className="returnValue">{p.expectedAnnualReturn.toFixed(1)}%</div>
                </div>

                <Button size="large" className="investBtn" href={p.ctaHref}>
                  {p.ctaText}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TokenizationHero;
