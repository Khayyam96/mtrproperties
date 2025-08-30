"use client";

import { FC, useMemo } from "react";
import { Row, Col, Typography, Button } from "antd";
import {
    UserAddOutlined,
    DatabaseOutlined,
    ShopOutlined,
    DollarCircleFilled,
    ArrowRightOutlined,
} from "@ant-design/icons";
import StepCard, { StepCardProps } from "../../components/Lib/HowItWorks/StepCard";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

export type HowItWorksItem = StepCardProps;

type Props = {
    heading?: string;
    subheading?: string;
    items?: HowItWorksItem[];
    ctaText?: string;
    onCta?: () => void;
    className?: string;
};

const defaults: HowItWorksItem[] = [
    {
        image: "/step1.jpg",
        step: "Step 1",
        title: "Join with us",
        description:
            "Complete our simple onboarding process and get approved to start selling immediately.",
        bullets: ["Quick application", "Background check", "License verification"],
        icon: <UserAddOutlined />,
    },
    {
        image: "/step2.jpg",
        step: "Step 2",
        title: "Access Resources",
        description:
            "Get instant access to our CRM, marketing tools, and comprehensive training materials.",
        bullets: ["Advanced CRM system", "Marketing materials", "Training modules"],
        icon: <DatabaseOutlined />,
    },
    {
        image: "/step3.jpg",
        step: "Step 3",
        title: "Start Selling",
        description:
            "List properties, find buyers, and close deals with our full support every step of the way.",
        bullets: ["Lead generation", "Transaction support", "Compliance assistance"],
        icon: <ShopOutlined />,
    },
    {
        image: "/step4.jpg",
        step: "Step 4",
        title: "Keep Your Commission",
        description:
            "Enjoy 90–100% commission splits with transparent pricing and no hidden fees.",
        bullets: ["90–100% commission", "No hidden fees", "Fast payouts"],
        icon: <DollarCircleFilled />,
    },
];

const HowItWorksSection: FC<Props> = ({
    heading = "How It Works",
    subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    items,
    ctaText = "Join Us Now",
    onCta,
    className,
}) => {
    const data = useMemo(() => (items?.length ? items : defaults), [items]);

    return (
        <section className={`${styles.hiw} ${className || ""}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Title level={1} className={styles.h1}>
                        {heading}
                    </Title>
                    <Paragraph className={styles.sub}>{subheading}</Paragraph>
                </div>
                <Row
                    gutter={[24, 24]}
                    align="stretch"
                    wrap
                    className={styles.grid}
                >
                    {data.map((it, idx) => (
                        <Col
                            key={it.title}
                            xs={24}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            xxl={6}
                            className={styles.col}
                        >
                            <div style={{ height: "100%" }}>
                                <StepCard {...it} className="h-full" />
                            </div>

                            {idx < data.length - 1 && (
                                <div className={styles.connector} aria-hidden>
                                    <span>→</span>
                                </div>
                            )}
                        </Col>
                    ))}
                </Row>

                <div className={styles.cta}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        onClick={onCta}
                    >
                        {ctaText}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
