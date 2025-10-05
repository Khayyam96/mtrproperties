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
  Affix,
  Card,
  List,
  Avatar,
} from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import type { AnchorLinkItemProps } from "antd/es/anchor/Anchor";
import type { BlogInnerResponse } from "../../../models/BlogInner.model";
import { withBase } from "../../../models/BlogInner.model";

const { Title, Text, Paragraph } = Typography;

type Props = { data: BlogInnerResponse };

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function calcReadMinutes(htmls: (string | null)[]) {
  const text = htmls.filter(Boolean).map((h) => (h || "").replace(/<[^>]*>/g, " ")).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function BlogInnerAntd({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { translation, category, created_at } = data;

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://example.com/blog/${data.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(translation?.title || "");

  const readMin = useMemo(
    () => calcReadMinutes([translation?.content_1, translation?.content_2, translation?.content_3]),
    [translation]
  );

  const tocItems: AnchorLinkItemProps[] = [
    { key: "intro", href: "#intro", title: translation?.title || "Overview" },
    ...(translation?.content_1 ? [{ key: "s1", href: "#section-1", title: "Section 1" }] : []),
    ...(translation?.content_2 ? [{ key: "s2", href: "#section-2", title: "Section 2" }] : []),
    ...(translation?.content_3 ? [{ key: "s3", href: "#section-3", title: "Section 3" }] : []),
    ...(translation?.related_content?.length ? [{ key: "related", href: "#related-blogs", title: "Related Content" }] : []),
  ];

  const handleNativeShare = async () => {
    try {
      if (navigator.share) await navigator.share({ url: shareUrl, title: translation?.title });
      else await navigator.clipboard.writeText(shareUrl);
    } catch {}
  };

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
            <Text type="secondary">← Back to Blog</Text>
          </Link>
        </div>

        <Row gutter={[24, 24]} align="top">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={8} className="blog-inner__left-stack">
              <Space size={8} align="center" wrap className="blog-inner__meta">
                {category?.name && <Tag color="purple">{category.name}</Tag>}
                <Text type="secondary">{fmtDate(created_at)}</Text>
                <Divider type="vertical" />
                <Text type="secondary">{readMin} min read</Text>
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
                  <button onClick={handleInstagramShare} aria-label="Share on Instagram" title="Share on Instagram" className="blog-inner__icon-button">
                    <Image src="/instagram.svg" alt="Instagram" width={18} height={18} />
                  </button>
                  <button onClick={handleNativeShare} className="blog-inner__icon-button" title="Share">
                    <Image src="/share.svg" alt="Share" width={18} height={18} />
                  </button>
                </Space>
              </Space>
            </Space>

            <div className="blog-inner__cover">
              <AntImage className="blog-inner__cover-img" src={withBase(data.main_image)} alt={translation?.title || "Cover"} preview={false} />
            </div>

            <div id="intro" className="blog-inner__section">
              {translation?.content_1 && (
                <>
                  <Title level={3} className="blog-inner__section-title">
                    {translation?.title}
                  </Title>
                  <div className="blog-inner__section-html" dangerouslySetInnerHTML={{ __html: translation.content_1 }} />
                </>
              )}
            </div>

            <div className="blog-inner__inline-image">
              <AntImage className="blog-inner__inline-image-img" src={withBase(data.content_image)} alt={translation?.title || "Inline"} preview={false} />
            </div>

            {translation?.content_2 && (
              <div id="section-2" className="blog-inner__section">
                <Title level={3} className="blog-inner__section-title">Section 2</Title>
                <div className="blog-inner__section-html" dangerouslySetInnerHTML={{ __html: translation.content_2 }} />
              </div>
            )}

            {translation?.content_3 && (
              <div id="section-3" className="blog-inner__section">
                <Title level={3} className="blog-inner__section-title">Section 3</Title>
                <div className="blog-inner__section-html" dangerouslySetInnerHTML={{ __html: translation.content_3 }} />
              </div>
            )}

            {!!translation?.keys?.length && (
              <div className="blog-inner__section">
                <Space size={[8, 8]} wrap>
                  {translation.keys.map((k) => (
                    <Tag key={k}>{k}</Tag>
                  ))}
                </Space>
              </div>
            )}

            {!!translation?.related_content?.length && (
              <div id="related-blogs" className="blog-inner__related">
                <Title level={4}>Related Content</Title>
                <Row gutter={[16, 16]}>
                  {translation.related_content.map((group, idx) => (
                    <Col xs={24} key={group.name + idx}>
                      <Card title={group.name} bordered>
                        <List dataSource={group.children} renderItem={(item) => <List.Item>• {item}</List.Item>} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          <Col xs={24} lg={8}>
            <Affix offsetTop={30} target={() => (typeof window !== "undefined" ? window : null)}>
              <div className="blog-sidebar">
                <Collapse
                  className="sidebar-block sidebar-toc"
                  defaultActiveKey={["toc"]}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0} />}
                  items={[
                    {
                      key: "toc",
                      label: <span className="block-title">Table Of Contents</span>,
                      children: <Anchor className="toc-anchor" affix={false} items={tocItems} />,
                    },
                  ]}
                />
                <div className="sidebar-spacer" />
                {data.agent && (
                  <Card className="sidebar-block">
                    <Space align="center" size={16}>
                      <Avatar size={56} src={withBase(data.agent.image_url) || undefined} icon={<UserOutlined />} />
                      <div>
                        <div className="font-medium">{data.agent.name}</div>
                        <Text type="secondary">{data.agent.position?.name || "Agent"}</Text>
                      </div>
                    </Space>
                    <Divider />
                    <Space direction="vertical" size={4}>
                      {data.agent.phone && <a href={`tel:${data.agent.phone}`}>{data.agent.phone}</a>}
                      {data.agent.whatsapp && (
                        <a href={`https://wa.me/${data.agent.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">
                          WhatsApp
                        </a>
                      )}
                      {data.agent.email && <a href={`mailto:${data.agent.email}`}>{data.agent.email}</a>}
                    </Space>
                    {data.agent.bio && (
                      <>
                        <Divider />
                        <Paragraph ellipsis={{ rows: 3 }}>{data.agent.bio}</Paragraph>
                      </>
                    )}
                  </Card>
                )}
              </div>
            </Affix>
          </Col>
        </Row>
      </div>
    </div>
  );
}
