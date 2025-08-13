"use client";

import { useState, useMemo } from "react";
import { Row, Col, Pagination } from "antd";
import { ProCard } from "@/components/Lib/ProCard";
import "./index.scss";
import { Container } from "@/components/Lib/ProContainer/Container";
import { properties } from "@/data/properties";

const pageSize = 12;

export const PropertiesSection = () => {
  const [current, setCurrent] = useState(1);

  const paginatedData = useMemo(
    () => properties.slice((current - 1) * pageSize, current * pageSize),
    [current]
  );

  return (
    <div className="properties-section">
      <Container>
        <Row gutter={[24, 24]}>
          {paginatedData.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <ProCard
                slug={item.slug}
                images={item.images}
                name={item.name}
                price={item.price}
                type={item.type}
                bedrooms={item.bedrooms}
                bathrooms={item.bathrooms}
                area={item.area}
                location={item.location}
                isReadyToMove={!!item.isReadyToMove}
                isOffPlan={!!item.isOffPlan}
              />
            </Col>
          ))}
        </Row>

        <div className="pagination-wrapper">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={properties.length}
            onChange={(page) => setCurrent(page)}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => {
              if (type === "prev") return <button className="pagination-btn prev">Previous</button>;
              if (type === "next") return <button className="pagination-btn next">Next</button>;
              return originalElement;
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default PropertiesSection;
