"use client";

import { FC } from "react";
import Image from "next/image";
import { Row, Col, Typography, Card } from "antd";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph, Text } = Typography;

type KPI = { value: string; label: string };
type ImgCard = {
  title?: string;
  text?: string;
  image?: string;      
  imageAlt?: string;
  tall?: boolean;    
};

type Props = {
  heading?: string;
  subheading?: string;
  kpis?: KPI[];
  className?: string;
};

const SuccessFrameworkSection: FC<Props> = ({
  heading = "Our Success Framework",
  subheading =
  "We don’t just provide tools – we create an environment where ambitious brokers can thrive, grow, and achieve their professional goals.",
  kpis = [
    { value: "150+", label: "Active Brokers" },
    { value: "AED 500k+", label: "Avg Annual Income" },
    { value: "8", label: "Office Locations" },
    { value: "94%", label: "Success Rate" },
  ],
  className,
}) => {
  const ImgCardBlock: FC<ImgCard> = ({ title, text, image, imageAlt, tall }) => (
    <Card className={styles.card} hoverable>
      {image && (
        <div className={styles.imgWrap} style={{ height: tall ? 210 : 180 }}>
          <Image
            src={image}
            alt={imageAlt || title || "image"}
            fill
            className={styles.img}
            sizes="(max-width: 992px) 100vw, 32vw"
            priority={false}
          />
        </div>
      )}
      {(title || text) && (
        <div className={styles.cardBody}>
          {title && (
            <Text strong className={styles.cardTitle}>
              {title}
            </Text>
          )}
          {text && <Paragraph className={styles.cardText}>{text}</Paragraph>}
        </div>
      )}
    </Card>
  );

  return (
    <section className={`${styles.wrapframwork} ${className || ""}`}>
      <Container>
        <div className={styles.container}>

          <div className={styles.header}>
            <Title level={1} className={styles.h1}>
              {heading}
            </Title>
            <Paragraph className={styles.sub}>{subheading}</Paragraph>
          </div>

          <Row gutter={[24, 16]} className={styles.kpis}>
            {kpis.map((k) => (
              <Col key={k.label} xs={12} md={6}>
                <div className={styles.kpi}>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <div className={styles.kpiLabel}>{k.label}</div>
                </div>
              </Col>
            ))}
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card className={styles.textBlock}>
                <Text strong className={styles.textBlockTitle}>
                  Why Work With Us
                </Text>
                <Paragraph className={styles.textBlockText}>
                  At MTR Properties, we provide comprehensive support and resources
                  to help our brokers achieve exceptional results and build thriving
                  careers in Dubai’s dynamic real estate market.
                </Paragraph>
              </Card>

              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Visa support"
                title="Visa & Administrative Support"
                text="Complete visa assistance and administrative support for hassle-free operations"
              />

              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Office space"
                title="Dedicated Office Space"
                text="Premium office locations in Dubai’s business districts with modern facilities"
              />
            </Col>

            <Col xs={24} lg={8}>
              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Professional tools"
                title="Professional Tools & Equipment"
                text="Latest technology and equipment to enhance your productivity"
              />

              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Professional tools"
                title="Professional Tools & Equipment"
                text="Latest technology and equipment to enhance your productivity"
              />

              <Card className={styles.bannerCard}>
                <Paragraph className={styles.bannerText}>
                  <strong>Join a MTR Properties</strong> that invests in your
                  success from day one
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card className={styles.textBlock}>
                <Paragraph className={styles.textBlockText}>
                  At MTR Properties, we provide comprehensive support and resources
                  to help our brokers achieve exceptional results and build thriving
                  careers in Dubai’s dynamic real estate market.
                </Paragraph>
              </Card>

              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Marketing media"
                title="Marketing Videos & Photos"
                text="Professional marketing materials for property listings and client presentations"
              />

              <ImgCardBlock
                image="/hiringimg.png"
                imageAlt="Driver support"
                title="Driver Support & Transportation"
                text="Dedicated driver support for property viewings and client meetings"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SuccessFrameworkSection;
