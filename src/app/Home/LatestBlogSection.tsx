"use client";

import React, { FC, useRef } from "react";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import { RightOutlined } from "@ant-design/icons";
import "./index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LastBlogResponse } from "@/models/LastBlog.mode";

const { Title, Text } = Typography;

interface SlickSliderRef {
  slickNext?: () => void;
  slickPrev?: () => void;
  slickGoTo?: (index: number) => void;
}

type TProps = {
  data: LastBlogResponse;
};

const IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties/";

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    // Asia/Baku timezone not directly applied here; toLocaleDateString will use user's environment timezone.
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export const LatestBlogSection: FC<TProps> = ({ data }) => {
  const sliderRef = useRef<SlickSliderRef | null>(null);

  const slidesToShow = 3;
  const settings: Settings = {
    dots: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.01 } },
    ],
  };

  return (
    <section className="latest-blog-section">
      <Container>
        <div className="blog-header">
          <div className="left">
            <Title level={3}>Latest Blog</Title>
            <Link className="see-all" href="/blog">
              See all <RightOutlined />
            </Link>
          </div>
          <div className="slider-nav">
            <span
              className="nav left"
              role="button"
              tabIndex={0}
              onClick={() => sliderRef.current?.slickPrev?.()}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && sliderRef.current?.slickPrev?.()}
            >
              <Image src="/previcon.png" alt="Previous" width={18} height={18} />
            </span>

            <span
              className="nav right"
              role="button"
              tabIndex={0}
              onClick={() => sliderRef.current?.slickNext?.()}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && sliderRef.current?.slickNext?.()}
            >
              <Image src="/nexticon.png" alt="Next" width={18} height={18} />
            </span>
          </div>
        </div>

        <div className="slider-wrapper">
          <Slider
            ref={(instance) => {
              sliderRef.current = instance as unknown as SlickSliderRef | null;
            }}
            {...settings}
          >
            {data.data.map((item) => {
              const imagePath = item.main_image ? `${IMAGE_BASE}${item.main_image}` : "/placeholder.png";
              const title =
                item.translations?.[0]?.title ??
                item.translations?.[0]?.subtitle ??
                item.category?.name_EN ??
                "Blog";

              const dateStr = formatDate(item.created_at);
              const authorName = item.author_name ?? "—";
              const hasSlug = Boolean(item.slug);
              const href = hasSlug ? `/blog/${item.slug}` : "#";

              return (
                <div key={item.id} className="blog-card">
                  <div className="image">
                    <Image
                      src={imagePath}
                      alt={title}
                      width={400}
                      height={310}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: "310px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="content">
                    <Title level={5} ellipsis={{ rows: 2 }}>
                      {title}
                    </Title>

                    <div className="meta" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Text type="secondary">{dateStr}</Text>
                      <span style={{ margin: "0 6px" }} aria-hidden>
                        •
                      </span>
                      <Text type="secondary">{authorName}</Text>
                    </div>

                    {hasSlug ? (
                      <Link href={href} className="read-more">
                        Read more <RightOutlined />
                      </Link>
                    ) : (
                      <span
                        className="read-more disabled"
                        aria-disabled="true"
                        title="Slug yoxdur"
                        style={{ opacity: 0.5, cursor: "not-allowed" }}
                      >
                        Read more                        
                        <Image src="/nexticon.png" alt="Next" width={16} height={16} style={{ marginLeft: 4 }} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default LatestBlogSection;
