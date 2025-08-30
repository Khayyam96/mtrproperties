"use client";

import { FC } from "react";
import Image from "next/image";
import { Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  image?: string;         // public-dan yol, məsələn: "/mortgage-hero.jpg"
  title?: string;         // "Mortgage Calculator"
  subtitle?: string;
  height?: number;        // px, default: 240
  overlay?: number;       // 0..1 (qaralma dərəcəsi), default: 0.45
  className?: string;
  priority?: boolean;     // Next/Image priority
  alt?: string;
};

const MortgageHero: FC<Props> = ({
  image = "/mortgage-hero.jpg",
  title = "Mortgage Calculator",
  subtitle = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
  height = 240,
  overlay = 0.45,
  className,
  priority = true,
  alt = "Mortgage hero background",
}) => {
  return (
    <section className={`${styles.wraphero} ${className || ""}`} style={{ height }}>
      <div className={styles.bgWrap} aria-hidden>
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          className={styles.bg}
          sizes="100vw"
        />
        <div
          className={styles.overlay}
          style={{ background: `rgba(0,0,0,${overlay})` }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <Title level={2} className={styles.title}>
            {title}
          </Title>
          <Paragraph className={styles.subtitle}>{subtitle}</Paragraph>
        </div>
      </div>
    </section>
  );
};

export default MortgageHero;
