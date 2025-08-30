"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Space } from "antd";
import { ArrowRightOutlined, RiseOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph, Text } = Typography;

type Props = {
  image?: string;
  imageAlt?: string;
  minHeight?: number;
  overlayOpacity?: number;

  pillText?: string;
  pillIcon?: ReactNode;

  heading?: string;
  subheading?: string;

  ctaText?: string;
  ctaHref?: string;
  onCta?: () => void;
  className?: string;
};

const Banner: FC<Props> = ({
  image = "/images/career-hero.jpg",
  imageAlt = "Careers background",
  minHeight = 440,
  overlayOpacity = 0.55,

  pillText = "Hiring Top Brokers for Downtown Area Team",
  pillIcon = <RiseOutlined />,

  heading = "Grow Your Real Estate Career with MTR Properties",
  subheading =
  "Join Dubai’s fastest-growing real estate brokerage. Enjoy competitive commissions, comprehensive support, and access to premium properties in prime locations.",

  ctaText = "Apply to Join our team",
  ctaHref,
  onCta,
  className,
}) => {
  return (
    <section
      className={`${styles.bannerwrap} ${className || ""}`}
      style={{ minHeight }}
    >
      <Container>
        <div className={styles.bg} aria-hidden>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className={styles.bgImg}
            sizes="100vw"
          />
          <div
            className={styles.overlay}
            style={{ backgroundColor: `rgba(52, 16, 110, ${overlayOpacity})` }}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.inner}>
            <Space className={styles.pill} size={8}>
              <span className={styles.pillIcon}>{pillIcon}</span>
              <Text className={styles.pillText} strong>
                {pillText}
              </Text>
            </Space>

            <Title level={1} className={styles.h1}>
              {heading}
            </Title>
            <Paragraph className={styles.sub}>{subheading}</Paragraph>

            {ctaHref ? (
              <Link href={ctaHref} className={styles.btnLink}>
                <Button
                  type="primary"
                  size="large"
                  className={styles.btn}
                >
                  {ctaText}
                  <ArrowRightOutlined />
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                size="large"
                className={styles.btn}
                onClick={onCta}
              >
                {ctaText}
                <ArrowRightOutlined />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
