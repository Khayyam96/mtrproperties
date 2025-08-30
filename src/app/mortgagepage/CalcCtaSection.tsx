"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  image?: string;              // public path, e.g. "/images/calc-cta.jpg"
  imageAlt?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;            // if provided, wraps CTA in <Link>
  onCta?: () => void;          // click handler alternative
  reverse?: boolean;           // put text on the left
  imageHeight?: number;        // px (default 340)
  className?: string;
};

const CalcCtaSection: FC<Props> = ({
  image = "/images/mortgage-calc.jpg",
  imageAlt = "Mortgage calculator",
  title = "Click the below button to calculate your mortgage",
  description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. 
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  ctaText = "Mortgage calculator",
  ctaHref,
  onCta,
  reverse = false,
  imageHeight = 340,
  className,
}) => {
  return (
    <section className={`${styles.wrapcalc} ${className || ""}`}>
      <div className={styles.container}>
        <Row gutter={[24, 24]} align="middle">
          {/* Image */}
          <Col xs={24} lg={12} order={reverse ? 2 : 1}>
            <div className={styles.imgWrap} style={{ height: imageHeight }}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={styles.img}
                sizes="(max-width: 992px) 100vw, 50vw"
                priority
              />
            </div>
          </Col>

          {/* Content */}
          <Col xs={24} lg={12} order={reverse ? 1 : 2}>
            <div className={styles.content}>
              <Title level={2} className={styles.h2}>
                {title}
              </Title>
              <Paragraph className={styles.text}>{description}</Paragraph>

              {ctaHref ? (
                <Link href={ctaHref} className={styles.btnLink}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    className={styles.btn}
                  >
                    {ctaText}
                  </Button>
                </Link>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className={styles.btn}
                  onClick={onCta}
                >
                  {ctaText}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CalcCtaSection;
