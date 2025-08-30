"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Row, Col, Card, Typography } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Agency = {
  title: string;
  subtitle: string;
  bullets: string[];
  logo: string;            // /public/reg/...
  logoAlt?: string;
  website?: string;
  badgeText?: string;
  badgeColor?: string;     // hex (text color). bg auto from rgba below.
};

type Props = {
  className?: string;
  heading?: string;
  items?: Agency[];
};

const defaults: Agency[] = [
  {
    title: "Dubai Land Department",
    subtitle: "Property Registration & Title Deed Management",
    bullets: [
      "Property title deed validation",
      "Ownership transfer registration",
      "Property valuation oversight",
      "Legal compliance monitoring",
    ],
    logo: "/reg/dld.png",
    logoAlt: "Dubai Land Department",
    website: "#",
    badgeText: "Registered Platform",
    badgeColor: "#16a34a",
  },
  {
    title: "Virtual Assets Regulatory Authority",
    subtitle: "Blockchain Technology & Digital Asset Oversight",
    bullets: [
      "Blockchain technology approval",
      "Digital asset compliance",
      "Smart contract auditing",
      "Virtual asset trading regulation",
    ],
    logo: "/reg/vara.png",
    logoAlt: "VARA",
    website: "#",
    badgeText: "VARA Compliant",
    badgeColor: "#2563eb",
  },
  {
    title: "Dubai Future Foundation",
    subtitle: "Innovation Strategy & Digital Transformation",
    bullets: [
      "Digital economy strategy alignment",
      "Innovation framework guidance",
      "Future technology integration",
      "Strategic vision implementation",
    ],
    logo: "/reg/dff.png",
    logoAlt: "Dubai Future Foundation",
    website: "#",
    badgeText: "Innovation Partner",
    badgeColor: "#7c3aed",
  },
];

const RegulatoryOversight: FC<Props> = ({
  className,
  heading = "Regulatory Oversight",
  items,
}) => {
  const data = useMemo(() => items ?? defaults, [items]);

  return (
    <section className={`${styles.wrapoversight} ${className || ""}`}>
      <div className={styles.container}>
        <Title level={3} className={styles.heading}>
          {heading}
        </Title>

        <Row gutter={[24, 24]}>
          {data.map((ag, i) => (
            <Col key={i} xs={24} md={12} lg={8}>
              <Card className={styles.card} bodyStyle={{ padding: 20 }}>
                <div className={styles.logoWrap}>
                  <Image
                    src={ag.logo}
                    alt={ag.logoAlt || ag.title}
                    fill
                    className={styles.logo}
                    sizes="(max-width: 991px) 100vw, 33vw"
                    priority={false}
                  />
                </div>

                {ag.badgeText && (
                  <div
                    className={styles.badge}
                    style={{
                      color: ag.badgeColor,
                      backgroundColor: "rgba(37, 99, 235, 0)", // base (ignored)
                      borderColor: `${ag.badgeColor}33`, // 20% border
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: `${ag.badgeColor}1a`, // 10% bg
                      }}
                      className={styles.badgeInner}
                    >
                      {ag.badgeText}
                    </span>
                  </div>
                )}

                <div className={styles.title}>{ag.title}</div>
                <div className={styles.subtitle}>{ag.subtitle}</div>

                <ul className={styles.list}>
                  {ag.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>

                {ag.website && (
                  <a href={ag.website} target="_blank" rel="noreferrer" className={styles.siteBtn}>
                    <ExportOutlined /> Go to Website
                  </a>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default RegulatoryOversight;
