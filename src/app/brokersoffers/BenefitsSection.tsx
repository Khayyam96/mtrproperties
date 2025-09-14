"use client";

import { FC, ReactNode, useMemo } from "react";
import { Row, Col, Card, Typography, Button, Space } from "antd";
import {
  IdcardOutlined,
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

export type BenefitItem = {
  key: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

type Props = {
  eyebrow?: string; // "Why Choose Us"
  heading?: string; // "Benefits That Set Us Apart"
  subheading?: string;
  items?: BenefitItem[];
  ctaText?: string;
  onCta?: () => void;
  className?: string;
};

const defaultItems: BenefitItem[] = [
  {
    key: "commission",
    title: "Keep 90-100% Commission",
    description:
      "Revolutionary commission structure that lets you keep what you earn. No hidden fees or caps.",
    icon: <IdcardOutlined />,
  },
  {
    key: "earning",
    title: "Unlimited Earning Potential",
    description:
      "No monthly caps or limits. The more you sell, the more you keep. Your success drives your income.",
    icon: <HomeOutlined />,
  },
  {
    key: "recognition",
    title: "Industry Recognition",
    description:
      "Be part of an award-winning brokerage with a reputation for excellence and innovation.",
    icon: <UserOutlined />,
  },
  {
    key: "community",
    title: "Thriving Community",
    description:
      "Join a network of successful brokers sharing insights, referrals, and growth opportunities.",
    icon: <ContactsOutlined />,
  },
];

const BenefitsSection: FC<Props> = ({
  eyebrow = "Why Choose Us",
  heading = "Benefits That Set Us Apart",
  subheading = "Discover why thousands of brokers have made the switch to our revolutionary platform",
  items,
  ctaText = "Contact Us",
  onCta,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaultItems), [items]);

  return (
    <section className={`${styles.wrap} ${className || ""}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Space className={styles.eyebrow} size={8}>
            <SafetyCertificateOutlined />
            <Text strong>{eyebrow}</Text>
          </Space>

          <Title level={1} className={styles.title}>
            {heading}
          </Title>

          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Grid */}
        <Row gutter={[24, 24]}>
          {data.map((it) => (
            <Col key={it.key} xs={24} sm={12} lg={6}>
              <Card hoverable className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.iconWrap} aria-hidden>
                    {it.icon}
                  </div>
                  <div className={styles.meta}>
                    <Title level={4} className={styles.cardTitle}>
                      {it.title}
                    </Title>
                    <Paragraph className={styles.cardText}>
                      {it.description}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className={styles.cta}>
          <Paragraph className={styles.ctaText}>
            Do you want to know more details contact our expert
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
