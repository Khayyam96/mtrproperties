"use client";

import React, { FC, useRef } from "react";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import { RightOutlined } from "@ant-design/icons";
import "./index.scss";
import type SliderType from "react-slick";
import { LastBlogResponse } from "@/models/LastBlog.model";

const { Title, Text } = Typography;

type TProps = { data: LastBlogResponse };

const IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties/";

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? dateStr
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export const LatestBlogSection: FC<TProps> = ({ data }) => {
  const sliderRef = useRef<SliderType | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1.1, slidesToScroll: 1 } },
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
            <button
              type="button"
              className="nav left"
              aria-label="Previous"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <Image src="/previcon.png" alt="Previous" width={18} height={18} />
            </button>

            <button
              type="button"
              className="nav right"
              aria-label="Next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <Image src="/nexticon.png" alt="Next" width={18} height={18} />
            </button>
          </div>
        </div>

        <div className="slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {data?.data?.map((item) => {
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
                <div key={item.id} className="blog-slide">
                  <article className="blog-card">
                    <div className="image">
                      <Image
                        src={imagePath}
                        alt={title}
                        width={400}
                        height={310}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ width: "100%", height: 310, objectFit: "cover" }}
                      />
                    </div>

                    <div className="content">
                      <Title level={5} ellipsis={{ rows: 2 }}>
                        {title}
                      </Title>

                      <div className="meta">
                        <Text type="secondary">{dateStr}</Text>
                        <span className="dot" aria-hidden>
                          •
                        </span>
                        <Text type="secondary">{authorName}</Text>
                      </div>

                      {hasSlug ? (
                        <Link href={href} className="read-more">
                          Read more <RightOutlined />
                        </Link>
                      ) : (
                        <span className="read-more disabled" aria-disabled="true" title="Slug yoxdur">
                          Read more <Image src="/nexticon.png" alt="Next" width={16} height={16} />
                        </span>
                      )}
                    </div>
                  </article>
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
