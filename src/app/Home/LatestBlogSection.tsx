"use client";

import React, { FC, useMemo, useRef } from "react";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import { RightOutlined } from "@ant-design/icons";
import type { LastBlogListResponse } from "@/models/LastBlog.mode";
import "./index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Title, Text } = Typography;

type TProps = { data: LastBlogListResponse };

interface SlickSliderRef {
  slickNext?: () => void;
  slickPrev?: () => void;
  slickGoTo?: (index: number) => void;
}

const BLOG_IMAGE_BASE =
  process.env.NEXT_PUBLIC_BLOG_IMAGE_BASE ?? "https://api.dubaiyachts.com/uploads/properties/";

function resolveImage(src?: string | null): string {
  if (!src) return "/placeholder.png";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return `${BLOG_IMAGE_BASE}${src}`;
  return `${BLOG_IMAGE_BASE}/${src}`;
}

function formatDate(iso?: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(iso);
  }
}

export const LatestBlogSection: FC<TProps> = ({ data }) => {
  // use a typed ref for the slider methods we rely on
  const sliderRef = useRef<SlickSliderRef | null>(null);
  const items = useMemo(() => data ?? [], [data]);

  const slidesToShow = 3;
  const settings: Settings = {
    dots: false,
    infinite: items.length > slidesToShow,
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
            {items.map((item) => {
              const img = resolveImage(item.mainImage);
              const dateStr = formatDate(item.publishedAt);
              const hasSlug = Boolean(item.slug && item.slug.trim());
              const href = hasSlug ? `/blog/${encodeURIComponent(item.slug)}` : "/blog";
              const title = item.title || "Untitled";

              return (
                <div key={item.id} className="blog-card">
                  <div className="image">
                    <Image
                      src={img}
                      alt={title}
                      width={400}
                      height={310}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: "310px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="content">
                    <Title level={5}>{title}</Title>
                    <div className="meta">
                      <Text>{dateStr}</Text>
                      <span style={{ margin: "0 8px" }} />
                      <Text>{item.authorName ?? "—"}</Text>
                    </div>

                    {hasSlug ? (
                      <Link href={href} className="read-more">
                        Read more <RightOutlined />
                      </Link>
                    ) : (
                      <span className="read-more disabled" aria-disabled="true" title="Slug yoxdur">
                        Read more <RightOutlined />
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
