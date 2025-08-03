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
          <Image src="/icons/chevron-left.svg" alt="prev" width={24} height={24} />
        </button>
        <button className="carousel-btn next" onClick={handleNext}>
          <Image src="/icons/chevron-right.svg" alt="next" width={24} height={24} />
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
          <Image src="/icons/location.svg" alt="Location" className="icon" width={16} height={16} />
          <span className="location">{location}</span>
        </div>
        <div className="lp-card__desc">{title}</div>
        <div className="lp-card__info-row">
          <span>
            <Image src="/icons/flash.svg" alt="Utilities" className="icon" width={16} height={16} />
            {utilities} Utilities
          </span>
          <span>
            <Image src="/icons/area.svg" alt="Area" className="icon" width={16} height={16} />
            {area} sq ft
          </span>
        </div>
        <div className="lp-card__actions">
          <Button
            className="call-btn"
            icon={
              <Image
                src="/icons/call-outline.svg"
                alt="Call"
                width={20}
                height={20}
                style={{ display: "inline-block" }}
              />
            }
            size="large"
            block
          >
            Call Us
          </Button>
          <Button
            className="whatsapp-btn"
            icon={
              <Image
                src="/icons/whatsapp-outline.svg"
                alt="Whatsapp"
                width={20}
                height={20}
                style={{ display: "inline-block" }}
              />
            }
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
