"use client";

import { Col, Row, Typography } from "antd";
import Image from "next/image";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

const stats = [
  {
    title: "Years of Experience",
    value: "10+",
    icon: "/clock.png",
  },
  {
    title: "Employees",
    value: "1000+",
    icon: "/ppp.png",
  },
  {
    title: "Active Listing",
    value: "5000+",
    icon: "/ddd.png",
  },
  {
    title: "Deals Completed",
    value: "1000+",
    icon: "/eee.png",
  },
];

export const StatsSection = () => {
  return (
    <div className="stats-section">
      <Container>
        <Row gutter={[24, 24]} align="middle" justify="space-between" className="stats-row">
          <Col xs={24} md={8}>
            <div className="stats-section--header">
              <Title level={3}>What we have completed</Title>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Text>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Row gutter={[16, 16]} justify="space-between" className="stats-section--cards">
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <div className="stats-card">
                    <div className="stats-card--top">
                      <span className="label">{stat.title}</span>
                      <span className="icon">
                        <Image
                          src={stat.icon}
                          alt={stat.title}
                          width={38}
                          height={38}
                          style={{ objectFit: "contain" }}
                        />
                      </span>
                    </div>
                    <div className="stats-card--value">{stat.value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatsSection;
