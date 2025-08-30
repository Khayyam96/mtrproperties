"use client";

import { FC, ReactNode, useMemo } from "react";
import { Row, Col, Typography, Button, Card, Space } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ThunderboltFilled,
  RiseOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph, Text } = Typography;

type Plan = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  icon?: ReactNode;
  tone?: "blue" | "purple";
};

type Props = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaText?: string;
  onCta?: () => void;
  plans?: Plan[];
  className?: string;
};

const defaults: Plan[] = [
  {
    key: "instant",
    title: "90% Commission",
    subtitle: "MTR Instant",
    description:
      "Perfect for consistent cash flow and immediate access to your earnings",
    points: [
      "Receive 90% of commission immediately",
      "Steady cash flow for business operations",
      "No waiting for property owner payments",
      "Ideal for active brokers with regular deals",
    ],
    icon: (
      <Image
        src="/gggg.png"
        alt="Instant commission"
        width={28}
        height={28}
        className={styles.planIcon}
      />
    ),
    tone: "blue",
  },
  {
    key: "wait",
    title: "100% Commission",
    subtitle: "MTR Wait",
    description:
      "Maximize your earnings with full commission once property owner releases payment",
    points: [
      "Keep 100% of the commission earned",
      "Payment after property owner payment clears",
      "No company deductions from commission",
      "Best for patient brokers with financial stability",
    ],
    icon: (
      <Image
        src="/kkkkk.png"
        alt="Max commission"
        width={28}
        height={28}
        className={styles.planIcon}
      />
    ),
    tone: "purple",
  },
];

const EarningPotentialSection: FC<Props> = ({
  eyebrow = "Commission & Benefits",
  heading = "Discover Your Earning Potential at MTR Properties",
  body = `Our flexible commission model empowers you to choose the payment structure that best suits your business needs.
Whether you prefer immediate cash flow or maximum earnings, we've got you covered.`,
  ctaText = "View More",
  onCta,
  plans,
  className,
}) => {
  const data = useMemo(() => (plans?.length ? plans : defaults), [plans]);

  return (
    <section className={`${styles.wrapearning} ${className || ""}`}>
      <Container>
        <div className={styles.container}>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={10}>
              <Space className={styles.pill} size={8}>
                <Image
                  src="/greencheck.png"
                  alt="Commission & Benefits"
                  width={18}
                  height={18}
                  className={styles.pillIcon}
                />
                <Text strong>{eyebrow}</Text>
              </Space>

              <Title level={1} className={styles.h1}>
                {heading}
              </Title>

              <Paragraph className={styles.lead}>{body}</Paragraph>

              <Button
                type="primary"
                size="large"
                className={styles.cta}
                onClick={onCta}
              >
                {ctaText}<ArrowRightOutlined />
              </Button>
            </Col>

            <Col xs={24} lg={14}>
              <Row gutter={[24, 24]}>
                {data.map((p) => (
                  <Col key={p.key} xs={24} md={12}>
                    <Card
                      className={`${styles.planCard} ${p.tone === "purple" ? styles.purpleTone : styles.blueTone
                        }`}
                      bordered={false}
                      hoverable
                    >
                      <div className={styles.iconBadge}>{p.icon}</div>
                      <Title level={3} className={styles.planTitle}>
                        {p.title}
                      </Title>
                      <Text className={styles.planSub} strong>
                        {p.subtitle}
                      </Text>
                      <Paragraph className={styles.planDesc}>
                        {p.description}
                      </Paragraph>

                      <ul className={styles.pointList}>
                        {p.points.map((pt, i) => (
                          <li key={i}>
                            <CheckCircleOutlined className={styles.check} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default EarningPotentialSection;
