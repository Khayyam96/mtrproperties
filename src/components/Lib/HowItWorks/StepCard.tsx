"use client";

import { FC, ReactNode } from "react";
import { Card, Typography } from "antd";
import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

export type StepCardProps = {
  image: string;          // /public içindən gələcək
  step: string;           // "Step 1"
  title: string;          // Bold başlıq
  description: string;
  bullets?: string[];     // Yaşıl check-lərlə maddələr
  icon?: ReactNode;       // Step badge içindəki ikon
  className?: string;
};

const StepCard: FC<StepCardProps> = ({
  image,
  step,
  title,
  description,
  bullets = [],
  icon,
  className,
}) => {
  return (
    <Card className={`${styles.card} ${className || ""}`} hoverable>
      {/* Üst şəkil + Step badge */}
      <div className={styles.thumbWrap}>
        <Image src={image} alt={title} fill className={styles.thumb} />
        <div className={styles.stepBadge}>
          <span className={styles.badgeIcon}>{icon}</span>
          <span className={styles.badgeText}>{step}</span>
        </div>
      </div>

      {/* Məzmun */}
      <div className={styles.body}>
        <Title level={3} className={styles.cardTitle}>
          {title}
        </Title>
        <Paragraph className={styles.cardDesc}>{description}</Paragraph>

        {!!bullets.length && (
          <ul className={styles.bullets}>
            {bullets.map((b, i) => (
              <li key={i}>
                <CheckCircleOutlined />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default StepCard;
