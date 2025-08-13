"use client";

import { FC } from "react";
import { Row, Col, Typography, Button } from "antd";
import Image from "next/image";
import classNames from "classnames";
import "./index.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph } = Typography;

export type ShowcaseItem = {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt?: string;
    imageLeft?: boolean;            // true => görsel solda (2. satırdaki gibi)
    cta?: { label: string; href?: string; onClick?: () => void };
};

type Props = {
    className?: string;
    items?: ShowcaseItem[];
};

const defaults: ShowcaseItem[] = [
    {
        title: "Upcoming property by Developer",
        paragraphs: [
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
            "It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature",
            "making it over 2000 years old. ext. It has roots in a piece Lorem Ipsum is not simply random text making it over 2000 years old. ext. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum",
        ],
        imageSrc: "/i1.png",
        imageAlt: "Modern building"
    },
    {
        title: "Upcoming property by Developer",
        paragraphs: [
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ext.",
        ],
        imageSrc: "/i2.png",
        imageAlt: "Interior",
        imageLeft: true,
        cta: { label: "Download Brochure" }
    },
];

const DeveloperShowcase: FC<Props> = ({ className, items = defaults }) => {
    return (
        <section className={classNames("developer-showcase", className)}>
            <Container>
                {items.map((item, idx) => {
                    const reverse = !!item.imageLeft;
                    return (
                        <div className="showcase-block" key={idx}>
                            <Row gutter={[24, 24]} align="middle" wrap>
                                <Col xs={24} md={12} order={reverse ? 1 : 3}>
                                    <div className="ubd-image">
                                        <Image
                                            src={item.imageSrc}
                                            alt={item.imageAlt || "image"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="img"
                                            priority={idx === 0}
                                        />
                                    </div>
                                </Col>

                                <Col xs={24} md={12} order={reverse ? 3 : 1}>
                                    <div className="ubd-text">
                                        <Title level={2} className="ubd-title">
                                            {item.title}
                                        </Title>
                                        {item.paragraphs.map((p, i) => (
                                            <Paragraph key={i} className="ubd-paragraph">
                                                {p}
                                            </Paragraph>
                                        ))}

                                        {item.cta && (
                                            <Button
                                                size="large"
                                                className="ubd-btn"
                                                href={item.cta.href}
                                                onClick={item.cta.onClick}
                                            >
                                                {item.cta.label}
                                            </Button>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </Container>
        </section>
    );
};

export default DeveloperShowcase;
