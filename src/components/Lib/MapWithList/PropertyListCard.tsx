"use client";

import { type FC } from "react";
import { Card } from "antd";
import Image from "next/image";
import Slider, { Settings, type CustomArrowProps } from "react-slick";
import { Property } from "@/data/propertiesMap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  item: Property;
  active?: boolean;
  onClick?: () => void;
};

type ArrowBtnProps = { dir: "left" | "right" } & Partial<CustomArrowProps>;

const ArrowBtn: FC<ArrowBtnProps> = ({ dir, onClick }) => {
  const handle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    (onClick as React.MouseEventHandler<HTMLElement> | undefined)?.(
      e as unknown as React.MouseEvent<HTMLElement>
    );
  };

  return (
    <button
      className={`pc-nav pc-nav--${dir}`}
      aria-label={dir === "left" ? "previous" : "next"}
      onClick={handle}
      type="button"
    >
      <span>{dir === "left" ? "‹" : "›"}</span>
    </button>
  );
};

const getImages = (it: Property): string[] => {
  const maybeImages = (it as unknown as { images?: unknown }).images;
  if (Array.isArray(maybeImages) && maybeImages.every((v) => typeof v === "string") && maybeImages.length) {
    return maybeImages as string[];
  }
  return [it.image];
};

export const PropertyListCard: FC<Props> = ({ item, active, onClick }) => {
  const images = getImages(item);

  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: images.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBtn dir="left" />,
    nextArrow: <ArrowBtn dir="right" />,
    draggable: true,
    swipeToSlide: true,
  };

  return (
    <Card
      className={`property-card ${active ? "is-active" : ""}`}
      hoverable
      onClick={onClick}
      cover={
        <div className="pc-cover">
          <Slider {...settings}>
            {images.map((src, i) => (
              <div key={i} className="pc-slide">
                <div style={{ position: "relative", width: "100%", paddingTop: "66.6667%" }}>
                  <Image
                    src={src}
                    alt={`${item.name} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      }
    >
      <h4 className="pc-title">{item.name}</h4>
      <div className="pc-meta">{item.type}</div>

      <div className="pc-specs">
        <span className="spec">
          <i className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 7h8a3 3 0 0 1 3 3v3h7v6h-2v-2H5v2H3V7Zm2 2v6h9v-5a1 1 0 0 0-1-1H5Zm2 1h3v2H7v-2Z" />
            </svg>
          </i>
          <span className="val">{item.bedrooms}</span>
        </span>
        <span className="spec">
          <i className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 3a3 3 0 0 1 3 3v2h8a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-1h2v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5H10V6a1 1 0 1 0-2 0v1H6V6a3 3 0 0 1 3-3Z" />
            </svg>
          </i>
          <span className="val">{item.bathrooms}</span>
        </span>
        <span className="spec">
          <i className="ico">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h8v8H8V8Z" />
            </svg>
          </i>
          <span className="val">{item.area} sq.ft.</span>
        </span>
      </div>

      <div className="pc-price">AED {item.price.toLocaleString()}</div>
    </Card>
  );
};

export default PropertyListCard;
