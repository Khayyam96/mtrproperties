"use client";

import { FC, useMemo } from "react";
import { Row, Col, Typography, Card, Space } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type StatItem = { value: string; label: string; note?: string };

type Props = {
  eyebrow?: string;      
  heading?: string;     
  subheading?: string;
  items?: StatItem[];    
  className?: string;
};

const defaultItems: StatItem[] = [
  { value: "4.9/5",    label: "Average Rating",       note: "From 500+ reviews" },
  { value: "98%",      label: "Agents Satisfaction",  note: "Would recommend us" },
  { value: "10,000+",  label: "Active Agents",        note: "And growing daily" },
  { value: "AED 2.5B+",label: "Total Sales",          note: "In the last year" },
];

const StatsSection: FC<Props> = ({
  eyebrow = "Trusted by Thousands",
  heading = "What Our Brokers Say",
  subheading = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  items,
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

          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <Row gutter={[20, 20]} align="stretch">
          {data.map((it, i) => (
            <Col key={i} xs={24} sm={12} lg={6}>
              <Card hoverable className={styles.card} style={{ height: "100%" }}>
                <div className={styles.cardInner}>
                  <Title level={2} className={styles.value}>
                    {it.value}
                  </Title>
                  <Text strong className={styles.label}>{it.label}</Text>
                  {it.note && <Paragraph className={styles.note}>{it.note}</Paragraph>}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StatsSection;
