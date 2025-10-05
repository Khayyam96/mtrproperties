"use client";

import { FC } from "react";
import { Row, Col, Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { LandPropertiesResponse } from "@/models/LandProperties.model";
import { LandPropertyCard } from "@/components/Lib/LandPropertyCard/LandPropertyCard";

type TProps = {
  data: LandPropertiesResponse;
   title?: string;
  subtitle?: string;
};

export const PremiumLandSection: FC<TProps> = ({ data , title, subtitle}) => {
  return (
    <div className="premium-land-section">
      <h2 className="section-title">{title ?? ""}</h2>
       {subtitle ? <p>{subtitle}</p>: null}

      <div className="land-card-grid">
        <Row gutter={[24, 32]}>
          {data?.data?.map((land) => (
            <Col xs={24} sm={12} md={8} lg={6} key={land.id}>
              <LandPropertyCard land={land} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="view-more-wrapper">
        <Button type="primary" size="large" icon={<AppstoreOutlined />}>
          View More
        </Button>
      </div>
    </div>
  );
};

export default PremiumLandSection;
