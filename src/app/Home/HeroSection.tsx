"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button, Select, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss";
import { HeroBanner } from "@/models/HeroBanner.model";

const { Option } = Select;
const MEDIA_BASE = "https://api.dubaiyachts.com/uploads/properties/";

function buildMediaUrl(src?: string | null, base: string = MEDIA_BASE): string | null {
  if (!src) return null;
  if (/^(https?:\/\/|blob:)/i.test(src)) return src;
  const clean = src.replace(/^\/+/, "");
  return `${base}${clean}`;
}

function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const re =
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
  const m = url.match(re);
  return m ? m[1] : null;
}

type TProps = { data: HeroBanner };

const HeroSection: FC<TProps> = ({ data }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // media detection
  const isVideo = data.backgroundType === "VIDEO";
  const isImage = data.backgroundType === "IMAGE";

  const imgPath = data.imageUrl ?? null;
  const imgSrc = buildMediaUrl(imgPath);

  // videoUrl might be a direct video file or a YouTube url
  const rawVideo = data.videoUrl ?? null;
  const videoSrc = buildMediaUrl(rawVideo);
  const videoPoster = buildMediaUrl(data.videoPosterUrl) ?? imgSrc ?? undefined;

  const youTubeId = useMemo(() => extractYouTubeId(rawVideo ?? undefined), [rawVideo]);

  const youTubeEmbedUrl = useMemo(() => {
    if (!youTubeId) return null;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      rel: "0",
      playsinline: "1",
      loop: "1",
      playlist: youTubeId,
    });
    return `https://www.youtube.com/embed/${youTubeId}?${params.toString()}`;
  }, [youTubeId]);

  useEffect(() => {
    // for debugging if lazım olarsa
    // console.log("[HeroSection] imgSrc:", imgSrc, "videoSrc:", videoSrc, "youTubeId:", youTubeId, "poster:", videoPoster);
  }, [imgSrc, videoSrc, youTubeId, videoPoster]);

  return (
    <div className="hero-section">
      <div className="hero-background">
        {/* Poster always behind media (if available) */}
        {videoPoster && (
          <div className="hero-poster-wrapper">
            <Image
              className="hero-poster"
              src={videoPoster}
              alt={data.title || "Hero poster"}
              fill
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* If it's a video and NOT a YouTube link, render native <video> tag */}
        {isVideo && videoSrc && !youTubeId && (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoPoster ?? undefined}
          >
            <source src={videoSrc} />
          </video>
        )}

       
        {isVideo && youTubeEmbedUrl && (
          <div className="hero-iframe-wrapper" aria-hidden={false}>
            <iframe
              title="Hero video"
              src={youTubeEmbedUrl}
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
              className="hero-iframe"
            />
          </div>
        )}

        {/* If it's an image background */}
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

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{data.title}</h1>
            <p className="hero-subtitle">{data.subtitle}</p>
            <div className="hero-buttons">
              <Button type="primary" className="buy-btn">
                Buy
              </Button>
              <Button className="rent-btn">Rent</Button>
            </div>
          </div>

          <div className="search-section">
            <div className="search-tabs">
              <div className="btn-groups">
                <Button type="primary" className="tab-active">
                  All
                </Button>
                <Button className="tab-inactive">Ready to Move</Button>
                <Button className="tab-inactive">Off Plans</Button>
              </div>

              <div className="location-input">
                <EnvironmentOutlined className="location-icon" />
                <Input placeholder="Choose Area or City" className="location-field" />
              </div>
            </div>

            {/* Desktop layout (>=768px) */}
            <div className="search-form desktop-only">
              <div className="form-labels">
                <span>Property Category</span>
                <span>Property type</span>
                <span>Property Details</span>
                <span>Price</span>
                <span></span>
              </div>
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
            </div>

            {/* Mobile layout (<=767px) */}
            <div className="search-form mobile-only">
              <Button
                type="default"
                className="advanced-btn"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                Advanced Search
              </Button>

              <div className={`advanced-wrapper ${showAdvanced ? "open" : ""}`}>
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
              </div>

              <Button type="primary" className="search-btn">
                Search Now <span className="search-arrow">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
