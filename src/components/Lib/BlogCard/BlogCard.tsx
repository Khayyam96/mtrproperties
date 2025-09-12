"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, Typography } from "antd";
import styles from "./index.module.scss";

const { Paragraph, Text } = Typography;

export type BlogItem = {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    dateISO: string;
    href?: string;
    image: string;
};

type Props = { item: BlogItem };

export default function BlogCard({ item }: Props) {
    const date = new Date(item.dateISO);
    const displayDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <Card
            className={styles.card}
            bodyStyle={{ padding: 15 }}
            hoverable
            cover={
                <div className={styles.cover}>
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>
            }
        >
            <div className={styles.meta}>
                <Text className={styles.category}>Category</Text>
                <Text type="secondary" className={styles.date}>{displayDate}</Text>
            </div>

            <Link href={item.href || "#"} className={styles.titleLink}>
                <h4 className={styles.title}>{item.title}</h4>
            </Link>

            <Paragraph className={styles.excerpt} ellipsis={{ rows: 2 }}>
                {item.excerpt}
            </Paragraph>

            <Link href={`/blog/${item.id}`} className={styles.readMore}>
                Read more
                <Image
                    src="/nexticon.png"
                    alt="arrow right"
                    width={14}
                    height={14}
                />
            </Link>
        </Card>
    );
}
