"use client";

import Image from "next/image";
import Slider from "react-slick";
import { Typography, Tag } from "antd";
import {
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { LandProperty } from "@/models/LandProperties.model";

import locationIcon from "../../../../public/location-marker.png";
import arrow from "../../../../public/arrow-left.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title } = Typography;

const IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties/";

function formatCompact(n?: number | null) {
  if (n === null || n === undefined) return "—";
  try {
    return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  } catch {
    const val = Number(n);
    if (Number.isNaN(val)) return "—";
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
    return String(val);
  }
}

function normalizePhone(p?: string | null) {
  if (!p) return "";
  return p.replace(/[^\d+]/g, "");
}

type CardProps = { land: LandProperty };

export const LandPropertyCard: React.FC<CardProps> = ({ land }) => {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  } as const;

  // Şəkil siyahısını hazırla
  const rawImgs = land?.media?.gallery?.length ? land.media.gallery : ["/no-photo.png"];
  const imgs = rawImgs.map((img) =>
    img.startsWith("http") || img.startsWith("/") ? img : `${IMAGE_BASE}${img}`
  );

  const leftTag = land?.property_type_list?.[0] ?? "Land";
  const rightTag = land?.segment ?? "—";

  // Zəng linki
  const callHref = land?.agent?.phone ? `tel:${normalizePhone(land.agent.phone)}` : undefined;

  // WhatsApp linki
  const waNumber = normalizePhone(land?.agent?.whatsapp);
  const waText = encodeURIComponent(`Hello, I'm interested in land: ${land?.slug ?? ""}`);
  const waHref = waNumber ? `https://wa.me/${waNumber.replace(/^\+/, "")}?text=${waText}` : undefined;

  const goCard = () => {
    if (land?.slug) router.push(`/popylarinner/${land.slug}`);
  };

  const onRootClick = () => {
    // Daxili düymələr stopPropagation etdiyindən yalnız kart boş yerinə klikdə işləyəcək
    goCard();
  };

  const onRootKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goCard();
    }
  };

  return (
    <div
      className="pro-card"
      onClick={onRootClick}
      onKeyDown={onRootKeyDown}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
      aria-label={`Open ${land?.slug ?? "land"}`}
    >
      <div className="tags">
        <div className="left-tag">{leftTag}</div>
        <div className="right-tag">{rightTag}</div>
      </div>

      <div className="pro-card__img">
        <Slider {...settings} ref={sliderRef}>
          {imgs.map((src, idx) => (
            <div key={`${land?.id ?? "land"}-${idx}`} className="carousel-slide">
              <Image
                src={src}
                alt={`${land?.slug ?? "land"}-${idx}`}
                fill
                className="pro-card__img--image"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={idx === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  goCard();
                }}
              />
            </div>
          ))}
        </Slider>

        <button
          className="carousel-btn left"
          onClick={(e) => {
            e.stopPropagation();
            sliderRef.current?.slickPrev();
          }}
          aria-label="Previous image"
          type="button"
        >
          <Image src={arrow} alt="Left arrow" width={20} height={20} />
        </button>
        <button
          className="carousel-btn right"
          onClick={(e) => {
            e.stopPropagation();
            sliderRef.current?.slickNext();
          }}
          aria-label="Next image"
          type="button"
        >
          <Image src={arrow} alt="Left arrow" width={20} height={20} />
        </button>
      </div>

      <div className="pro-card__body">
        <div className="pro-card__price">
          <Title level={3} style={{ margin: 0 }}>
            AED {formatCompact(land?.price_from)}
          </Title>
          <Tag className="type">{formatCompact(land?.sq_ft_from)} sq ft</Tag>
        </div>

        <div className="pro-card__location">
          <Image src={locationIcon} alt="Location" width={13} height={15} />
          <span>{land?.address || "—"}</span>
        </div>

        <div className="pro-card__meta">
          <span>
            <Image src="/ic2.png" width={13} height={13} alt="" /> {formatCompact(land?.sq_ft_from)} sq ft
          </span>
        </div>

        <div className="pro-card__actions">
          <a
            className="call"
            href={callHref || "#"}
            onClick={(e) => {
              if (!callHref) {
                e.preventDefault();
                e.stopPropagation();
                alert("Phone number is not available.");
              } else {
                e.stopPropagation();
              }
            }}
          >
            <PhoneOutlined /> Call Us
          </a>

          <a
            className="whatsapp"
            href={waHref || "#"}
            target={waHref ? "_blank" : undefined}
            rel={waHref ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!waHref) {
                e.preventDefault();
                e.stopPropagation();
                alert("WhatsApp number is not available.");
              } else {
                e.stopPropagation();
              }
            }}
          >
            <WhatsAppOutlined /> Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
};
