"use client";

import React, { FC, useEffect, useMemo, useRef } from "react";
import { Typography, Button } from "antd";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppstoreOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import { ProjectCard } from "@/components/Lib/ProjectCard/ProjectCard";
import type { OffPlanItem } from "@/models/OffPlan.model";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss"

const { Title, Text } = Typography;

type TProps = { data: OffPlanItem[] };

const PROPERTY_IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties";
const DEVELOPER_LOGO_BASE = "https://api.dubaiyachts.com/uploads/properties";

type OffPlanItemAPI = OffPlanItem & {
  handover_at?: string | null;
  price_from?: string;
  translation?: { title?: string };
  address?: string | null;
  media?: OffPlanItem["media"] & { gallery?: string[] } | null;
};

function resolveWithBase(src?: string | null, base?: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const b = (base ?? "").replace(/\/+$/, "");
  const s = src.replace(/^\/+/, "");
  return `${b}/${s}`;
}

type CardItem = {
  slug: string;
  name: string;
  location: string;
  price: string;
  imageUrl: string;
  segment?: string;
  handoverYear?: number;
  handoverAt?: string | null;
  paymentPlanLabel?: string;
  developerLogo: string;
};

const ProjectDubai: FC<TProps> = ({ data }) => {
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();

  console.log(data, "adasdasdasdasd")
  useEffect(() => {
    console.log("[ProjectDubai] data:", data);
  }, [data]);

  const items = useMemo<CardItem[]>(() => {
    return (data ?? []).map((pBase) => {
      const p = pBase as OffPlanItemAPI;

      const handoverAt: string | null = p.handoverAt ?? p.handover_at ?? null;
      const handoverYear = handoverAt ? new Date(handoverAt).getFullYear() : undefined;

      const paymentPlan = Array.isArray(p.paymentPlan) ? p.paymentPlan : [];
      const handoverPercent =
        paymentPlan.find((x) => x.key?.toLowerCase() === "handover")?.percent ?? 0;
      const othersPercent = paymentPlan
        .filter((x) => x.key?.toLowerCase() !== "handover")
        .reduce((sum, x) => sum + (x.percent ?? 0), 0);
      const paymentPlanLabel =
        handoverPercent > 0 && othersPercent > 0
          ? `${othersPercent}/${handoverPercent}`
          : undefined;

      const priceFrom = p.startingPrice ?? p.price_from ?? "";
      const currency = p.currency ?? "";
      const priceNumber = priceFrom ? Number.parseFloat(priceFrom) : NaN;
      const price =
        priceFrom && currency && Number.isFinite(priceNumber)
          ? `Starting at ${currency} ${priceNumber.toLocaleString()}`
          : "";

      const galleryPaths = p.media?.galleryPaths ?? p.media?.gallery ?? [];
      const firstGallery = Array.isArray(galleryPaths) ? galleryPaths[0] : undefined;
      const imageUrl = firstGallery ? `${PROPERTY_IMAGE_BASE}/${firstGallery}` : "/img4.png";

      const developerLogo = resolveWithBase(p.developer?.logoUrl ?? "", DEVELOPER_LOGO_BASE);

      const name =
        p.translations?.[0]?.title ??
        p.translation?.title ??
        p.developer?.name ??
        `Property #${p.id}`;

      const location = p.address ?? p.propertyType?.name ?? "";

      return {
        slug: p.slug ?? "",
        name,
        location,
        price,
        imageUrl,
        segment: p.segment,
        handoverYear,
        handoverAt,
        paymentPlanLabel,
        developerLogo,
      };
    });
  }, [data]);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2.1 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="project-dubai-section">
      <Container>
        <div className="header text-center">
          <Title level={2}>New Off Plan Projects In Dubai</Title>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </div>

        <div className="slider-container">
          <Button
            className="slider-arrow left"
            shape="circle"
            icon={<Image src="/previcon.png" alt="prev" width={16} height={16} />}
            onClick={() => sliderRef.current?.slickPrev()}
          />

          <Slider {...settings} ref={sliderRef} className="project-slider">
            {items.map((project) => (
              <ProjectCard key={project.slug} {...project} handoverAt={project.handoverAt} />
            ))}
          </Slider>

          <Button
            className="slider-arrow right"
            shape="circle"
            icon={<Image src="/nexticon.png" alt="next" width={16} height={16} />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>

        <div className="view-more-wrapper text-center" style={{ marginTop: 30 }}>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            size="large"
            onClick={() => router.push("/planpage")}
          >
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProjectDubai;
