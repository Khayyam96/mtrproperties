"use client";

import { Col, Row, Typography } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Title, Text } = Typography;

const stats = [
  {
    title: "Years of Experience",
    value: "10+",
    icon: <ClockCircleOutlined />,
  },
  {
    title: "Employees",
    value: "1000+",
    icon: <TeamOutlined />,
  },
  {
    title: "Active Listing",
    value: "5000+",
    icon: <FileDoneOutlined />,
  },
  {
    title: "Deals Completed",
    value: "1000+",
    icon: <HomeOutlined />,
  },
];

export const StatsSection = () => {
  return (
    <div className="stats-section">
      <Row gutter={[24, 24]} align="middle" justify="space-between" className="stats-row">
        <Col xs={24} md={6}>
          <div className="stats-section--header">
            <Title level={3}>What we have completed</Title>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
          </div>
        </Col>

        <Col xs={24} md={18}>
          <Row gutter={[16, 16]} justify="space-between" className="stats-section--cards">
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div className="stats-card">
                  <div className="stats-card--top">
                    <span className="label">{stat.title}</span>
                    <span className="icon">{stat.icon}</span>
                  </div>
                  <div className="stats-card--value">{stat.value}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StatsSection;
