"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Row, Col, Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Block = {
  title: string;
  body: string;     // uzun mətn (scroll olcaq)
  image: string;    // public/ yol (məs: "/images/mortgage-1.jpg")
  imageAlt?: string;
  reverse?: boolean; // true -> şəkil solda, mətn sağda
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: Block[];
  height?: number;   // mətn qutusunun hündürlüyü (px). default: 240
  className?: string;
};

const defaultText =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. "
  + "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
  + "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. "
  + "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.";

const defaults: Block[] = [
  {
    title: "What is Mortgage?",
    body: defaultText + " " + defaultText,
    image: "/content/modern-arch.jpg",
    imageAlt: "Modern architecture",
  },
  {
    title: "How Mortgages Work?",
    body: defaultText + " " + defaultText,
    image: "/content/living-room.jpg",
    imageAlt: "Cozy living room",
    reverse: true,
  },
];

const ScrollableInfoSection: FC<Props> = ({
  heading = "Random heading for the content",
  subheading =
    "Vlyk by Dacha is a vacation home rental specialist with 17 years of real estate experience paired with a Swiss hospitality excellence. We will maximize your property investment with our short-term rental solutions including full management of your property",
  items,
  height = 240,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaults), [items]);

  return (
    <section className={`${styles.wrapinfo} ${className || ""}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Title level={2} className={styles.h2}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Blocks */}
        {data.map((b, idx) => (
          <Row
            key={idx}
            gutter={[24, 24]}
            align="top"
            className={styles.block}
          >
            {/* Şəkil sütunu */}
            <Col
              xs={24}
              lg={12}
              order={b.reverse ? 1 : 0}
              className={styles.col}
            >
              <div className={styles.imgWrap} aria-label={b.imageAlt || b.title}>
                <Image
                  src={b.image}
                  alt={b.imageAlt || b.title}
                  fill
                  className={styles.img}
                  sizes="(max-width: 992px) 100vw, 50vw"
                  priority={idx === 0}
                />
              </div>
            </Col>

            {/* Mətn sütunu */}
            <Col xs={24} lg={12} className={styles.col}>
              <div className={styles.textWrap}>
                <Title level={3} className={styles.blockTitle}>
                  {b.title}
                </Title>
                <div
                  className={styles.scrollArea}
                  style={{ maxHeight: height }}
                  role="region"
                  aria-label={`${b.title} content`}
                >
                  <Paragraph className={styles.body}>{b.body}</Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </section>
  );
};

export default ScrollableInfoSection;
