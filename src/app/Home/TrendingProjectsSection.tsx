// src/components/TrendingProjectsSection.tsx
"use client";

import { FC } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";
import { MostTrendingResponse } from "@/models/MostTrending.model";

type TProps = {
  data: MostTrendingResponse;
};

export const TrendingProjectsSection: FC<TProps> = ({ data }) => {
  console.log(data, "trending data")
  return (
    <div className="trending-projects-section">
      <div className="trending-projects-header">
        <h2>Most Trending Projects in Dubai</h2>
        <p>
          scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis
          aliquam faucibus purus. Posuere urna nec tincidunt praesent
        </p>
      </div>

      <Row gutter={[24, 0]} className="trending-projects-row">
        {data.data.map((project, idx) => (
          <Col xs={24} md={6} key={idx}>
            <div
              className="project-card"
              style={{ backgroundImage: `url(https://api.dubaiyachts.com/uploads/properties/${project.media.gallery[0]})` }}
            >
              <div className="overlay" />
              <div className="badges">
                {project.property_state ? <div className="badge">{project.property_state}</div> : "" }
                
                <div className="price">{project.price}</div>
              </div>

              <div className="project-info">
                <div className="title">{project.translations[0].title}</div>
                <div className="location">{project.translations[0].subtitle}</div>

                <Link href={`/planpage/${project.slug}`} prefetch>
                  <Button className="view-more-btn" size="large">
                    View More <span className="arrow">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
