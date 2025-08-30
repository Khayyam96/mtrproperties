"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { Row, Col, Card, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Item = {
  title: string;
  description: string;
  ctaText: string;
  href?: string;                 // Link verilərsə Link kimi çıxacaq
  onClick?: () => void;          // Yoxdursa click handler istifadə oluna bilər
};

type Props = {
  heading?: string;              // "About MTR Properties"
  subheading?: string;
  items?: Item[];
  className?: string;
};

const defaultItems: Item[] = [
  {
    title: "More About us",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ctaText: "Read more",
    href: "#",
  },
  {
    title: "Contact Us",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ctaText: "Contact Us",
    href: "#",
  },
  {
    title: "Our Agents",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ctaText: "View More",
    href: "#",
  },
];

const AboutMTRSection: FC<Props> = ({
  heading = "About MTR Properties",
  subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  items,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaultItems), [items]);

  return (
    <section className={`${styles.wrap} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <Row gutter={[24, 24]} align="stretch">
          {data.map((it, idx) => (
            <Col key={idx} xs={24} md={12} lg={8}>
              <Card className={styles.card} hoverable style={{ height: "100%" }}>
                <div className={styles.cardInner}>
                  <Title level={3} className={styles.cardTitle}>
                    {it.title}
                  </Title>
                  <Paragraph className={styles.cardText}>{it.description}</Paragraph>

                  {it.href ? (
                    <Link href={it.href} className={styles.btnLink}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        className={styles.btn}
                      >
                        {it.ctaText}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      icon={<ArrowRightOutlined />}
                      className={styles.btn}
                      onClick={it.onClick}
                    >
                      {it.ctaText}
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutMTRSection;
