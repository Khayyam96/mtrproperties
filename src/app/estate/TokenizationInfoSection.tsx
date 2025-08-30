"use client";

import React from "react";
import Link from "next/link";
import { Row, Col, Typography, Button, Card, Space } from "antd";
import { ArrowRightOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import "./TokenizationInfoSection.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph, Text } = Typography;

const TokenizationInfoSection: React.FC = () => {
  return (
    <section className="tokenization-info">
      <Container>
        <div className="container">
          <header className="header">
            <Title level={2} className="title">
              The Future of Real Estate Investment
            </Title>
            <Paragraph className="lead">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s
            </Paragraph>
          </header>

          <Row gutter={[32, 32]} align="top" className="grid">
            <Col xs={24} lg={14}>
              <div className="left">
                <Title level={4} className="h4">What is Real Estate Tokenization?</Title>

                <Space direction="vertical" size={16} className="copy">
                  <Paragraph>
                    Real estate tokenization transforms traditional property ownership by dividing properties
                    into digital tokens on the blockchain. Each token represents a fractional ownership stake
                    in premium Dubai real estate.
                  </Paragraph>
                  <Paragraph>
                    Unlike traditional real estate investment that requires substantial capital, tokenization
                    allows you to invest in high-value properties starting from just AED 2,000, making Dubai&apos;s
                    prestigious property market accessible to a broader range of investors.
                  </Paragraph>
                  <Paragraph>
                    Every transaction is recorded on the XRP Ledger blockchain, ensuring transparent,
                    tamper-proof ownership records while maintaining full compliance with Dubai&apos;s regulatory
                    framework.
                  </Paragraph>
                </Space>

                <Link href="/contact" className="ctaLink" aria-label="Contact Us">
                  <Button type="primary" size="large" className="cta">
                    Contact Us for More <ArrowRightOutlined />
                  </Button>
                </Link>
              </div>
            </Col>

            <Col xs={24} lg={10}>
              <div className="right">
                <Card bordered className="compareCard">
                  <div className="compareHeader">Traditional vs Tokenized</div>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Card className="mini" bordered>
                        <div className="miniHead">Traditional</div>
                        <ul className="list">
                          <li>AED 2M+ minimum</li>
                          <li>Complex paperwork</li>
                          <li>Limited liquidity</li>
                          <li>High transaction costs</li>
                        </ul>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card className="mini highlight" bordered>
                        <div className="miniHead">Tokenized</div>
                        <ul className="list">
                          <li>AED 2K minimum</li>
                          <li>Digital process</li>
                          <li>24/7 trading</li>
                          <li>Minimal fees</li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </Card>

                <Card bordered className="govCard">
                  <div className="govTop">
                    <SafetyCertificateOutlined className="shield" />
                    <Text strong className="govTitle">Government Innovation Initiative</Text>
                  </div>
                  <Paragraph className="govText">
                    This platform is part of Dubai&apos;s Digital Economy Strategy 2033, positioning the emirate
                    as a global leader in blockchain innovation and digital asset adoption.
                  </Paragraph>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default TokenizationInfoSection;
