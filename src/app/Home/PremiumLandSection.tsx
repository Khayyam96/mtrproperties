"use client";

import { Row, Col, Button } from "antd";
import { LandPropertyCard } from "../../components/Lib/LandPropertyCard/LandPropertyCard";
import SpeakToExpertSection from "@/components/Lib/SpeakToExpertSection/SpeakToExpertSection";
import { AppstoreOutlined } from "@ant-design/icons";
import { FC } from "react";
import { LandPropertiesResponse } from "@/models/LandProperties.model";


type TProps = {
  data: LandPropertiesResponse; 
};

export const PremiumLandSection: FC<TProps> = ({ data }) => {
  console.log(data, "datadatadatadata")
  return (
  <div className="premium-land-section">
    <h2 className="section-title">Premium Land Properties in UAE</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
    </p>

    <div className="land-card-grid">
      <Row gutter={[24, 32]}>
        {data.data.map((land, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <LandPropertyCard {...land} /> 
          </Col>
        ))}
      </Row>
    </div>

    <div className="view-more-wrapper">
      <Button type="primary" size="large" icon={<AppstoreOutlined />}>
        View More
      </Button>
    </div>

    <Row justify="center" style={{ marginTop: 30 }}>
      <Col xs={24} md={20} lg={20} style={{ display: "flex", justifyContent: "center" }}>
        <SpeakToExpertSection />
      </Col>
    </Row>
  </div>
)
}

export default PremiumLandSection;
