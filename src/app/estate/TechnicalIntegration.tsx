"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Row, Col, Card, Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type TechItem = {
  title: string;
  image: string;     // public/ içindən yol (Next/Image)
  alt?: string;
  points: string[];
};

type Props = {
  className?: string;
  heading?: string;
  subtext?: string;
  items?: TechItem[];
};

const defaultItems: TechItem[] = [
  {
    title: "XRP Ledger Integration",
    image: "/tech/xrp.jpg",
    alt: "XRP Ledger",
    points: [
      "Built on enterprise-grade blockchain technology",
      "Fast transactions",
      "Low fees",
      "Environmental efficiency",
      "Enterprise security",
    ],
  },
  {
    title: "Prypco Platform",
    image: "/tech/platform.jpg",
    alt: "Prypco Platform",
    points: [
      "User-friendly interface for seamless investing",
      "AED payments only",
      "Instant transactions",
      "Mobile app",
      "24/7 support",
    ],
  },
  {
    title: "Smart Contracts",
    image: "/tech/smart.jpg",
    alt: "Smart Contracts",
    points: [
      "Automated and transparent property management",
      "Rental distribution",
      "Voting rights",
      "Exit mechanisms",
      "Compliance automation",
    ],
  },
];

const TechnicalIntegration: FC<Props> = ({
  className,
  heading = "Technical Integration",
  subtext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  items,
}) => {
  const data = useMemo(() => items ?? defaultItems, [items]);

  return (
    <section className={`${styles.wraptechnical} ${className || ""}`}>
      <div className={styles.container}>
        <Paragraph className={styles.topText}>
          {subtext} {subtext}
        </Paragraph>

        <Title level={2} className={styles.heading}>
          {heading}
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {data.map((it) => (
            <Col key={it.title} xs={24} md={12} lg={8}>
              <Card className={styles.card} bodyStyle={{ padding: 0 }}>
                <div className={styles.media}>
                  <Image
                    src={it.image}
                    alt={it.alt || it.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 33vw"
                    className={styles.img}
                    priority={false}
                  />
                </div>

                <div className={styles.content}>
                  <Title level={4} className={styles.cardTitle}>
                    {it.title}
                  </Title>

                  <ul className={styles.list}>
                    {it.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TechnicalIntegration;
