"use client";

import Link from "next/link";
import Image from "next/image";
import { Tag, Button, Typography } from "antd";
import { RightOutlined, CalendarOutlined } from "@ant-design/icons";
import cls from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph, Text } = Typography;

export type BlogHeroProps = {
    image: string;
    title: string;
    excerpt: string;
    category: string;
    dateISO: string;
    href?: string;
    className?: string;
    sectionTitle?: string;
};

export default function BlogHero({
    image,
    title,
    excerpt,
    category,
    dateISO,
    href = "#",
    className,
    sectionTitle = "Blogs / News",
}: BlogHeroProps) {
    const date = new Date(dateISO);
    const displayDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <section className={`${cls.blogHeroSection} ${className ?? ""}`}>
            <Container>
                <div className={cls.sectionHeader}>
                    <Title level={4}>{sectionTitle}</Title>
                </div>

                <div className={cls.blogHero}>
                    <div className={cls.mediaWrap} aria-hidden>
                        <Image
                            src={image}
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 1200px) 1100px, 100vw"
                            className={cls.bgImage}
                        />
                    </div>

                    <div className={cls.overlayCard}>
                        <div className={cls.metaRow}>
                            <Tag className={cls.category} bordered={false}>
                                {category}
                            </Tag>
                            <Text className={cls.date} aria-label={`Published ${displayDate}`}>
                                <CalendarOutlined /> {displayDate}
                            </Text>
                        </div>

                        <Title level={2} className={cls.title}>
                            {title}
                        </Title>

                        <Paragraph className={cls.excerpt}>{excerpt}</Paragraph>

                        <Link href={href} aria-label="Read more">
                            <Button type="primary" size="large" className={cls.readBtn}>
                                Read more
                                <Image
                                    src="/buttonicon.png"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className={cls.btnIcon}
                                />
                            </Button>
                        </Link>

                    </div>
                </div>
            </Container>
        </section>
    );
}

export const mockBlogHero: BlogHeroProps = {
    image: "/hero.jpg",
    title: "Heading of the blog",
    excerpt: "Many desktop publishing packages and web page editors now.",
    category: "Category",
    dateISO: "2023-01-04",
    href: "/blog/heading-of-the-blog",
    sectionTitle: "Blogs / News",
};
