"use client";

import { FC, useMemo } from "react";
import { Row, Col, Card, Tag, Typography } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Stat = {
  value: string;        // "100%", "24/7", "5+", "Grade A"
  title: string;        // "Regulatory Approvals", ...
  subtitle: string;     // "Full compliance achieved", ...
};

type Props = {
  className?: string;
  pillText?: string;
  heading?: string;
  subtext?: string;
  items?: Stat[];
};

const defaultItems: Stat[] = [
  { value: "100%", title: "Regulatory Approvals", subtitle: "Full compliance achieved" },
  { value: "24/7", title: "Legal Audits", subtitle: "Continuous monitoring" },
  { value: "5+",   title: "Security Certifications", subtitle: "International standards" },
  { value: "Grade A", title: "Investor Protection", subtitle: "Highest rating" },
];

const GovRegulated: FC<Props> = ({
  className,
  pillText = "Compliance & Legal Framework",
  heading = "Government-Regulated Platform",
  subtext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  items,
}) => {
  const data = useMemo(() => items ?? defaultItems, [items]);

  return (
    <section className={`${styles.wrapgov} ${className || ""}`}>
      <div className={styles.container}>
        <Tag icon={<SafetyCertificateOutlined />} className={styles.pill}>
          {pillText}
        </Tag>

        <Title level={2} className={styles.heading}>
          {heading}
        </Title>

        <Paragraph className={styles.sub}>{subtext}</Paragraph>

        <Row gutter={[20, 20]} justify="center">
          {data.map((it, i) => (
            <Col key={i} xs={24} sm={12} lg={6}>
              <Card className={styles.card} bodyStyle={{ padding: 18 }}>
                <div className={styles.value}>{it.value}</div>
                <div className={styles.title}>{it.title}</div>
                <div className={styles.subtitle}>{it.subtitle}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default GovRegulated;
