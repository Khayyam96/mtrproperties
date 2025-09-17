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
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import { LandPropertyArea, LandPropertyMedia, LandPropertyTranslation } from "@/models/LandProperties.model";

const { Title } = Typography;

export type TProCard = {
  id: number;
  slug: string;
  utility_count: number,
  build_status: string,
  address: string;
  whatsappNumber: string;
  purpose: string,
  phoneNumber: string;
  sq_ft: string;
  price: string;
  currency: string;
  media: LandPropertyMedia;
  areas: LandPropertyArea[];
  translation: LandPropertyTranslation;

};

export const LandPropertyCard: React.FC<TProCard> = ({
  address,
  build_status,
  purpose,
  utility_count,
  sq_ft,
  price,
  currency,
  media,
  translation,
}) => {
  const sliderRef = useRef<Slider>(null);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sliderRef.current?.slickPrev();
  };

  const goNext = (e: React.MouseEvent) => {
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
      <div className="tags">
        <div className="left-tag">{purpose}</div>
        <div className="right-tag">{build_status}</div>
      </div>

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
          <Tag className="type">{currency} {sq_ft}</Tag>
        </div>

        <div className="pro-card__location">
          <EnvironmentOutlined />
          <span>{address}</span>
        </div>

        <div className="pro-card__meta">
          <span><Image src="/ic1.png" width={13} height={13} alt="" /> {utility_count} Utilities</span>
          <span><Image src="/ic2.png" width={13} height={13} alt="" /> {sq_ft} sq ft</span>
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
