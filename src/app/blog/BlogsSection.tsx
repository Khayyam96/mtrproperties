"use client";

import React, { FC, useMemo } from "react";
import { Typography, Row, Col } from "antd";
import BlogCard, { BlogItem } from "@/components/Lib/BlogCard/BlogCard";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";
import type { BlogListResponse, BlogAPIItem } from "./page";

const { Title, Paragraph } = Typography;

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties/";

function buildImgUrl(name?: string | null) {
  if (!name) return "/placeholder.png";
  if (/^https?:\/\//i.test(name)) return name;
  return `${MEDIA_BASE}${name}`.replace(/([^:]\/)\/+/g, "$1");
}

type TProps = {
  data: BlogListResponse;
  className?: string;
};

export const BlogsSection: FC<TProps> = ({ data, className }) => {
  const items: BlogItem[] = useMemo(() => {
    return (data?.data ?? []).map((b: BlogAPIItem) => {
      const t = b.translations?.[0];
      return {
        id: b.id,
        title: t?.title ?? b.slug,
        excerpt: t?.subtitle ?? "",
        category: b.category?.name_EN ?? "—",
        dateISO: b.created_at ?? new Date().toISOString(),
        href: `/blog/${b.slug}`,
        image: buildImgUrl(b.main_image),
        slug: b.slug,
      };
    });
  }, [data]);

  return (
    <section className={`${styles.blogcards} ${className ?? ""}`}>
      <Container>
        <div className={styles.header}>
          <Title level={2} className={styles.h1}>
            Related blogs
          </Title>
          <Paragraph type="secondary" className={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {items.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <BlogCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
