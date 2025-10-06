"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { BankListResponse } from "@/models/Bank.model";
import "./index.scss";

const { Title, Paragraph, Text } = Typography;

type Props = {
  heading?: string;
  subheading?: string;
  bankRes?: BankListResponse;
  footnote?: string;
  className?: string;
};

type OfferRow = {
  key: string;
  bank: string;
  product: string;
  interestRate: string;
  downPayment: string;
  tenure: string;
  features: string;
  logo?: string;
  href?: string;
};

const IMG_BASE = "https://api.dubaiyachts.com/uploads/properties";

function withBase(src?: string) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${IMG_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
}

function normalizeUrl(href?: string) {
  if (!href) return undefined;
  return href.startsWith("http") ? href : `https://${href}`;
}

function prettyType(t?: string) {
  if (!t) return "";
  return t
    .split("/")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join("/");
}

function formatRate(rate?: string, type?: string) {
  if (!rate && !type) return "";
  const r = (rate || "").trim();
  const pct = r ? (r.endsWith("%") ? r : `${r}%`) : "";
  const tt = prettyType(type || "");
  return [pct, tt].filter(Boolean).join(" ");
}

const BankOffersCompareSection: FC<Props> = ({
  heading = "Compare UAE Mortgage Offers by Banks",
  subheading =
    "Explore the latest mortgage rates and features from top UAE banks. Use this table to easily compare interest rates, down payments, tenures, and special benefits",
  bankRes,
  footnote =
    "*Mortgage offers, interest rates, and terms listed are subject to change at any time in accordance with the policies of the respective banks and regulations set by the Central Bank of UAE (CBUAE)",
  className,
}) => {
  const data: OfferRow[] = useMemo(
    () =>
      (bankRes?.data ?? []).map((b) => ({
        key: String(b.id),
        bank: b.name,
        product: b.product,
        interestRate: formatRate(b.interest_rate, b.interest_rate_type),
        downPayment: b.down_payment,
        tenure: b.tenure_years ? `${b.tenure_years} yrs` : "",
        features: b.features,
        logo: withBase(b.imgUrl),
        href: normalizeUrl(b.link),
      })),
    [bankRes]
  );

  const columns: ColumnsType<OfferRow> = [
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      width: 220,
      onHeaderCell: () => ({ className: "th" }),
      render: (_v, row) => {
        const nameEl = row.href ? (
          <Link href={row.href} target="_blank" rel="noopener noreferrer">
            <Text strong>{row.bank}</Text>
          </Link>
        ) : (
          <Text strong>{row.bank}</Text>
        );

        return (
          <div className="bankCell">
            <span className="bankName">{nameEl}</span>
          </div>
        );
      },
    },
    { title: "Product", dataIndex: "product", key: "product", onHeaderCell: () => ({ className: "th" }) },
    { title: "Interest Rate", dataIndex: "interestRate", key: "interestRate", width: 170, onHeaderCell: () => ({ className: "th" }) },
    { title: "Down Payment", dataIndex: "downPayment", key: "downPayment", width: 140, onHeaderCell: () => ({ className: "th" }) },
    { title: "Tenure", dataIndex: "tenure", key: "tenure", width: 110, onHeaderCell: () => ({ className: "th" }) },
    { title: "Key Features", dataIndex: "features", key: "features", onHeaderCell: () => ({ className: "th" }) },
  ];

  if (!data.length) return null;

  return (
    <section className={`wrapoffers ${className || ""}`}>
      <div className="container">
        <div className="header">
          <Title level={1} className="h1">{heading}</Title>
          <Paragraph className="sub">{subheading}</Paragraph>
        </div>

        <Table<OfferRow>
          className="table"
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 900 }}
        />

        <Paragraph className="footnote">{footnote}</Paragraph>
      </div>
    </section>
  );
};

export default BankOffersCompareSection;
