"use client";

import { FC } from "react";
import { Row, Col, Typography, Space } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Metric = {
  value: string;        // e.g. "150+"
  label: string;        // e.g. "Active Brokers"
  caption?: string;     // e.g. "Growing team"
  color?: "blue" | "green" | "red" | "purple" | string; // custom hex or preset
};

type Props = {
  eyebrow?: string;     // pill text
  heading?: string;
  subheading?: string;
  metrics?: Metric[];   // 3–6 items are fine
  className?: string;
};

const defaults: Metric[] = [
  { value: "150+", label: "Active Brokers", caption: "Growing team", color: "blue" },
  { value: "2,450", label: "Properties Sold", caption: "Total deals closed in 2024", color: "green" },
  { value: "AED 2.5B", label: "Total Deal Value", caption: "Combined property value", color: "red" },
  { value: "98%", label: "Client Satisfaction", caption: "Customer happiness score", color: "purple" },
];

const SuccessMetricsSection: FC<Props> = ({
  eyebrow = "Success Metrics",
  heading = "Proven Success & Recognition",
  subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  metrics = defaults,
  className,
}) => {
  return (
    <section className={`${styles.wrapmetrics} ${className || ""}`}>
      <div className={styles.container}>
        {/* Eyebrow pill */}
        <div className={styles.pillWrap}>
          <Space className={styles.pill} size={8}>
            <SafetyCertificateOutlined />
            <Text strong>{eyebrow}</Text>
          </Space>
        </div>

        {/* Heading + sub */}
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* KPIs */}
        <Row gutter={[24, 24]} justify="center">
          {metrics.map((m, i) => {
            // allow custom hex/rgb colors; fallback to preset classes
            const colorClass =
              ["blue", "green", "red", "purple"].includes(String(m.color))
                ? styles[`${m.color}` as "blue" | "green" | "red" | "purple"]
                : "";

            return (
              <Col key={i} xs={12} md={6}>
                <div className={styles.kpi}>
                  <div
                    className={`${styles.value} ${colorClass}`}
                    style={colorClass ? undefined : { color: m.color as string }}
                  >
                    {m.value}
                  </div>
                  <Text strong className={styles.label}>
                    {m.label}
                  </Text>
                  {m.caption && (
                    <Paragraph className={styles.caption}>{m.caption}</Paragraph>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default SuccessMetricsSection;
