"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Row, Col, Typography, Card } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Benefit = {
  title: string;
  eyebrow?: string; // yaşıl alt başlıq
  description: string;
};

type Props = {
  className?: string;
  heading?: string;
  bgImage?: string; // public/ içindən yol
  items?: Benefit[];
};

const defaultItems: Benefit[] = [
  {
    title: "Low Entry Threshold",
    eyebrow: "Start from AED 2,000",
    description:
      "Invest in premium Dubai properties with minimal capital requirement. No need for millions to own real estate.",
  },
  {
    title: "Transparent & Secure",
    eyebrow: "Blockchain-powered ownership",
    description:
      "Tamper-proof ownership validation through blockchain technology with full regulatory compliance.",
  },
  {
    title: "Regulated Ecosystem",
    eyebrow: "Government-backed platform",
    description:
      "Fully regulated by Dubai authorities with backing from DLD, VARA, and Dubai Future Foundation.",
  },
  {
    title: "AED Investment",
    eyebrow: "No crypto required",
    description:
      "Invest using traditional AED currency. No need to understand or hold cryptocurrencies.",
  },
  {
    title: "Fast Digital Process",
    eyebrow: "Minutes, not months",
    description:
      "Complete onboarding and transactions in minutes through our streamlined digital platform.",
  },
  {
    title: "Secondary Market Trading",
    eyebrow: "Improved liquidity",
    description:
      "Trade your tokens on secondary markets for improved liquidity compared to traditional real estate.",
  },
];

const AdditionalBenefits: FC<Props> = ({
  className,
  heading = "Additional Benefits",
  bgImage = "/benefits/bg.jpg",
  items,
}) => {
  const data = useMemo(() => items ?? defaultItems, [items]);

  return (
    <section className={`${styles.wrapadditional} ${className || ""}`}>
      {/* Background */}
      <div className={styles.bgWrap} aria-hidden>
        <Image
          src={bgImage}
          alt=""
          fill
          priority={false}
          className={styles.bg}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>

        <Row gutter={[24, 24]}>
          {data.map((it, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card className={styles.card} bodyStyle={{ padding: 20 }}>
                <div className={styles.icon}>
                  <CheckCircleFilled />
                </div>
                <div className={styles.title}>{it.title}</div>
                {it.eyebrow && <div className={styles.eyebrow}>{it.eyebrow}</div>}
                <Paragraph className={styles.text}>{it.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AdditionalBenefits;






