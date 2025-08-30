"use client";

import { FC, useMemo } from "react";
import { Row, Col, Card, Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Block = {
  key: string;
  title: string;         // Residents Mortgage / Non-Residents Mortgage
  desc: string;          // sol tərəf qısa izah
  featuresTitle?: string;
  features: string[];    // sağ 1-ci kart
  docsTitle?: string;
  docs: string[];        // sağ 2-ci kart
};

type Props = {
  heading?: string;
  subheading?: string;
  betweenNote?: string;     // iki blok arasında göstərilən cümlə (istəyə görə)
  blocks?: Block[];         // override üçün
  className?: string;
};

const defaults: Block[] = [
  {
    key: "residents",
    title: "Residents Mortgage",
    desc: "UAE Citizens and expatriates with a valid UAE Residence Visa.",
    featuresTitle: "Key Features",
    features: [
      "Higher maximum loan-to-value (up to 80%).",
      "Longer tenure (up to 25 years, subject to age).",
      "Local income or employment proof required.",
      "Faster bank processing and approval.",
    ],
    docsTitle: "Typical Required Documents",
    docs: [
      "Emirates ID, Passport, UAE Residence Visa",
      "Salary certificate or UAE business documentation",
      "Recent UAE bank statements",
    ],
  },
  {
    key: "non-residents",
    title: "Non-Residents Mortgage",
    desc: "Foreign nationals without UAE residency, investing from abroad.",
    featuresTitle: "Key Features",
    features: [
      "Lower loan-to-value (60–70% commonly allowed).",
      "Shorter loan tenure (15–20 years typical).",
      "Income proof from home country needed.",
      "Stricter eligibility checks, limited lender options.",
    ],
    docsTitle: "Typical Required Documents",
    docs: [
      "Valid passport",
      "International income proof (salary slips, bank statements)",
      "International credit report (sometimes requested)",
    ],
  },
];

const ResidentsVsNonResidents: FC<Props> = ({
  heading = "About Residents and Non-Residents Mortgage",
  subheading =
    "Understand the difference in mortgage eligibility, required documents, and process for UAE Residents and Non-Residents. Find out what you need before applying.",
  betweenNote = subheading, // screenshot-da arada eyni cümlə təkrarlanır
  blocks,
  className,
}) => {
  const data = useMemo(() => (blocks?.length ? blocks : defaults), [blocks]);

  return (
    <section className={`${styles.wrapresidents} ${className || ""}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Blocks */}
        {data.map((b, idx) => (
          <div key={b.key} className={styles.block}>
            <Row gutter={[24, 24]} align="stretch">
              {/* Left text */}
              <Col xs={24} lg={6}>
                <div className={styles.left}>
                  <Title level={3} className={styles.leftTitle}>
                    {b.title}
                  </Title>
                  <Paragraph className={styles.leftDesc}>{b.desc}</Paragraph>
                </div>
              </Col>

              {/* Features card */}
              <Col xs={24} lg={9}>
                <Card bordered className={styles.infoCard}>
                  <Text strong className={styles.cardHeading}>
                    {b.featuresTitle || "Key Features"}
                  </Text>
                  <ul className={styles.list}>
                    {b.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </Card>
              </Col>

              {/* Docs card */}
              <Col xs={24} lg={9}>
                <Card bordered className={styles.infoCard}>
                  <Text strong className={styles.cardHeading}>
                    {b.docsTitle || "Typical Required Documents"}
                  </Text>
                  <ul className={styles.list}>
                    {b.docs.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
            </Row>

            {/* Aradakı təkrar mətn (istəyə görə göstər) */}
            {idx === 0 && betweenNote && (
              <Paragraph className={styles.note}>{betweenNote}</Paragraph>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResidentsVsNonResidents;
