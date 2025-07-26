// ProCard.tsx
"use client";

import Image from "next/image";
import { Typography, Tag } from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  BuildOutlined,
  ExpandAltOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title } = Typography;

type TProps = {
  id: number;
  images: string[];
  name: string;
  price: string | number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  isReadyToMove?: boolean;
  isOffPlan?: boolean;
  slug?: string;
  onClick?: () => void;
};

export const ProCard: React.FC<TProps> = ({
  id,
  images,
  name,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  location,
  slug,
  onClick,
  isReadyToMove,
  isOffPlan,
}) => {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sliderRef.current?.slickPrev();
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="pro-card" onClick={handleCardClick}>
      <div className="pro-card__img">
        <Slider {...settings} ref={sliderRef}>
          {images.map((img, idx) => (
            <div key={idx} className="carousel-slide">
              <Image
                src={img}
                alt={`${name}-${idx}`}
                fill
                className="pro-card__img--image"
              />
            </div>
          ))}
        </Slider>

        <div className="pro-card__labels">
          {isReadyToMove && <Tag className="ready">Ready to Move</Tag>}
          {isOffPlan && <Tag className="plan">Off Plan</Tag>}
        </div>

        <button className="carousel-btn left" onClick={goPrev}>
          <ArrowLeftOutlined />
        </button>

        <button className="carousel-btn right" onClick={goNext}>
          <ArrowRightOutlined />
        </button>
      </div>

      <div className="pro-card__body">
        <div className="pro-card__price">
          <Title level={3}>AED {price}</Title>
          <Tag className="type">{type}</Tag>
        </div>

        <div className="pro-card__location">
          <EnvironmentOutlined />
          <span>{name}, {location}</span>
        </div>

        <div className="pro-card__meta">
          <span><HomeOutlined /> {bedrooms} Bedroom</span>
          <span><BuildOutlined /> {bathrooms} Bathroom</span>
          <span><ExpandAltOutlined /> {area} Sq.Ft.</span>
        </div>

        <div className="pro-card__actions">
          <button
            className="call"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "tel:+971XXXXXXXXX";
            }}
          >
            <PhoneOutlined /> Call Us
          </button>
          <button
            className="whatsapp"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://wa.me/971XXXXXXXXX", "_blank");
            }}
          >
            <WhatsAppOutlined /> Whatsapp
          </button>
        </div>
      </div>
    </div>
  );
};
