import React from "react";
import Image from "next/image";
import { Button, Select, Input } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import type { HeroAPI } from "@/types/herobanner";
import "./index.scss";

const { Option } = Select;

const API_URL = "https://api.dubaiyachts.com/properties/api/v1/hero/web";
export const dynamic = "force-dynamic";

async function fetchJSONSafe(url: string, init?: RequestInit) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 10_000);

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json", ...(init?.headers || {}) },
    next: { revalidate: 0 },
    signal: ac.signal,
    ...init,
  }).catch((e) => {
    clearTimeout(timer);
    throw e;
  });

  clearTimeout(timer);

  const ok = res.ok;
  const status = res.status;
  const raw = await res.text();

  return { ok, status, raw, res };
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

type WithLegacyHero = HeroAPI &
  Partial<{
    videoUrl: string;
    videoUrlMp4: string;
    videoMp4: string;
    videoPosterUrl: string;
    posterUrl: string;
    poster: string;
    image: string;
  }>;

async function getHero(): Promise<HeroAPI | null> {
  try {
    const { ok, status, raw } = await fetchJSONSafe(API_URL);

    if (!ok) {
      console.error("HERO API not OK:", status, raw?.slice(0, 400));
      return null;
    }

    if (!raw || !raw.trim()) {
      console.error("HERO API returned empty body with status:", status);
      return null;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch (e) {
      console.error("HERO API JSON parse error:", e, "Raw (first 400):", raw.slice(0, 400));
      return null;
    }

    let rawData: unknown;
    if (isObject(parsed) && "data" in parsed) {
      rawData = (parsed as { data: unknown }).data;
    } else {
      rawData = parsed;
    }

    if (Array.isArray(rawData)) {
      rawData = rawData[0];
    }

    if (!isObject(rawData)) return null;

    return rawData as HeroAPI;
  } catch (e) {
    console.error("HERO API fetch error:", e);
    return null;
  }
}

function guessVideoMime(url: string): string {
  const u = url?.toLowerCase?.() || "";
  if (u.endsWith(".webm")) return "video/webm";
  if (u.endsWith(".ogg") || u.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}

export default async function HeroSection() {
  const hero = await getHero();

  if (!hero || hero.isActive === false) return null;

  const TITLE = hero.title ?? "";
  const SUBTITLE = hero.subtitle ?? "";

  const h = hero as WithLegacyHero;

  const videoSrc =
    h.videoUrl ??
    h.videoUrlMp4 ??
    h.videoMp4 ??
    null;

  const posterSrc =
    h.videoPosterUrl ??
    h.posterUrl ??
    h.poster ??
    hero.imageUrl ??
    undefined;

  const imageSrc = hero.imageUrl ?? h.image ?? null;

  const showVideo = Boolean(videoSrc);
  const showImage = !showVideo && Boolean(imageSrc);

  if (!showVideo && !showImage) return null;

  return (
    <div className="hero-section">
      <script
        dangerouslySetInnerHTML={{
          __html: `console.log("HERO API (browser):", ${JSON.stringify(hero)
            .replace(/</g, "\\u003c")
            .replace(/<\/script>/gi, "<\\/script>")});`,
        }}
      />

      <div className="hero-background" data-mode={showVideo ? "video" : "image"}>
        {showVideo ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterSrc}
          >
            <source src={videoSrc!} type={guessVideoMime(videoSrc!)} />
          </video>
        ) : (
          <div className="hero-poster-wrapper">
            <Image
              className="hero-poster"
              src={imageSrc!}
              alt="Hero background"
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
            {TITLE && <h1 className="hero-title">{TITLE}</h1>}
            {SUBTITLE && <p className="hero-subtitle">{SUBTITLE}</p>}
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
}
