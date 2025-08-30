"use client";

import { FC, useMemo, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Card, Rate, Space, Typography, Avatar } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Testimonial = {
  name: string;
  sales?: string;     
  rating?: number;    
  text: string;
  color?: string;     
};

type Props = {
  eyebrow?: string;  
  heading?: string;   
  subheading?: string;
  items?: Testimonial[];
  summaryScore?: string;  
  summaryNote?: string;   
  className?: string;
};

const defaults: Testimonial[] = [
  {
    name: "Sarah Johnson",
    sales: "2.5M Sales",
    rating: 5,
    text:
      '“The 100% commission structure changed my life. I\'ve increased my annual income by 40% just by switching to this platform.”',
    color: "#6b2ae6",
  },
  {
    name: "Michael Lee",
    sales: "1.8M Sales",
    rating: 5,
    text:
      "“Transparent fees and an amazing community. The onboarding was smooth and the tools are top-notch.”",
    color: "#ff6b6b",
  },
  {
    name: "Aisha Khan",
    sales: "3.2M Sales",
    rating: 5,
    text:
      "“Marketing resources + support team = more closed deals. Highly recommended for ambitious agents.”",
    color: "#26a69a",
  },
  {
    name: "David Park",
    sales: "2.1M Sales",
    rating: 5,
    text:
      "“Instant payouts improved my cash flow immediately. Best move I’ve made in years.”",
    color: "#3b82f6",
  },
  {
    name: "Elena Rossi",
    sales: "2.9M Sales",
    rating: 5,
    text:
      "“CRM, training, and community—everything I need in one place. My productivity skyrocketed.”",
    color: "#f59e0b",
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const TestimonialsCarouselSection: FC<Props> = ({
  eyebrow = "Trusted by Thousands",
  heading = "Firsthand Experiences and Success Stories from Our Top Brokers",
  subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  items,
  summaryScore = "4.9 out of 5",
  summaryNote = "Based on 500+ verified reviews from our broker network",
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaults), [items]);
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 450,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className={`${styles.wrap} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <Space className={styles.eyebrow} size={8}>
              <SafetyCertificateOutlined />
              <Text strong>{eyebrow}</Text>
            </Space>
            <Title level={2} className={styles.h2}>
              {heading}
            </Title>
            <Paragraph className={styles.sub}>{subheading}</Paragraph>
          </div>

          <div className={styles.navBtns} aria-label="carousel navigation">
            <Button
              shape="circle"
              className={styles.navBtn}
              icon={<LeftOutlined />}
              onClick={() => sliderRef.current?.slickPrev()}
            />
            <Button
              shape="circle"
              className={styles.navBtn}
              icon={<RightOutlined />}
              onClick={() => sliderRef.current?.slickNext()}
            />
          </div>
        </div>

        <div className={styles.sliderWrap}>
          <Slider ref={sliderRef} {...settings} className={styles.slider}>
            {data.map((t, idx) => (
              <div key={idx} className={styles.slide}>
                <Card className={styles.card} bordered={false} hoverable>
                  <div className={styles.topRow}>
                    <Space size={14} className={styles.userInfo}>
                      <Avatar
                        size={44}
                        style={{ background: t.color || "#6b2ae6" }}
                      >
                        {initialsOf(t.name)}
                      </Avatar>
                      <div className={styles.nameBlock}>
                        <Text strong className={styles.name}>
                          {t.name}
                        </Text>
                        {t.sales && (
                          <a className={styles.sales} href="#">
                            {t.sales}
                          </a>
                        )}
                      </div>
                    </Space>

                    <Rate
                      disabled
                      defaultValue={t.rating || 5}
                      className={styles.rate}
                    />
                  </div>

                  <div className={styles.quoteRow}>
                    <span className={styles.quoteMark}>“</span>
                    <Paragraph className={styles.text}>{t.text}</Paragraph>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles.summary}>
          <div className={styles.stars}>
            <Rate disabled defaultValue={5} />
          </div>
          <Title level={4} className={styles.score}>
            {summaryScore}
          </Title>
          <Paragraph className={styles.note}>{summaryNote}</Paragraph>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarouselSection;
