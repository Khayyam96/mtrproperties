"use client";

import { Row, Col, Select, Input, Button } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container"; // öz yoluna uyğun dəyiş


const { Option } = Select;

export const PropertyFilter = () => {
  return (
    <section className="property-filter-section">
      <Container>
        <Row justify="center">
          <Col xs={24} md={16} lg={16}>
            <div className="property-filter">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={6}>
                  <label className="filter-label">Developer</label>
                  <Select defaultValue="Any" style={{ width: "100%" }}>
                    <Option value="Any">Any</Option>
                    <Option value="Emaar">Emaar</Option>
                    <Option value="Damac">Damac</Option>
                  </Select>
                </Col>
                <Col xs={24} md={6}>
                  <label className="filter-label">Property Type</label>
                  <Select defaultValue="Any" style={{ width: "100%" }}>
                    <Option value="Any">Any</Option>
                    <Option value="Apartment">Apartment</Option>
                    <Option value="Villa">Villa</Option>
                  </Select>
                </Col>
                <Col xs={24} md={8}>
                  <label className="filter-label">Search Location</label>
                  <Input placeholder="Enter the location" />
                </Col>
                <Col xs={24} md={4}>
                  <Button type="primary" className="filter-btn">
                    Filter Now
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertyFilter;
