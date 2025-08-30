"use client";

import { FC } from "react";
import { Typography, Row, Col } from "antd";
import Image from "next/image";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  title?: string;
  description?: string;
  bgImage?: string;
  maxWidth?: number;
  className?: string;
};

const PrivacyStrip: FC<Props> = ({
  title = "Privacy policy",
  description = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
  bgImage = "/hero.png", 
  maxWidth = 700,
  className,
}) => {
  return (
    <section
      aria-labelledby="privacy-strip-heading"
      className={`${styles.strip} ${className || ""}`}
    >
      {/* Background image */}
      <div className={styles.bgImage}>
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <Row justify="center" className={styles.content}>
        <Col xs={24}>
          <div className={styles.inner} style={{ maxWidth }}>
            <Title id="privacy-strip-heading" level={3} className={styles.title}>
              {title}
            </Title>
            <Paragraph className={styles.desc}>{description}</Paragraph>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default PrivacyStrip;
