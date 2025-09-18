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
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import { LandProjectArea, LandProjectMedia, LandProjectTranslation } from "@/models/LatesProject.model";

const { Title } = Typography;

export type TProCard = {
  id: number;
  slug: string;
  utility_count: number,
  property_state: string,
  address: string;
  whatsappNumber: string;
  property_category: string,
  phoneNumber: string;
  bathroom_count: number;
  bedroom_count: number;
  sq_ft: string;
  price: string;
  currency: string;
  media: LandProjectMedia;
  areas: LandProjectArea[];
  translation: LandProjectTranslation;

};

export const ProCard: React.FC<TProCard> = ({
  address,
  bathroom_count,
  bedroom_count,
  property_state,
  property_category,
  sq_ft,
  price,
  currency,
  media,
  translation,
}) => {
  const sliderRef = useRef<Slider>(null);

  const goPrev: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickPrev();
  };

  const goNext: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickNext();
  };

 

  const formatPrice = (price: string | number) => {
    const num = typeof price === "string" ? parseInt(price) : price;
    if (num >= 1_000_000) {
      return `${num / 1_000_000}M`;
    } else if (num >= 100_000) {
      return `${num / 1_000}k`;
    } else {
      return num.toLocaleString();
    }
  };

  const settings = { dots: false, arrows: false, infinite: true, speed: 400, slidesToShow: 1, slidesToScroll: 1 };

  return (
    <div className="pro-card">
      <div className="pro-card__img">
        <Slider {...settings} ref={sliderRef}>
          {media?.gallery?.map((img, idx) => (
            <div key={idx} className="carousel-slide">
              <Image
                src={`https://api.dubaiyachts.com/uploads/properties/${img}`}
                alt={`${translation.title}-${idx}`}
                fill
                className="pro-card__img--image"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={idx === 0}
              />
            </div>
          ))}
        </Slider>

        <div className="pro-card__labels">
          {property_category && <Tag className="ready">{property_category}</Tag>}
          {property_state && <Tag className="plan">{property_state}</Tag>}
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
          <Title level={3} style={{margin: "0px"}}>{currency} {formatPrice(price)}</Title>
          {/* <Tag className="type">{property_type}</Tag> */}
        </div>

        <div className="pro-card__location">
          <EnvironmentOutlined />
          <span className="location_text">{address}</span>
        </div>

        <div className="pro-card__meta">
          <span className="meta-item">
            <Image src="/propertimg1.png" alt="Bedrooms" width={18} height={18} />
            {bedroom_count ? bedroom_count : 0}
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Bathrooms" width={18} height={18} />
            {bathroom_count ? bathroom_count : 0}
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Area" width={18} height={18} />
            {sq_ft} Sq.Ft.
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
