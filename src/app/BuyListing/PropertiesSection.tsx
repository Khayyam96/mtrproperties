"use client";

import { useState } from "react";
import { Row, Col, Pagination } from "antd";
import { ProCard, TProCard } from "@/components/Lib/ProCard";
import "./index.scss";

const mockData: TProCard[] = Array.from({ length: 36 }).map(() => ({
  images: [
    "/cardimg.png",
    "/cardimg2.png",
    "/cardimg3.png"
  ],
  name: "Santa Fe Residences",
  price: 3250000,
  type: "Apartment",
  bedrooms: 2,
  bathrooms: 3,
  area: 1600,
  location: "Palm Jumeirah, Dubai",
  isReadyToMove: true,
  isOffPlan: true
}));

const pageSize = 12;

export const PropertiesSection = () => {
  const [current, setCurrent] = useState(1);

  const paginatedData = mockData.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <div className="properties-section">
      <Row gutter={[24, 24]}>
        {paginatedData.map((item, idx) => (
          <Col xs={24} sm={12} md={8} key={current + "-" + idx}>
            <ProCard {...item} />
          </Col>
        ))}
      </Row>

      <div className="pagination-wrapper">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={mockData.length}
          onChange={setCurrent}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "prev") {
              return <button className="pagination-btn prev">Previous</button>;
            }
            if (type === "next") {
              return <button className="pagination-btn next">Next</button>;
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default PropertiesSection;
