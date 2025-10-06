"use client";

import { FC, useMemo } from "react";
import { Row, Col, Table, Typography, Card, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import "./index.scss";

const { Title, Paragraph, Text } = Typography;

export type OfferRow = { key: string; name: string; benefit: string; validUntil: string; };

type Props = {
  heading?: string;
  subheading?: string;
  rows?: OfferRow[];
  sideTitle?: string;
  sideBody?: string;
  ctaText?: string;
  ctaHref?: string;
  onCta?: () => void;
  className?: string;
};

const defaultRows: OfferRow[] = [
  { key: "zero-commission", name: "Zero Commission Deal", benefit: "No agent commission on select new launches", validUntil: "August 31, 2025" },
];

const SpecialOffersSection: FC<Props> = ({
  heading = "Unlock Special Property Offers Direct from MTR Properties",
  subheading =
    "Experience unmatched value with these limited-time deals curated by MTR Properties for new homebuyers and investors. Enjoy extra perks, flexible payment options, and tailor-made incentives when you purchase directly through us.",
  rows,
  sideTitle = "Zero Commission Deal at\nMTR Properties",
  sideBody =
    "Unlock special savings on your next home purchase with the exclusive Zero Commission Deal from MTR Properties. For a limited time, pay no agent commission when you buy select new property launches directly from us—putting more value straight into your investment.",
  ctaText = "Contact Us",
  ctaHref,
  onCta,
  className,
}) => {
  const data = useMemo(() => (rows?.length ? rows : defaultRows), [rows]);

  const columns: ColumnsType<OfferRow> = [
    { title: "Offer Name", dataIndex: "name", key: "name", onHeaderCell: () => ({ className: "th" }), render: (v: string) => <Text strong>{v}</Text> },
    { title: "Key Benefit", dataIndex: "benefit", key: "benefit", onHeaderCell: () => ({ className: "th" }) },
    { title: "Valid Until", dataIndex: "validUntil", key: "validUntil", width: 200, onHeaderCell: () => ({ className: "th" }) },
  ];

  const SideCard = (
    <Card className="sideCard" bordered>
      <div className="sideHead">
        <Title level={4} className="sideTitle">
          {sideTitle.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </Title>

        {ctaHref ? (
          <Link href={ctaHref} className="btnLink">
            <Button type="primary" size="large" className="ctaBtn">{ctaText}</Button>
          </Link>
        ) : (
          <Button type="primary" size="large" className="ctaBtn" onClick={onCta}>{ctaText}</Button>
        )}
      </div>

      <Paragraph className="sideBody">{sideBody}</Paragraph>
    </Card>
  );

  return (
    <section className={`wrapspecial ${className || ""}`}>
      <div className="container">
        <div className="header">
          <Title level={1} className="h1">{heading}</Title>
          <Paragraph className="sub">{subheading}</Paragraph>
        </div>

        <Row gutter={[24, 24]} align="stretch">
          <Col xs={24} lg={16}>
            <Table<OfferRow>
              className="table"
              columns={columns}
              dataSource={data}
              rowKey="key"
              pagination={false}
              bordered
            />
          </Col>
          <Col xs={24} lg={8}>{SideCard}</Col>
        </Row>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
