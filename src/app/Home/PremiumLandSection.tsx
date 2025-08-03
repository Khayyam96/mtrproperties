"use client";

import { Row, Col, Button } from "antd";
import { LandPropertyCard } from "../../components/Lib/LandPropertyCard/LandPropertyCard";


const landList = Array.from({ length: 8 }).map((_, i) => ({
  images: [
    "/cardimggg.png",
    "/cardimggg.png",
    "/cardimggg.png"
  ],
  price: "2,850,000",
  priceSqft: "335",
  title: "Premium Residential Plot, Dubai Hills, Dubai",
  location: "Premium Residential Plot, Dubai Hills, Dubai",
  utilities: 4,
  area: "8,500",
  badges: ["Residential", "Ready to Build"],
}));

export const PremiumLandSection = () => (
  <div className="premium-land-section">
    <h2 className="section-title">Premium Land Properties in UAE</h2>
    <p className="section-desc">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    </p>
    <div className="land-card-grid">
      <Row gutter={[24, 32]}>
        {landList.map((land, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <LandPropertyCard {...land} />
          </Col>
        ))}
      </Row>
    </div>
    <div className="land-section-footer">
      <Button size="large" className="view-more-btn" icon={
        <img src="/icons/land-list.svg" alt="" />
      }>
        View More Land
      </Button>
    </div>
  </div>
);
