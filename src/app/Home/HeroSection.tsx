"use client";

import { Typography, Input, Button, Select, Space, Row, Col } from "antd";
import Image from "next/image";
import { useState } from "react";
import FilterTabs from "../../components/Lib/Tabs/FilterTabs";

const { Title, Text } = Typography;
const { Option } = Select;

const tabs = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
];

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [activeTag, setActiveTag] = useState("all");


  return (
    <section className="hero">
      <Image
        src="/hero.png"
        alt="Luxury villa with pool"
        fill
        priority
        className="hero__bg"
      />

      <div className="hero__overlay">
        <div className="hero__top">
          <Title level={2} className="hero__title">
            #1 Real Estate Company in UAE
          </Title>
          <p className="hero__subtitle">
            Our Specialist Agents will help you choose the right property
          </p>

          <FilterTabs activeKey={activeTab} onChange={setActiveTab} tabs={tabs} />
        </div>

        <div className="hero__filter-box">
          <Row gutter={[16, 16]} className="hero__filter-row-1" align="middle">
            <Col xs={24} md={8}>
              <Space className="hero__tags" size="middle">
                <Button
                  className={activeTag === "all" ? "active" : ""}
                  onClick={() => setActiveTag("all")}
                >
                  All
                </Button>
                <Button
                  className={activeTag === "ready" ? "active" : ""}
                  onClick={() => setActiveTag("ready")}
                >
                  Ready to Move
                </Button>
                <Button
                  className={activeTag === "off" ? "active" : ""}
                  onClick={() => setActiveTag("off")}
                >
                  Off Plans
                </Button>
              </Space>
            </Col>
            <Col xs={24} md={16}>
              <Input
                placeholder="Choose Area or City"
                className="w-full"
                prefix={
                  <Image
                    src="/location-marker.png"
                    alt="location icon"
                    width={24}
                    height={24}
                  />
                }
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="hero__form">
            <Col xs={12} md={5}>
              <Text className="form-label">Property Category</Text>
              <Select
                defaultValue="residential"
                className="w-full"
                suffixIcon={
                  <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                }
              >
                <Option value="residential">Residential</Option>
                <Option value="commercial">Commercial</Option>
              </Select>
            </Col>

            <Col xs={12} md={5}>
              <Text className="form-label">Property type</Text>
              <Select
                defaultValue="Any"
                className="w-full"
                suffixIcon={
                  <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                }
              >
                <Option value="any">Any</Option>
                <Option value="villa">Villa</Option>
              </Select>
            </Col>

            <Col xs={12} md={5}>
              <Text className="form-label">Property Details</Text>
              <Select
                defaultValue="Bed & Bath"
                className="w-full"
                suffixIcon={
                  <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                }
              >
                <Option value="bedbath">Bed & Bath</Option>
              </Select>
            </Col>

            <Col xs={12} md={5}>
              <Text className="form-label">Price</Text>
              <Select
                defaultValue="Price (AED)"
                className="w-full"
                suffixIcon={
                  <Image src="/blackup.png" alt="dropdown" width={16} height={16} />
                }
              >
                <Option value="low">0 - 500k</Option>
                <Option value="mid">500k - 1M</Option>
                <Option value="high">1M+</Option>
              </Select>
            </Col>

            <Col xs={24} md={4}>
              <Button type="primary" className="search-btn" block >
                Search Now
                <Image src="/buttonicon.png" alt="dropdown" width={16} height={16} />
              </Button>
            </Col>
          </Row>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
