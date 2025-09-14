"use client";

import { useMemo, useState, useEffect } from "react";
import { Row, Col, Typography } from "antd";
import BlogCard, { BlogItem } from "../../components/Lib/BlogCard/BlogCard";
import CustomPagination from "../../components/Lib/ProPagination/CustomPagination";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph } = Typography;

type Props = {
  items?: BlogItem[];
  pageSize?: number;
  className?: string;
};

const mockData: BlogItem[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: "Heading of the blog",
  excerpt: "Many desktop publishing packages and web page",
  category: "Category",
  dateISO: "2023-01-04",
  href: "#",
  image: `/gal3.png`,
}));

export default function BlogsSection({ items, pageSize = 9, className }: Props) {
  const hasItems = Boolean(items?.length);

  const data = useMemo<BlogItem[]>(
    () => (hasItems ? (items as BlogItem[]) : mockData),
    [hasItems, items]
  );

  const [page, setPage] = useState(1);

  // reset page when incoming items or pageSize change
  useEffect(() => {
    setPage(1);
  }, [items, pageSize]);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const sliceStart = (page - 1) * pageSize;

  const currentItems = useMemo(
    () => data.slice(sliceStart, sliceStart + pageSize),
    [data, sliceStart, pageSize]
  );

  // debug: log incoming items
  useEffect(() => {
    if (items?.length) {
      console.table(
        items.map((i) => ({
          id: i.id,
          title: i.title,
          category: i.category,
          dateISO: i.dateISO,
          href: i.href,
          image: i.image,
        }))
      );
    }
  }, [items]);

  useEffect(() => {
    console.table(
      currentItems.map((i) => ({
        id: i.id,
        title: i.title,
        category: i.category,
        dateISO: i.dateISO,
        href: i.href,
      }))
    );
  }, [page, pageSize, currentItems]);

  const handleChange = (p: number) => setPage(p);

  const headerTitle = hasItems ? "Related Blogs" : "Checkout all Blogs/News";
  const headerSubtitle = hasItems
    ? `Found ${data.length} ${data.length === 1 ? "post" : "posts"}`
    : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  return (
    <section className={`${styles.blogcards} ${className ?? ""}`}>
      <Container>
        <div className={styles.header}>
          <Title level={2} className={styles.h1}>
            {headerTitle}
          </Title>
          <Paragraph type="secondary" className={styles.subtitle}>
            {headerSubtitle}
          </Paragraph>
        </div>

        <Row gutter={[20, 20]}>
          {currentItems.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <BlogCard item={item} />
            </Col>
          ))}
        </Row>

        {totalPages > 1 && (
          <div className={styles.pager}>
            <CustomPagination current={page} total={totalPages} onChange={handleChange} />
          </div>
        )}
      </Container>
    </section>
  );
}
