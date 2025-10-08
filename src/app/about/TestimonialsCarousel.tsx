"use client";

import { Typography, Empty } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "../../components/Lib/ProContainer/Container";
import type { TestimonialsResponse } from "@/models/Testimonials.model";
import type { Settings, ResponsiveObject } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title, Text } = Typography;

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties/";

function buildImgUrl(name?: string | null) {
  if (!name) return "/placeholder.png";
  if (/^https?:\/\//i.test(name)) return name;
  return `${MEDIA_BASE}${name}`.replace(/([^:]\/)\/+/g, "$1");
}

type Props = {
  data: TestimonialsResponse;
};

const sliderResponsive: ResponsiveObject[] = [
  { breakpoint: 992, settings: { slidesToShow: 2 } },
  { breakpoint: 576, settings: { slidesToShow: 1 } },
];

export const TestimonialsCarousel: React.FC<Props> = ({ data }) => {
  const sliderRef = useRef<Slider>(null);
  const items = data?.data ?? [];

  const settings: Settings = {
    dots: false,
    infinite: items.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: sliderResponsive,
  };

  return (
    <div className="testimonials-section">
      <Container>
        <div className="header-row">
          <div className="title-container">
            <Title level={3} className="title">Testimonials</Title>
          </div>

          <div className="actions">
            <div className="arrows">
              <Image
                src="/previcon.png"
                alt="Previous"
                width={24}
                height={24}
                onClick={() => sliderRef.current?.slickPrev()}
                className="arrow-icon"
              />
              <Image
                src="/nexticon.png"
                alt="Next"
                width={24}
                height={24}
                onClick={() => sliderRef.current?.slickNext()}
                className="arrow-icon"
              />
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No testimonials" />
        ) : (
          <div className="slider-wrapper">
            <Slider ref={sliderRef} {...settings}>
              {items.map((it) => (
                <div key={it.id} className="testimonial-card">
                  <Image
                    src={buildImgUrl(it.image_url)}
                    alt={it.name}
                    width={60}
                    height={60}
                    className="avatar"
                  />
                  <div>
                    <Text className="name">{it.name}</Text>
                  </div>
                  <div>
                    <Text className="title-text">{it.position?.name ?? ""}</Text>
                  </div>
                  <div>
                    <Text className="desc">{it.content ?? ""}</Text>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TestimonialsCarousel;
