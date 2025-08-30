"use client";

import { FC, useMemo } from "react";
import { Card, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Props = {
  className?: string;
  heading?: string;
  infoText?: string;
  propertyValueAED?: number; // 1_800_000
  propertySubtitle?: string; // "Premium Dubai real estate"
  tokenCount?: number; // 900
  tokenPriceAED?: number; // 2000
  tokenSubtitle?: string; // "AED 2,000 each"
  ctaText?: string;
  onContact?: () => void;
};

const fmtCompact = (n: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

const OwnershipSimple: FC<Props> = ({
  className,
  heading = "Ownership Made Simple",
  infoText = "Each token represents 0.004% ownership of the property. Buy as few as 1 token or as many as you want!",
  propertyValueAED = 1_800_000,
  propertySubtitle = "Premium Dubai real estate",
  tokenCount = 900,
  tokenPriceAED = 2000,
  tokenSubtitle = "AED 2,000 each",
  ctaText = "Contact Us",
  onContact,
}) => {
  const propertyTitle = useMemo(
    () => `AED ${fmtCompact(propertyValueAED)} Property`,
    [propertyValueAED]
  );
  const tokenTitle = useMemo(() => `${tokenCount} Tokens`, [tokenCount]);

  return (
    <section className={`${styles.wrapowner} ${className || ""}`}>
      <div className={styles.container}>
        {/* Bordered panel */}
        <div className={styles.panel}>
          <Title level={3} className={styles.heading}>
            {heading}
          </Title>

          <div className={styles.infoPill}>
            <Text className={styles.infoText}>{infoText}</Text>
          </div>

          {/* Cards + Arrow */}
          <div className={styles.flow}>
            <Card className={styles.card} bodyStyle={{ padding: 16 }}>
              <div className={styles.cardTitle}>{propertyTitle}</div>
              <div className={styles.cardSub}>{propertySubtitle}</div>
            </Card>

            <div className={styles.arrow} aria-hidden>
              <ArrowRightOutlined />
            </div>

            <Card className={styles.card} bodyStyle={{ padding: 16 }}>
              <div className={styles.cardTitle}>{tokenTitle}</div>
              <div className={styles.cardSub}>{tokenSubtitle || `AED ${tokenPriceAED.toLocaleString()} each`}</div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaBlock}>
          <Paragraph className={styles.ctaText}>
            Do you want to know more details contact our expert
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className={styles.ctaBtn}
            icon={<ArrowRightOutlined />}
            onClick={onContact}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OwnershipSimple;
