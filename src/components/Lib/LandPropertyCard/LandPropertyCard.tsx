"use client";

import { FC, useState } from "react";
import { Button, Tag } from "antd";
import Image from "next/image";
import "./index.scss";

type Props = {
  images: string[];
  price: string;
  priceSqft: string;
  title: string;
  location: string;
  utilities: number;
  area: string;
  badges: string[]; 
};

export const LandPropertyCard: FC<Props> = ({
  images,
  price,
  priceSqft,
  title,
  location,
  utilities,
  area,
  badges,
}) => {
  const [imgIdx, setImgIdx] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="lp-card">
      <div className="lp-card__imgbox">
        <Image
          src={images[imgIdx]}
          alt={title}
          fill
          className="lp-card__img"
          priority
          sizes="(max-width: 600px) 100vw, 400px"
        />
        <button className="carousel-btn prev" onClick={handlePrev}>
          <img src="/icons/chevron-left.svg" alt="prev" />
        </button>
        <button className="carousel-btn next" onClick={handleNext}>
          <img src="/icons/chevron-right.svg" alt="next" />
        </button>
        <div className="lp-card__badges">
          <Tag color="#8837E0" className="badge">{badges[0]}</Tag>
          <Tag color="#41B883" className="badge">{badges[1]}</Tag>
        </div>
      </div>
      <div className="lp-card__body">
        <div className="lp-card__row">
          <span className="price">AED {price}</span>
          <span className="sqft-tag">AED {priceSqft}/sq ft</span>
        </div>
        <div className="lp-card__loc-row">
          <img src="/icons/location.svg" alt="" className="icon" />
          <span className="location">{location}</span>
        </div>
        <div className="lp-card__desc">{title}</div>
        <div className="lp-card__info-row">
          <span>
            <img src="/icons/flash.svg" alt="" className="icon" />
            {utilities} Utilities
          </span>
          <span>
            <img src="/icons/area.svg" alt="" className="icon" />
            {area} sq ft
          </span>
        </div>
        <div className="lp-card__actions">
          <Button
            className="call-btn"
            icon={<img src="/icons/call-outline.svg" alt="Call" />}
            size="large"
            block
          >
            Call Us
          </Button>
          <Button
            className="whatsapp-btn"
            icon={<img src="/icons/whatsapp-outline.svg" alt="Whatsapp" />}
            size="large"
            block
          >
            Whatsapp
          </Button>
        </div>
      </div>
    </div>
  );
};
