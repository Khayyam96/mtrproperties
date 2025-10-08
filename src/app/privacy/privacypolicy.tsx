"use client";

import { FC } from "react";
import { Typography, Row, Col } from "antd";
import Image from "next/image";
import "./index.scss";

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
  description =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
  bgImage = "/hero.png",
  maxWidth = 720,
  className,
}) => {
  return (
    <section
      aria-labelledby="privacy-strip-heading"
      className={`privacy-strip ${className ?? ""}`}
    >
      <div className="privacy-strip__bg">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="privacy-strip__overlay" />

      <Row justify="center" className="privacy-strip__content">
        <Col style={{ width: "100%", maxWidth }}>
          <div className="privacy-strip__inner">
            <Title id="privacy-strip-heading" level={2} className="privacy-strip__title">
              {title}
            </Title>

            {description ? (
              <Paragraph className="privacy-strip__desc">{description}</Paragraph>
            ) : null}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default PrivacyStrip;
