// src/app/Home/ProjectDubai/index.tsx
"use client";

import React, { FC, useMemo, useRef } from "react";
import { Typography, Button } from "antd";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { AppstoreOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import { ProjectCard } from "@/components/Lib/ProOffCard/ProjectCard";
import "./index.scss";


// Slick CSS-lər
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== API modelləri =====
export interface OffPlanListResponse {
  data: OffPlanAPIItem[];
  page: number;
  per_page: number;
  total: number;
}

export interface OffPlanAPIItem {
  id: number;
  title: string;
  slug: string;
  address: string | null;
  handover_at: string | null;
  segment?: string | null;
  media?: { gallery?: string[] } | null;
  developer?: { id: number; name?: string; image_url?: string | null } | null;
  translation?: { subtitle?: string } | null;
}

type TProps = {
  data: OffPlanAPIItem[];
  title?: string;
  subtitle?: string;
};

const { Title, Text } = Typography;

const PROPERTY_IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties";
const DEVELOPER_IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties";

function withBase(path?: string | null, base?: string) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const b = (base ?? "").replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`;
}

type CardItem = {
  slug: string;
  name: string;
  location: string;
  price: string;
  imageUrl: string;
  segment?: string | null;
  handoverAt?: string | null;
  paymentPlanLabel?: string;
  developerLogo?: string;
};

const ProjectDubai: FC<TProps> = ({ data, title, subtitle }) => {
  const sliderRef = useRef<Slider | null>(null);
  // const router = useRouter();

  const items = useMemo<CardItem[]>(() => {
    return (data ?? []).map((p) => {
      const gallery = p.media?.gallery ?? [];
      const imageUrl =
        gallery.length > 0 ? withBase(gallery[0], PROPERTY_IMAGE_BASE) : "/img4.png";

      const developerLogo = withBase(p.developer?.image_url ?? "", DEVELOPER_IMAGE_BASE);

      return {
        slug: p.slug,
        name: p.title,
        location: p.address ?? "",
        price: "",
        imageUrl,
        segment: p.segment ?? undefined,
        handoverAt: p.handover_at ?? null,
        paymentPlanLabel: undefined,
        developerLogo,
      };
    });
  }, [data]);

  const settings: Settings = {
    dots: false,
    infinite: items.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 992,
        settings:
          { 
        slidesToShow: 2.2, 
        slidesToScroll: 1,
        centerMode: false
      } },
      { breakpoint: 576, settings: {  
        slidesToShow: 1.15, 
        slidesToScroll: 1,
        centerMode: false} },
    ],
  };

  return (
    <section className="project-dubai-section">
      <Container>
        <div className="header text-center">
          <Title level={2}>{title ?? "New Off Plan Projects In Dubai"}</Title>
          {subtitle ? <Text className="description">{subtitle}</Text> : null}
        </div>

        <div className="slider-container">
          <Button
            className="slider-arrow left-btn"
            shape="circle"
            icon={<Image src="/previcon.png" alt="prev" width={30} height={30} />}
            onClick={() => sliderRef.current?.slickPrev()}
          />

          <Slider {...settings} ref={sliderRef} className="project-slider">
            {items.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </Slider>

          <Button
            className="slider-arrow right-btn"
            shape="circle"
            icon={<Image src="/nexticon.png" alt="next" width={30} height={30} />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>

        {/* <div className="view-more-wrapper text-center" style={{ marginTop: 30 }}>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            size="large"
            onClick={() => router.push("/planpage")}
          >
            View More
          </Button>
        </div> */}
      </Container>
    </section>
  );
};

export default ProjectDubai;
