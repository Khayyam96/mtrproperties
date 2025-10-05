"use client";

import { FC, useMemo } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";
import { MostTrendingResponse, MostTrendingItem } from "@/models/MostTrending.model";

type TProps = {
  data: MostTrendingResponse;
  title?: string;
  subtitle?: string;
};

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties";

function buildImgUrl(file?: string | null) {
  if (!file) return "";
  if (/^https?:\/\//i.test(file)) return file;
  return `${MEDIA_BASE}/${file}`;
}

function formatPrice(value: string | number) {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "-";
  return new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(num);
}

function getSubtitle(item: MostTrendingItem) {
  return item?.area?.name ?? "";
}

export const TrendingProjectsSection: FC<TProps> = ({ data, title, subtitle }) => {
  const items = useMemo(() => data?.data ?? [], [data]);

  return (
    <section className="trending-projects-section">
      <div className="trending-projects-header">
        <h2>{title ?? "Most Trending Projects in Dubai"}</h2>
        {subtitle ? (
          <p>{subtitle}</p>
        ) : (
          <p />
        )}
      </div>

      <Row gutter={[24, 0]} className="trending-projects-row">
        {items.map((project) => {
          const bg = buildImgUrl(project.image_url);
          return (
            <Col xs={24} md={6} key={project.id}>
              <div
                className="project-card"
                style={bg ? { backgroundImage: `url(${bg})` } : undefined}
              >
                <div className="overlay" />

                <div className="badges">
                  {project.project_type ? (
                    <div className="badge">{project.project_type}</div>
                  ) : null}

                  <div className="price">From AED {formatPrice(project.price_from)}</div>
                </div>

                <div className="project-info">
                  <div className="title">{project.name}</div>

                  {getSubtitle(project) ? (
                    <div className="location">{getSubtitle(project)}</div>
                  ) : (
                    <div className="location">&nbsp;</div>
                  )}

                  <Link href={`/planpage/${project.slug}`} prefetch>
                    <Button className="view-more-btn" size="large">
                      View More <span className="arrow">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};
