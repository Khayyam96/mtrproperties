"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Divider,
  Image as AntImage,
  Collapse,
  Anchor,
  Card,
  Avatar,
  List,
} from "antd";
import {  UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import type { AnchorLinkItemProps } from "antd/es/anchor/Anchor";
import type { BlogInnerResponse } from "@/models/BlogInner.model";
import { withBase } from "@/models/BlogInner.model";

import ProductSection from "@/app/Home/ProductList";
import type { LandProjectResponse } from "@/models/LatesProject.model";
import { FaqResponse } from "@/models/Faq.model";
import RealEstateFaqSection from "@/app/Home/RealEstateFaqSection";
import "./index.scss"

const ICONS = {
  arrowRight: "/arrowRightIcon.svg",
  arrowLeft: "/arrowLeftIcon.svg",
  calendar: "/calendarIcon.svg",
  time: "/timeIcon.svg",
  arrowBottom: "/arrow-bottom.svg",
} as const;

const { Title, Text, Paragraph } = Typography;

type RecentBlogItem = {
  title: string;
  slug: string;
  excerpt?: string;
};

type Props = {
  data: BlogInnerResponse;
  latestProjects?: LandProjectResponse;
  faqData?: FaqResponse;
  /** Recent blogs for the sidebar (shown under Table Of Contents) */
  recentBlogs?: RecentBlogItem[];
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function calcReadMinutes(htmls: (string | null)[]) {
  const text = htmls.filter(Boolean).map((h) => (h || "").replace(/<[^>]*>/g, " ")).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** ------- Key Take Aways box ------- */
const KeyTakeaways: React.FC<{ items: string[] }> = ({ items }) => {
  const uniq = Array.from(new Set(items.filter(Boolean)));
  return (
    <div className="key-takeaways">
      <div className="key-takeaways__header">
        <CheckCircleOutlined className="key-takeaways__icon" />
        <span className="key-takeaways__title">Key Take Aways</span>
      </div>
      <ul className="key-takeaways__list">
        {uniq.map((t, i) => (
          <li key={`${i}-${t}`} className="key-takeaways__item">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function BlogInnerAntd({ data, latestProjects, faqData, recentBlogs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { translation, category, created_at } = data;

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `https://example.com/blog/${data.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(translation?.title || "");

  const readMin = useMemo(
    () => calcReadMinutes([translation?.content_1, translation?.content_2, translation?.content_3]),
    [translation]
  );

  // TOC yalnız related_content-dən
  const tocItems: AnchorLinkItemProps[] = useMemo(() => {
    return (
      translation?.related_content?.map((group) => {
        const gSlug = `rc-${slugify(group.name)}`;
        const children =
          (group.children || [])
            .filter(Boolean)
            .map((child) => ({
              key: `rc-${slugify(group.name)}-${slugify(child)}`,
              href: `#rc-${slugify(group.name)}-${slugify(child)}`,
              title: child,
            })) || [];

        return {
          key: gSlug,
          href: `#${gSlug}`,
          title: group.name,
          children: children.length ? children : undefined,
        } as AnchorLinkItemProps;
      }) || []
    );
  }, [translation]);

  // const handleNativeShare = async () => {
  //   try {
  //     if (navigator.share) await navigator.share({ url: shareUrl, title: translation?.title });
  //     else await navigator.clipboard.writeText(shareUrl);
  //   } catch {}
  // };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    } catch {}
  };

  return (
    <div className="blog-inner" ref={containerRef}>
      <div className="blog-inner__container">
        <div className="blog-inner__back">
          <Link href="/blog">
            <Text type="secondary">
              <Image src={ICONS.arrowLeft} alt="Back" width={14} height={14} />
              {" "}Back to Blog
            </Text>
          </Link>
          <div className="break-bread">
            <Text type="secondary">|</Text>
            <Text type="secondary">
              Blog {" "}
              <Image src={ICONS.arrowRight} alt="/" width={14} height={14} />
            </Text>
            <Text type="secondary">{translation?.title}</Text>
          </div>
        </div>

        <Row gutter={[24, 24]} align="top" style={{ marginTop: 20 }}>
          {/* LEFT */}
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={8} className="blog-inner__left-stack">
              <Space size={8} align="center" wrap className="blog-inner__meta">
                {category?.name && <Tag color="#FDFAFF">{category.name}</Tag>}
                <Text type="secondary">
                  <Image src={ICONS.calendar} alt="Date" width={16} height={16} style={{ marginRight: 6 }} />
                  {fmtDate(created_at)}
                </Text>
                <Divider type="vertical" />
                <Text type="secondary">
                  <Image src={ICONS.time} alt="Reading time" width={16} height={16} style={{ marginRight: 6 }} />
                  {readMin} min read
                </Text>
              </Space>

              <Title level={2} className="blog-inner__title">
                {translation?.title}
              </Title>
              {translation?.subtitle && (
                <Paragraph type="secondary" className="blog-inner__subtitle">
                  {translation.subtitle}
                </Paragraph>
              )}

              <Space size={8} align="center" className="blog-inner__share">
                <Text type="secondary">Share this article:</Text>
                <Space size="small" className="blog-inner__share-icons">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="blog-inner__icon-link"
                  >
                    <Image src="/linkedin.svg" alt="LinkedIn" width={18} height={18} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="blog-inner__icon-link"
                  >
                    <Image src="/facebook.svg" alt="Facebook" width={18} height={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="blog-inner__icon-link"
                  >
                    <Image src="/twitter.svg" alt="X (Twitter)" width={18} height={18} />
                  </a>
                  <button
                    onClick={handleInstagramShare}
                    aria-label="Share on Instagram"
                    title="Share on Instagram"
                    className="blog-inner__icon-button"
                  >
                    <Image src="/instagram.svg" alt="Instagram" width={18} height={18} />
                  </button>
                </Space>
              </Space>
            </Space>

            <div className="blog-inner__cover">
              <AntImage
                className="blog-inner__cover-img"
                src={withBase(data.main_image)}
                alt={translation?.title || "Cover"}
                preview={false}
              />
            </div>

            {/* Content parts */}
            {translation?.content_1 && (
              <div className="blog-inner__section">
                <div
                  className="blog-inner__section-html"
                  dangerouslySetInnerHTML={{ __html: translation.content_1 }}
                />
              </div>
            )}
            {data.content_image && (
              <div className="blog-inner__inline-image">
                <AntImage
                  className="blog-inner__inline-image-img"
                  src={withBase(data.content_image)}
                  alt={translation?.title || "Inline"}
                  preview={false}
                />
              </div>
            )}

            {translation?.content_2 && (
              <div className="blog-inner__section">
                <div
                  className="blog-inner__section-html"
                  dangerouslySetInnerHTML={{ __html: translation.content_2 }}
                />
              </div>
            )}

            {translation?.content_3 && (
              <div className="blog-inner__section">
                <div
                  className="blog-inner__section-html"
                  dangerouslySetInnerHTML={{ __html: translation.content_3 }}
                />
              </div>
            )}

            {translation?.keys && translation.keys.length > 0 && (
              <div className="blog-inner__section">
                <KeyTakeaways items={translation.keys} />
              </div>
            )}

            {faqData && (
              <div className="blog-inner__section">
                <RealEstateFaqSection data={faqData} />
              </div>
            )}

            {latestProjects && (
              <div className="blog-inner__section">
                <ProductSection data={latestProjects} />
              </div>
            )}

            {data.agent && (
              <Card className="sidebar-block">
                <Space align="center" size={16}>
                  <Avatar
                    size={56}
                    src={withBase(data.agent.image_url) || undefined}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <div className="font-medium">
                      <p>{data.agent.name}</p>
                    </div>
                    <Text type="secondary">{data.agent.position?.name || "Agent"}</Text>
                  </div>
                </Space>
                {data.agent.bio && (
                  <>
                    <Paragraph ellipsis={{ rows: 3 }}>{data.agent.bio}</Paragraph>
                  </>
                )}
              </Card>
            )}
          </Col>

          <Col xs={24} lg={8}>
            <div className="blog-sidebar">
              {/* Table Of Contents */}
              {tocItems.length > 0 && (
                <Collapse
                  className="sidebar-block sidebar-toc"
                  defaultActiveKey={["toc"]}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) => (
                    <Image
                      src={ICONS.arrowBottom}
                      alt="Toggle"
                      width={12}
                      height={12}
                      style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  )}
                  items={[
                    {
                      key: "toc",
                      label: <span className="block-title">Table Of Contents</span>,
                      children: <Anchor className="toc-anchor" affix={false} items={tocItems} />,
                    },
                  ]}
                />
              )}

              {recentBlogs && recentBlogs.length > 0 && (
                <Collapse
                  className="sidebar-block sidebar-recent"
                  defaultActiveKey={["recent"]}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) => (
                    <Image
                      src={ICONS.arrowBottom}
                      alt="Toggle"
                      width={12}
                      height={12}
                      style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  )}
                  items={[
                    {
                      key: "recent",
                      label: <span className="block-title">Recent Blogs</span>,
                      children: (
                        <List
                          className="recent-list"
                          itemLayout="vertical"
                          dataSource={recentBlogs}
                          renderItem={(it) => (
                            <List.Item>
                              <Link className="recent-link" href={`/blog/${it.slug}`}>
                                {it.title}
                              </Link>
                              {it.excerpt && (
                                <Paragraph style={{ marginBottom: 0 }}>{it.excerpt}</Paragraph>
                              )}
                            </List.Item>
                          )}
                        />
                      ),
                    },
                  ]}
                />
              )}

              <div className="sidebar-spacer" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
