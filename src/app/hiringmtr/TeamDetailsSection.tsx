"use client";

import { FC } from "react";
import { Row, Col, Typography, Card, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Column = {
  title: string;
  items: string[];
};

type Props = {
  teamName?: string;
  description?: string;
  columns?: Column[];           // expects 3 columns
  ctaText?: string;
  ctaHref?: string;             // optional link
  onCta?: () => void;           // or a click handler
  urgencyText?: string;
  className?: string;
};

const defaults: Column[] = [
  {
    title: "Area Highlights:",
    items: [
      "Burj Khalifa vicinity properties",
      "High-value luxury apartments",
      "Premium commercial spaces",
      "International clientele",
    ],
  },
  {
    title: "Requirements",
    items: [
      "2+ years Dubai real estate experience",
      "Luxury property specialization",
      "Fluent English + Arabic preferred",
      "Strong network in Downtown area",
    ],
  },
  {
    title: "Team Benefits:",
    items: [
      "Premium office in DIFC",
      "Exclusive lead access",
      "Luxury vehicle support",
      "International client database",
    ],
  },
];

const TeamDetailsSection: FC<Props> = ({
  teamName = "Downtown Dubai Team",
  description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  columns = defaults,
  ctaText = "Apply Now",
  ctaHref,
  onCta,
  urgencyText = "Urgent hiring - Apply within 48 hours",
  className,
}) => {
  return (
    <section className={`${styles.wrapteam} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {teamName}
          </Title>
          <Paragraph className={styles.sub}>{description}</Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {columns.slice(0, 3).map((col, idx) => (
            <Col key={idx} xs={24} md={12} lg={8}>
              <Card className={styles.card} bordered={false} hoverable>
                <Text strong className={styles.cardTitle}>
                  {col.title}
                </Text>
                <ul className={styles.list}>
                  {col.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          {ctaHref ? (
            <a href={ctaHref} className={styles.btnLink}>
              <Button
                size="large"
                type="primary"
                className={styles.btnDanger}
                icon={<ArrowRightOutlined />}
              >
                {ctaText}
              </Button>
            </a>
          ) : (
            <Button
              size="large"
              type="primary"
              className={styles.btnDanger}
              icon={<ArrowRightOutlined />}
              onClick={onCta}
            >
              {ctaText}
            </Button>
          )}

          <Paragraph className={styles.urgency}>{urgencyText}</Paragraph>
        </div>
      </div>
    </section>
  );
};

export default TeamDetailsSection;
