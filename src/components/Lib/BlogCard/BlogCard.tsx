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
  slug: string;
};

type Props = { item: BlogItem };

export default function BlogCard({ item }: Props) {
  const date = new Date(item.dateISO);
  const displayDate = isNaN(date.getTime())
    ? item.dateISO
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  return (
    <Card
      className={styles.card}
       style={{ 
        borderRadius: '6px',
      }}
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
        <Text className={styles.category}>{item.category}</Text>
        <Text type="secondary" className={styles.date}>
          {displayDate}
        </Text>
      </div>

      <Link href={item.href || `/blog/${item.slug}`} className={styles.titleLink}>
        <h4   style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "200px",
          }} className={styles.title}>{item.title}</h4>
      </Link>

{item.excerpt && <Paragraph  
      style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "250px",
            minHeight: "44px", 
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "0px",
            color: "black",
            paddingTop: "10px",
            marginBottom: "0px",
          }}
           className={styles.excerpt} ellipsis={{ rows: 2 }}>
        {item.excerpt}
      </Paragraph>}
      

      <Link href={`/blog/${item.slug}`} className={styles.readMore}>
        Read more
        <Image src="/nexticon.png" alt="arrow right" width={14} height={14} />
      </Link>
    </Card>
  );
}
