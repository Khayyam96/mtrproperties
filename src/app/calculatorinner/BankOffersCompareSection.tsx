"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { BankListResponse } from "@/models/Bank.model";
import styles from "./index.module.scss";

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
      onHeaderCell: () => ({ className: styles.th }),
      render: (_v, row) => {
        const nameEl = row.href ? (
          <Link href={row.href} target="_blank" rel="noopener noreferrer">
            <Text strong>{row.bank}</Text>
          </Link>
        ) : (
          <Text strong>{row.bank}</Text>
        );

        return (
          <div className={styles.bankCell}>
            <span className={styles.bankName}>{nameEl}</span>
          </div>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: "Interest Rate",
      dataIndex: "interestRate",
      key: "interestRate",
      width: 170,
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: "Down Payment",
      dataIndex: "downPayment",
      key: "downPayment",
      width: 140,
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
      key: "tenure",
      width: 110,
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: "Key Features",
      dataIndex: "features",
      key: "features",
      onHeaderCell: () => ({ className: styles.th }),
    },
  ];

  if (!data.length) return null;

  return (
    <section className={`${styles.wrapoffers} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <Table<OfferRow>
          className={styles.table}
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 900 }}
        />

        <Paragraph className={styles.footnote}>{footnote}</Paragraph>
      </div>
    </section>
  );
};

export default BankOffersCompareSection;
