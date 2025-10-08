// components/Lib/ProCard/index.tsx
"use client";

import Image, { type StaticImageData } from "next/image";
import { Typography, Tag } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Slider from "react-slick";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nophoto from "../../../../public/nophoto.svg";
import arrow from "../../../../public/arrow-left.svg";
import "./index.scss";
import { LandProjectItem } from "@/models/LatesProject.model";

const { Title } = Typography;

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties";

function buildImgUrl(name?: string) {
  if (!name) return "";
  if (/^https?:\/\//i.test(name)) return name;
  if (name.startsWith("/uploads/properties/")) {
    return `https://api.dubaiyachts.com${name}`;
  }
  return `${MEDIA_BASE}/${name}`.replace(/([^:]\/)\/+/g, "$1");
}

function formatRange(min?: number | null, max?: number | null, unit?: string) {
  const a = typeof min === "number" ? min : undefined;
  const b = typeof max === "number" ? max : undefined;
  if (a && b) {
    if (a === b) return `${a}${unit ? " " + unit : ""}`;
    return `${a}–${b}${unit ? " " + unit : ""}`;
  }
  if (a) return `${a}${unit ? " " + unit : ""}`;
  if (b) return `${b}${unit ? " " + unit : ""}`;
  return "-";
}

function formatPriceRange(from?: number | null, to?: number | null, currency = "AED") {
  const fmt = (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
    : n >= 1_000 ? `${Math.round(n / 1_000)}k`
    : `${n}`;
  if (typeof from === "number" && typeof to === "number") {
    if (from === to) return `${currency} ${Number(from).toLocaleString()}`;
    return `${currency} ${fmt(from)}–${fmt(to)}`;
  }
  if (typeof from === "number") return `${currency} ${Number(from).toLocaleString()}`;
  if (typeof to === "number") return `${currency} ${Number(to).toLocaleString()}`;
  return `${currency} -`;
}

function sanitizePhone(phone?: string | null) {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

/** Hər slayd üçün təhlükəsiz şəkil:
 * - srcCandidate varsa və işləkdirsə onu göstərir
 * - qırılarsa avtomatik nophoto-ya keçir
 */
function SlideImg({
  srcCandidate,
  alt,
  priority,
}: {
  srcCandidate?: string;
  alt: string;
  priority: boolean;
}) {
  const [src, setSrc] = useState<string | StaticImageData>(
    (srcCandidate && buildImgUrl(srcCandidate)) || nophoto
  );

  useEffect(() => {
    setSrc((srcCandidate && buildImgUrl(srcCandidate)) || nophoto);
  }, [srcCandidate]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="pro-card__img--image"
      sizes="(max-width: 768px) 100vw, 400px"
      priority={priority}
      onError={() => setSrc(nophoto)}
    />
  );
}

export const ProCard: React.FC<LandProjectItem> = (props) => {
  const {
    slug,
    title,
    address,
    property_type_list,
    bedroom_count_min,
    bedroom_count_max,
    bathroom_count_min,
    bathroom_count_max,
    sq_ft_from,
    sq_ft_to,
    price_from,
    price_to,
    media,
    agent,
    segment,
  } = props;

  const router = useRouter();
  const sliderRef = useRef<Slider>(null);

  const goPrev: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickPrev();
  };
  const goNext: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  } as const;

  const phoneDial = agent?.phone ? `tel:${agent.phone}` : undefined;
  const waNumber = sanitizePhone(agent?.whatsapp || agent?.phone || "");
  const waLink = waNumber ? `https://wa.me/${waNumber}` : undefined;

  const handleOpen = () => {
    if (slug) router.push(`/popylarinner/${slug}`);
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  // Şəkil siyahısını hazırla
  const images = (media?.gallery ?? []).filter(Boolean) as string[];
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  return (
    <div
      className="pro-card"
      role="link"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      style={{ cursor: slug ? "pointer" : "default" }}
    >
      <div className="pro-card__img">
        {hasImages ? (
          <>
            <Slider {...settings} ref={sliderRef}>
              {images.map((img, idx) => (
                <div key={idx} className="carousel-slide">
                  <SlideImg
                    srcCandidate={img}
                    alt={title || "Property image"}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </Slider>

            {hasMultiple && (
              <>
                <button className="carousel-btn left top" onClick={goPrev} aria-label="Previous">
                  <Image src={arrow} alt="Left arrow" width={20} height={20} />
                </button>
                <button className="carousel-btn right top" onClick={goNext} aria-label="Next">
                  <Image src={arrow} alt="Left arrow" width={20} height={20} />
                </button>
              </>
            )}
          </>
        ) : (
          // Şəkil YOXDURSA → karusel YOX, tək nophoto
          <Image
            src={nophoto}
            alt={title || "No image"}
            fill
            className="pro-card__img--image"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        )}

        <div className="pro-card__labels">
          {segment && <Tag className="plan">{segment}</Tag>}
          {property_type_list?.[0] && <Tag className="ready">{property_type_list[0]}</Tag>}
        </div>
      </div>

      <div className="pro-card__body">
        <div className="pro-card__price">
          <Title level={3} style={{ margin: 0 }}>
            {formatPriceRange(price_from ?? undefined, price_to ?? undefined, "AED")}
          </Title>
        </div>

        <div className="pro-card__location">
          <EnvironmentOutlined />
          <span className="location_text">{address ?? "-"}</span>
        </div>

        <div className="pro-card__meta">
          <span className="meta-item">
            <Image src="/propertimg1.png" alt="Bedrooms" width={18} height={18} />
            {formatRange(bedroom_count_min, bedroom_count_max)}
            <p>Bed</p>
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Bathrooms" width={18} height={18} />
            {formatRange(bathroom_count_min, bathroom_count_max)}
            <p>Bath</p>
          </span>

          <span className="meta-item">
            <Image src="/propertimg2.png" alt="Area" width={18} height={18} />
            {formatRange(sq_ft_from, sq_ft_to, "Sq.Ft.")}
          </span>
        </div>

        <div className="pro-card__actions" onClick={(e) => e.stopPropagation()}>
          <a
            className="call"
            href={phoneDial}
            onClick={(e) => {
              if (!phoneDial) {
                e.preventDefault();
                alert("Phone number is not available.");
              }
            }}
          >
            <PhoneOutlined /> <p>Call Us</p>
          </a>

          <a
            className="whatsapp"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!waLink) {
                e.preventDefault();
                alert("WhatsApp number is not available.");
              }
            }}
          >
            <WhatsAppOutlined /> <p>Whatsapp</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProCard;
