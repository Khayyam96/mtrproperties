"use client";

import React, { FC, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { Typography, Row, Col, Empty } from "antd";
import BlogCard, { BlogItem } from "@/components/Lib/BlogCard/BlogCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import styles from "./index.module.scss";
import CustomPagination from "@/components/Lib/ProPagination/CustomPagination";

const { Title, Paragraph } = Typography;

type RespTranslation =
  | { id: number; lang?: string; title?: string; subtitle?: string }
  | null
  | undefined;

type RespCategory =
  | { id: number | string; name?: string; name_EN?: string }
  | null
  | undefined;

type RespItem = {
  id: number | string;
  created_at?: string | null;
  slug: string;
  main_image?: string | null;
  translation?: RespTranslation;
  translations?: RespTranslation[] | null;
  category?: RespCategory;
};

type BlogListResponse = {
  data: RespItem[];
  page: number;
  per_page: number;
  total: number;
};

type TProps = {
  data: BlogListResponse;
  className?: string;
  currentPage: number; 
};

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties/";

function buildImgUrl(name?: string | null) {
  if (!name) return "/placeholder.png";
  if (/^https?:\/\//i.test(name)) return name;
  return `${MEDIA_BASE}${name}`.replace(/([^:]\/)\/+/g, "$1");
}

export const BlogsSection: FC<TProps> = ({ data, className, currentPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isBlogInner = /^\/blog\/[^/?]+$/.test(pathname || "");

  const items: BlogItem[] = useMemo(() => {
    return (data?.data ?? []).map((b: RespItem) => {
      const t =
        (b.translation as RespTranslation) ||
        (Array.isArray(b.translations) ? b.translations[0] : null);

      const categoryText = b.category?.name ?? b.category?.name_EN ?? "—";

      const dateISO =
        (b.created_at && new Date(b.created_at).toISOString()) ||
        new Date().toISOString();

      return {
        id: b.id,
        title: t?.title ?? b.slug,
        excerpt: t?.subtitle ?? "",
        category: categoryText,
        dateISO,
        href: `/blog/${b.slug}`,
        image: buildImgUrl(b.main_image),
        slug: b.slug,
      };
    });
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil((data?.total ?? 0) / (data?.per_page || 1))
  );

  const handlePageChange = (p: number) => {
    router.push(`/blog?page=${p}`);
  };

  return (
    <section className={`${styles.blogcards} ${className ?? ""}`}>
      <Container>
        <div className={styles.header}>
          <Title level={2} className={styles.h1}>Related blogs</Title>
          <Paragraph type="secondary" className={styles.subtitle}>
            Latest insights, guides, and market updates from our editorial team.
          </Paragraph>
        </div>

        {(items?.length ?? 0) === 0 ? (
          <Empty description="No blogs found" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {items.map((item) => (
                <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                  <BlogCard item={item} />
                </Col>
              ))}
            </Row>

            {!isBlogInner && totalPages > 1 && (
              <div className={styles.paginationWrap}>
                <CustomPagination
                  current={currentPage}
                  total={totalPages}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default BlogsSection;
