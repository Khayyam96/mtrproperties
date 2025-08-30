"use client";

import { FC, useMemo, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Row, Col, Card, Typography, Rate, Button, Space } from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CommentOutlined,
    LineChartOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Text, Paragraph } = Typography;

type Testimonial = {
    initials: string;
    name: string;
    sales: string;
    rating?: number; // 1..5
    quote: string;
};

type TrendPoint = {
    period: string; // "Jan - Apr 2024"
    deals: number;
    value: string;  // "AED 360M"
};

type Props = {
    headingLeft?: string;
    testimonials?: Testimonial[];
    trendTitle?: string;
    trend?: TrendPoint[];
    growthNote?: string;
    className?: string;
};

const defaultTestimonials: Testimonial[] = [
    {
        initials: "SJ",
        name: "Sarah Johnson",
        sales: "2.5M Sales",
        rating: 5,
        quote:
            "The 100% commission structure changed my life. I've increased my annual income by 40% just by switching to this platform.",
    },
    {
        initials: "SJ",
        name: "Sarah Johnson",
        sales: "2.5M Sales",
        rating: 5,
        quote:
            "The 100% commission structure changed my life. I've increased my annual income by 40% just by switching to this platform.",
    },
    // add more if you like
];

const defaultTrend: TrendPoint[] = [
    { period: "Jan - Apr 2024", deals: 180, value: "AED 360M" },
    { period: "May - Aug 2024", deals: 210, value: "AED 420M" },
    { period: "Sep - Dec 2024", deals: 255, value: "AED 510M" },
];

const StoriesAndTrendSection: FC<Props> = ({
    headingLeft = "Success Stories from Our Top Brokers",
    testimonials,
    trendTitle = "2024 Performance Trend",
    trend,
    growthNote = "+42% growth year-over-year",
    className,
}) => {
    const dataT = useMemo(
        () => (testimonials?.length ? testimonials : defaultTestimonials),
        [testimonials]
    );
    const dataTrend = useMemo(
        () => (trend?.length ? trend : defaultTrend),
        [trend]
    );

    const sliderRef = useRef<Slider | null>(null);

    const settings: Settings = {
        dots: false,
        arrows: false,
        speed: 450,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <section className={`${styles.wraptrend} ${className || ""}`}>
            <div className={styles.container}>
                <Row gutter={[24, 24]} align="top">
                    {/* LEFT: Testimonials + controls */}
                    <Col xs={24} lg={13}>
                        <div className={styles.leftHeader}>
                            <Title level={3} className={styles.leftTitle}>
                                {headingLeft}
                            </Title>

                            <Space className={styles.controls}>
                                <Button
                                    shape="round"
                                    className={styles.ctrlBtn}
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => sliderRef.current?.slickPrev()}
                                />
                                <Button
                                    shape="round"
                                    className={styles.ctrlBtn}
                                    icon={<ArrowRightOutlined />}
                                    onClick={() => sliderRef.current?.slickNext()}
                                />
                            </Space>
                        </div>

                        <Slider ref={sliderRef} {...settings}>
                            {dataT.map((t, i) => (
                                <div key={i} className={styles.slideOuter}>
                                    <Card className={styles.testimonial} bordered={false}>
                                        <div className={styles.tHeader}>
                                            <div className={styles.avatar}>{t.initials}</div>
                                            <div className={styles.meta}>
                                                <Text strong className={styles.name}>
                                                    {t.name}
                                                </Text>
                                                <Text className={styles.sales}>{t.sales}</Text>
                                            </div>
                                            <Rate
                                                value={t.rating ?? 5}
                                                disabled
                                                className={styles.rate}
                                            />
                                        </div>

                                        <div className={styles.quoteRow}>
                                            <CommentOutlined className={styles.quoteIcon} />
                                            <Paragraph className={styles.quoteText}>
                                                {t.quote}
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </Slider>
                    </Col>

                    {/* RIGHT: Trend summary */}
                    <Col xs={24} lg={11}>
                        <Card className={styles.trendCard} bordered>
                            <div className={styles.trendHeader}>
                                <Title level={4} className={styles.trendTitle}>
                                    {trendTitle}
                                </Title>
                            </div>

                            <Row gutter={[24, 16]} justify="space-between">
                                {dataTrend.map((p, i) => (
                                    <Col key={i} xs={24} sm={8}>
                                        <div className={styles.period}>
                                            <Text className={styles.periodLabel}>{p.period}</Text>
                                            <div className={styles.deals}>{p.deals}</div>
                                            <div className={styles.dealsSub}>deals</div>
                                            <div className={styles.value}>{p.value}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <div className={styles.growthBadge}>
                                <LineChartOutlined />
                                <span>{growthNote}</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default StoriesAndTrendSection;
