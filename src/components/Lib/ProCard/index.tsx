"use client";

import Image from "next/image";
import { Typography, Tag } from "antd";
import {
  EnvironmentOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Slider, { Settings } from "react-slick";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title } = Typography;

export type TProCard = {
  slug: string;
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
  onClick?: () => void;
};

export const ProCard: React.FC<TProCard> = ({
  slug,
  images,
  name,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  location,
  onClick,
  isReadyToMove,
  isOffPlan,
}) => {
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) return onClick();
    router.push(`/properties/${slug}`);
  };

  const goPrev: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickPrev();
  };

  const goNext: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickNext();
  };

 

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const displayPrice = typeof price === "number" ? price.toLocaleString() : price;
  const imgs = Array.isArray(images) && images.length ? images : ["/placeholder.jpg"];

  return (
    <div className="pro-card" onClick={handleCardClick}>
      <div className="pro-card__img">
        <Slider {...settings} ref={sliderRef}>
          {imgs.map((img, idx) => (
            <div key={idx} className="carousel-slide">
              <div style={{ position: "relative", width: "100%", paddingTop: "66.6667%" }}>
                <Image
                  src={img}
                  alt={`${name}-${idx}`}
                  fill
                  className="pro-card__img--image"
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
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
          <Title level={3}>AED {displayPrice}</Title>
          <Tag className="type">{type}</Tag>
        </div>

        <div className="pro-card__location">
          <EnvironmentOutlined />
          <span className="location_text">{location}</span>
        </div>

        <div className="pro-card__meta">
          <span className="meta-item">
            <Image src="/propertimg1.png" alt="Bedrooms" width={18} height={18} />
            {bedrooms}
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Bathrooms" width={18} height={18} />
            {bathrooms}
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Area" width={18} height={18} />
            {area} Sq.Ft.
          </span>
        </div>

        <div className="pro-card__actions">
          <button
            className="call"
            onClick={(e) => {
              e.stopPropagation();
              alert("Call functionality is not implemented yet.");
            }}
          >
            <PhoneOutlined /> Call Us
          </button>
          <button className="whatsapp" >
            <WhatsAppOutlined /> Whatsapp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProCard;
