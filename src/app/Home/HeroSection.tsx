"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import { Button, Select, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss";
import { HeroBanner } from "@/models/HeroBanner.model";

const { Option } = Select;
const MEDIA_BASE = "https://api.dubaiyachts.com/uploads/properties/";

function buildMediaUrl(src?: string | null): string | null {
  if (!src) return null;

  if (/^(https?:\/\/|blob:)/i.test(src)) return src;

  const clean = src.replace(/^\/+/, "");
  return `${MEDIA_BASE}${clean}`;
}

type TProps = { data: HeroBanner };

const HeroSection: FC<TProps> = ({ data }) => {
  const isVideo = data.backgroundType === "VIDEO";
  const isImage = data.backgroundType === "IMAGE";
  const imgPath = data.imageUrl ?? null;

  const imgSrc = buildMediaUrl(imgPath);
  const videoSrc = buildMediaUrl(data.videoUrl);
  const videoPoster = buildMediaUrl(data.videoPosterUrl) ?? imgSrc ?? undefined;

 
  useEffect(() => {
    console.log("[HeroSection] final imgSrc =", imgSrc);
  }, [imgSrc]);

  return (
    <div className="hero-section">
      <div className="hero-background">
        {isVideo && videoSrc && (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoPoster}
          >
            <source src={videoSrc} />
          </video>
        )}

        {isImage && imgSrc && (
          <div className="hero-poster-wrapper">
            <Image
              className="hero-poster"
              src={imgSrc}
              alt={data.title || "Hero background"}
              fill
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="hero-gradient" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{data.title}</h1>
            <p className="hero-subtitle">{data.subtitle}</p>
            <div className="hero-buttons">
              <Button type="primary" className="buy-btn">Buy</Button>
              <Button className="rent-btn">Rent</Button>
            </div>
          </div>

          <div className="search-section">
            <div className="search-tabs">
              <div className="btn-groups">
                <Button type="primary" className="tab-active">All</Button>
                <Button className="tab-inactive">Ready to Move</Button>
                <Button className="tab-inactive">Off Plans</Button>
              </div>

              <div className="location-input">
                <EnvironmentOutlined className="location-icon" />
                <Input placeholder="Choose Area or City" className="location-field" />
              </div>
            </div>

            <div className="search-form">
              <div className="form-row">
                <Select defaultValue="Residential" className="form-select property-category" suffixIcon={<span>▼</span>}>
                  <Option value="Residential">Residential</Option>
                  <Option value="Commercial">Commercial</Option>
                </Select>

                <Select defaultValue="Any" className="form-select property-type" suffixIcon={<span>▼</span>}>
                  <Option value="Any">Any</Option>
                  <Option value="Villa">Villa</Option>
                  <Option value="Apartment">Apartment</Option>
                </Select>

                <Select defaultValue="Bed & Bath" className="form-select property-details" suffixIcon={<span>▼</span>}>
                  <Option value="Bed & Bath">Bed & Bath</Option>
                  <Option value="1 Bed">1 Bed</Option>
                  <Option value="2 Bed">2 Bed</Option>
                </Select>

                <Select defaultValue="Price (AED)" className="form-select price-range" suffixIcon={<span>▼</span>}>
                  <Option value="Price (AED)">Price (AED)</Option>
                  <Option value="100k-500k">100k-500k</Option>
                  <Option value="500k-1M">500k-1M</Option>
                </Select>

                <Button type="primary" className="search-btn">
                  Search Now <span className="search-arrow">→</span>
                </Button>
              </div>

              <div className="form-labels">
                <span>Property Category</span>
                <span>Property type</span>
                <span>Property Details</span>
                <span>Price</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
