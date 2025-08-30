"use client";

import { useMemo, useState } from "react";
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
    excerpt:
        "Many desktop publishing packages and web page",
    category: "Category",
    dateISO: "2023-01-04",
    href: "#",
    image: `/gal3.png`,
}));

export default function BlogsSection({ items, pageSize = 9, className }: Props) {
    const data = useMemo(() => (items?.length ? items : mockData), [items]);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const sliceStart = (page - 1) * pageSize;
    const currentItems = data.slice(sliceStart, sliceStart + pageSize);

    const handleChange = (p: number) => setPage(p);

    return (
        <section className={styles.blogcards}>
            <Container>
                <div className={styles.header}>
                    <Title level={2} className={styles.h1}>
                        Checkout all Blogs/News
                    </Title>
                    <Paragraph type="secondary" className={styles.subtitle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Paragraph>
                </div>

                <Row gutter={[20, 20]}>
                    {currentItems.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                            <BlogCard item={item} />
                        </Col>
                    ))}
                </Row>

                <div className={styles.pager}>
                    <CustomPagination current={page} total={totalPages} onChange={handleChange} />
                </div>
            </Container>
        </section>
    );
}
