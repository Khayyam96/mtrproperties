"use client";

import { Row, Col, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import FilterTabs from "../../components/Lib/Tabs/FilterTabs"; 
import "./index.scss";

const { Title, Text } = Typography;

const tabData = {
  sale: {
    PopularSearches: [
      "Properties for sale UAE",
      "Villa for rent in UAE",
      "Appartment for rent in UAE",
      "Properties for rent Dubai",
      "Commercial properties for rent Dubai",
    ],
    PopularAreas: [
      "Properties for sale Dubai",
      "Villa for rent in UAE",
      "Apartment for rent in UAE",
      "Properties for rent Dubai",
      "Commercial properties for rent Dubai",
    ],
    TrendingSearches: [
      "Properties for sale UAE",
      "Villa for rent in UAE",
      "Appartment for rent in UAE",
      "Properties for rent Dubai",
      "Properties for rent Dubai",
    ],
    TrendingAreas: [
      "Properties for sale Dubai, Marina",
      "Villa for rent in UAE",
      "Appartment for rent in UAE",
      "Properties for rent Dubai",
      "Commercial properties for rent Dubai",
    ],
  },
  rent: {
    PopularSearches: [
      "Rent properties in UAE",
      "Affordable villas UAE",
      "1BHK Apartments for rent",
      "Luxury properties in Dubai",
      "Office spaces for rent",
    ],
    PopularAreas: [
      "Rent in Downtown Dubai",
      "Jumeirah properties",
      "Apartments in Marina",
      "Rent in Business Bay",
      "Commercial rent in UAE",
    ],
    TrendingSearches: [
      "Hot rent deals UAE",
      "Trending rentals Dubai",
      "Best apartment listings",
      "UAE villas for rent",
      "Family homes for rent",
    ],
    TrendingAreas: [
      "Dubai Marina, Rent",
      "Downtown Dubai Rentals",
      "Sharjah Rent Areas",
      "Ajman Flats for Rent",
      "Abu Dhabi Commercial Rent",
    ],
  },
};

export const SearchTrendsSection = () => {
  const [activeKey, setActiveKey] = useState("sale");
  const data = tabData[activeKey as "sale" | "rent"];

  return (
    <section className="search-trends-section">
      <div className="text-center header">
        <Title level={3}>Propular and Trending Searches in UAE</Title>
        <FilterTabs
          activeKey={activeKey}
          onChange={setActiveKey}
          tabs={[
            { key: "sale", label: "Sale" },
            { key: "rent", label: "Rent" },
          ]}
        />
      </div>

      <Row gutter={[24, 24]} className="list-columns">
        <Col xs={24} md={6}>
          <div className="list-block">
            <Title level={5}>Popular Searches</Title>
            {data.PopularSearches.map((item, i) => (
              <Text key={i} className="list-item">{item}</Text>
            ))}
          </div>
        </Col>

        <Col xs={24} md={6}>
          <div className="list-block">
            <Title level={5}>Popular Areas</Title>
            {data.PopularAreas.map((item, i) => (
              <Text key={i} className="list-item">{item}</Text>
            ))}
          </div>
        </Col>

        <Col xs={24} md={6}>
          <div className="list-block">
            <Title level={5}>Trending Searches</Title>
            {data.TrendingSearches.map((item, i) => (
              <Text key={i} className="list-item">{item}</Text>
            ))}
          </div>
        </Col>

        <Col xs={24} md={6}>
          <div className="list-block trending-right">
            <Title level={5}>Trending Areas</Title>
            {data.TrendingAreas.map((item, i) => (
              <Text key={i} className="list-item">{item}</Text>
            ))}
            <div className="view-more">
              <a href="#">
                View More <DownOutlined />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default SearchTrendsSection;
