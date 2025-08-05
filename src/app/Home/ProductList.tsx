"use client";

import { useState } from "react";
import { Row, Col, Button, Typography } from "antd";
import { ProCard } from "@/components/Lib/ProCard";
import { AppstoreOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

const properties = [
  {
    id: 1,
    images: ["/cardimg.png", "/cardimg.png", "/cardimg.png"],
    name: "Santa Fe Residences",
    price: 3_250_000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 3,
    area: 1600,
    location: "Palm Jumeirah, Dubai",
    isReadyToMove: true,
    isOffPlan: true,
  },
  {
    id: 2,
    images: ["/cardimg.png", "/cardimg.png", "/cardimg.png"],
    name: "Marina Sky Tower",
    price: 2_800_000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 4,
    area: 2100,
    location: "Dubai Marina, Dubai",
    isReadyToMove: false,
    isOffPlan: true,
  },
  {
    id: 3,
    images: ["/cardimg.png", "/cardimg.png", "/cardimg.png"],
    name: "Emerald Villa",
    price: 6_900_000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 4800,
    location: "Al Barari, Dubai",
    isReadyToMove: true,
    isOffPlan: false,
    isRental: true,
  },
  {
    id: 4,
    images: ["/cardimg.png", "/cardimg.png", "/cardimg.png"],
    name: "Sunrise Townhouse",
    price: 1_950_000,
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    location: "Dubai Hills, Dubai",
    isReadyToMove: true,
    isOffPlan: false,
    isRental: true,
  },
];

const tabItems = [
  { key: "off", label: "Off Plans" },
  { key: "ready", label: "Ready to move" },
  { key: "rent", label: "Rental" },
];

export const ProductSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState("off");

  const filtered =
    activeKey === "off"
      ? properties.filter((p) => p.isOffPlan)
      : activeKey === "ready"
        ? properties.filter((p) => p.isReadyToMove)
        : properties.filter((p) => p.isRental);

  return (
    <section className="product__list">
      <Container>
        <div className="header text-center">
          <Title className="title" level={2}>
            New Off Plan Projects In Dubai
          </Title>
          <Text className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </div>

        {/* <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          className="product__tabs"
          items={tabItems}
        /> */}

        <Row gutter={[24, 32]}>
          {filtered.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <ProCard {...p} />
            </Col>
          ))}
        </Row>

        <div className="view-more-wrapper">
          <Button
            type="primary"
            size="large"
            icon={<AppstoreOutlined />}
            onClick={() => alert("Load more…")}
          >
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;
