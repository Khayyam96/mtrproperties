"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Select, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss";
import { HeroBanner } from "@/models/HeroBanner.model";
import PriceRange from "@/components/Lib/ProPrice/PriceRange";

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
  // ---- UI state for toggles & tabs ----
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [projectTab, setProjectTab] = useState<"all" | "ready" | "offplan">("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ---- video states ----
  const [videoReady, setVideoReady] = useState(false);       // native <video> or iframe onLoad
  const [renderIframe, setRenderIframe] = useState(false);   // lazy render iframe when visible

  const isVideo = !!data.video_url;
  const imgSrc = buildMediaUrl(data.image_url ?? null);
  const fileVideoSrc = buildMediaUrl(data.video_url ?? null); // could be mp4 from your API

  const youTubeId = useMemo(() => extractYouTubeId(data.video_url ?? undefined), [data.video_url]);

  const youTubeEmbedUrl = useMemo(() => {
    if (!youTubeId) return null;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      rel: "0",
      playsinline: "1",
      loop: "1",
      playlist: youTubeId, // required for loop
      // performance:
      modestbranding: "1"
    });
    return `https://www.youtube.com/embed/${youTubeId}?${params.toString()}`;
  }, [youTubeId]);

  // ---- IntersectionObserver: render iframe only when in viewport ----
  const bgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!youTubeId) return; // only for YT
    const el = bgRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting;
        if (vis) {
          setRenderIframe(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" } // render a bit before visible
    );
    io.observe(el);
    return () => io.disconnect();
  }, [youTubeId]);

  return (
    <div className="hero-section">
      {/* Preconnect edges for faster YT startup */}
      <Head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.google.com" />
      </Head>

      <div className="hero-background" ref={bgRef}>
        {/* Poster — shown initially and as a fallback */}
        {imgSrc && (!videoReady || !isVideo) && (
          <div className="hero-poster-wrapper">
            <Image
              className="hero-poster"
              src={imgSrc}
              alt={data.title || "Hero poster"}
              fill
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Native file video (mp4, etc.) */}
        {isVideo && fileVideoSrc && !youTubeId && (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={imgSrc ?? undefined}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={fileVideoSrc} />
          </video>
        )}

        {/* YouTube Lite Embed: render iframe lazily when visible */}
        {isVideo && youTubeEmbedUrl && renderIframe && (
          <div className="hero-iframe-wrapper" aria-hidden={false}>
            <iframe
              title="Hero video"
              src={youTubeEmbedUrl}
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="hero-iframe"
              loading="lazy"
              onLoad={() => setVideoReady(true)}
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{data.title}</h1>
            <p className="hero-subtitle">{data.subtitle}</p>

            {/* Buy / Rent Toggle */}
            <div className="hero-buttons">
              <Button
                type={mode === "buy" ? "primary" : "default"}
                className={`toggle-btn ${mode === "buy" ? "active" : ""}`}
                aria-pressed={mode === "buy"}
                onClick={() => setMode("buy")}
              >
                Buy
              </Button>
              <Button
                type={mode === "rent" ? "primary" : "default"}
                className={`toggle-btn ${mode === "rent" ? "active" : ""}`}
                aria-pressed={mode === "rent"}
                onClick={() => setMode("rent")}
              >
                Rent
              </Button>
            </div>
          </div>

          {/* Search box */}
          <div className="search-section">
            <div className="search-tabs">
              <div className="btn-groups">
                <Button
                  type={projectTab === "all" ? "primary" : "default"}
                  className={`tab-btn ${projectTab === "all" ? "active" : ""}`}
                  onClick={() => setProjectTab("all")}
                >
                  All
                </Button>
                <Button
                  type={projectTab === "ready" ? "primary" : "default"}
                  className={`tab-btn ${projectTab === "ready" ? "active" : ""}`}
                  onClick={() => setProjectTab("ready")}
                >
                  Ready to Move
                </Button>
                <Button
                  type={projectTab === "offplan" ? "primary" : "default"}
                  className={`tab-btn ${projectTab === "offplan" ? "active" : ""}`}
                  onClick={() => setProjectTab("offplan")}
                >
                  Off Plans
                </Button>
              </div>

              <div className="location-input">
                <EnvironmentOutlined className="location-icon" />
                <Input placeholder="Choose Area or City" className="location-field" />
              </div>
            </div>

            {/* Desktop */}
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

                <PriceRange
                  min={0}
                  max={10_000_000}
                  step={10_000}
                  // onChange={([minP, maxP]) => {
                  //   // buradan query paramlara / form state-ə yaza bilərsən
                  //   // console.log({ minP, maxP });
                  // }}
                />

                <Button type="primary" className="search-btn">
                  Search Now <span className="search-arrow">→</span>
                </Button>
              </div>
            </div>

            {/* Mobile */}
            <div className="search-form mobile-only">
              <Button
                type="default"
                className="advanced-btn"
                onClick={() => setShowAdvanced((p) => !p)}
              >
                Advanced Search {showAdvanced ? "▲" : "▼"}
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
