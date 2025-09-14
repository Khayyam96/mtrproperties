"use client";

import { FC, useMemo, useRef } from "react";
import type { BankListResponse } from "@/models/Bank.model";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Link from "next/link";
import { Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  heading?: string;
  subheading?: string;
  bankRes?: BankListResponse;
  className?: string;
};

const IMG_BASE = "https://api.dubaiyachts.com/uploads/properties";

function withBase(src?: string) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${IMG_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
}

function normalizeUrl(href?: string) {
  if (!href) return undefined;
  return href.startsWith("http") ? href : `https://${href}`;
}

const BanksCarouselSection: FC<Props> = ({
  heading = "Our Banks in UAE",
  subheading = "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  bankRes,
  className,
}) => {
  const items = useMemo(
    () =>
      (bankRes?.data ?? []).map((b) => ({
        id: b.id,
        name: b.name,
        logo: withBase(b.imgUrl),
        href: normalizeUrl(b.link),
      })),
    [bankRes]
  );

  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 450,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  if (!items.length) return null;

  return (
    <section className={`${styles.wrapcarousel} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.h2}>{heading}</Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <div className={styles.sliderWrap}>
          <Slider ref={sliderRef} {...settings}>
            {items.map((b) => {
              const content = (
                <div className={styles.logoCard}>
                  <Image
                    src={b.logo}
                    alt={b.name}
                    fill
                    className={styles.logoImg}
                    sizes="(max-width: 576px) 45vw, (max-width: 992px) 28vw, 18vw"
                  />
                </div>
              );
              return (
                <div key={b.id} className={styles.slide}>
                  {b.href ? (
                    <Link href={b.href} aria-label={b.name} target="_blank">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </Slider>
        </div>

        <div className={styles.nav}>
          <Button
            shape="round"
            size="large"
            className={styles.navBtn}
            icon={<LeftOutlined />}
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <Button
            shape="round"
            size="large"
            className={styles.navBtn}
            icon={<RightOutlined />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
    </section>
  );
};

export default BanksCarouselSection;
