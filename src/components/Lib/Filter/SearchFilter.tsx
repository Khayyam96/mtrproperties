"use client";

import { Select, Input, Button, Row, Col } from "antd";
import { useState } from "react";
import "./index.scss";
import { Container } from "../ProContainer/Container";

const { Option } = Select;

type FilterValues = {
  property_category: string;
  type: string;
  bedBath: string;
  price: string;
  more: string;
  location: string;
};

type Props = {
  onSearch: (values: FilterValues) => void;
};

export const SearchFilter: React.FC<Props> = ({ onSearch }) => {
  const [filters, setFilters] = useState<FilterValues>({
    property_category: "Buy",
    type: "Any",
    bedBath: "Any",
    price: "Any",
    more: "Any",
    location: "",
  });

  const handleChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="search-filter">
      <Container>
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={12} md={4}>
            <label className="label">Purpose</label>
            <Select value={filters.property_category} onChange={(val) => handleChange("property_category", val)} className="full-width">
              <Option value="Buy">Buy</Option>
              <Option value="Rent">Rent</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <label className="label">Property type</label>
            <Select value={filters.type} onChange={(val) => handleChange("type", val)} className="full-width">
              <Option value="Any">Any</Option>
              <Option value="Apartment">Apartment</Option>
              <Option value="Villa">Villa</Option>
              <Option value="Commercial">Commercial</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <label className="label">Bed and Bath</label>
            <Select value={filters.bedBath} onChange={(val) => handleChange("bedBath", val)} className="full-width">
              <Option value="Any">Any</Option>
              <Option value="1">1 Bed / 1 Bath</Option>
              <Option value="2">2 Bed / 2 Bath</Option>
              <Option value="3">3+ Bed / Bath</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <label className="label">Price</label>
            <Select value={filters.price} onChange={(val) => handleChange("price", val)} className="full-width">
              <Option value="Any">Any</Option>
              <Option value="Below 500K">Below 500K</Option>
              <Option value="500K - 1M">500K - 1M</Option>
              <Option value="1M+">1M+</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={4}>
            <label className="label">More Filter</label>
            <Select value={filters.more} onChange={(val) => handleChange("more", val)} className="full-width">
              <Option value="Any">Any</Option>
              <Option value="Furnished">Furnished</Option>
              <Option value="Unfurnished">Unfurnished</Option>
            </Select>
          </Col>

          <Col xs={24} sm={24} md={4} className="location-col">
            <label className="label">Search Location</label>
            <div className="location-search-wrapper">
              <Input
                placeholder="eg: john@email.com"
                value={filters.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="location-input"
              />
              <Button type="primary" className="find-btn" onClick={handleSearch}>
                Find
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchFilter;
