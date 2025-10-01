"use client";

import { FC, useMemo } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";
import { MostTrendingResponse, MostTrendingItem } from "@/models/MostTrending.model";

type TProps = {
  data: MostTrendingResponse;
};

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties";

function buildImgUrl(file?: string | null) {
  if (!file) return "";
  if (/^https?:\/\//i.test(file)) return file;
  // API artıq yalnız fayl adını qaytarır → bazaya qoşuruq
  return `${MEDIA_BASE}/${file}`;
}

function formatPrice(value: string | number) {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "-";
  return new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(num);
}

function getSubtitle(item: MostTrendingItem) {
  // Köhnə "translations[0].subtitle" əvəzinə area.name göstəririk
  return item?.area?.name ?? "";
}

export const TrendingProjectsSection: FC<TProps> = ({ data }) => {
  const items = useMemo(() => data?.data ?? [], [data]);

  return (
    <section className="trending-projects-section">
      <div className="trending-projects-header">
        <h2>Most Trending Projects in Dubai</h2>
        <p>
          scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis
          aliquam faucibus purus. Posuere urna nec tincidunt praesent
        </p>
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
                  {/* Köhnə property_state yoxdur → project_type göstəririk */}
                  {project.project_type ? (
                    <div className="badge">{project.project_type}</div>
                  ) : null}

                  {/* Köhnə "price" əvəzinə "price_from" */}
                  <div className="price">From AED {formatPrice(project.price_from)}</div>
                </div>

                <div className="project-info">
                  {/* Köhnə translations[0].title əvəzinə name */}
                  <div className="title">{project.name}</div>

                  {/* Köhnə subtitle əvəzinə area.name */}
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
