"use client";

import { FC, useMemo } from "react";
import { Typography, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type CompareRow = {
  key: string;
  feature: string;
  traditional: string;
  tokenized: string;
  emphasizeTraditional?: boolean;
  emphasizeTokenized?: boolean;
};

type Props = {
  className?: string;
  heading?: string;
  subtext?: string;
  pairHeading?: string;
  rows?: CompareRow[];
};

const defaultRows: CompareRow[] = [
  {
    key: "min-invest",
    feature: "Minimum Investment",
    traditional: "AED 400,000+ (Studio)",
    tokenized: "AED 2,000 (Token)",
    emphasizeTraditional: true,
    emphasizeTokenized: true,
  },
  {
    key: "processing-time",
    feature: "Processing Time",
    traditional: "30–60 days",
    tokenized: "≈5 minutes",
    emphasizeTraditional: true,
    emphasizeTokenized: true,
  },
  {
    key: "costs",
    feature: "Transaction Costs",
    traditional: "5–8%",
    tokenized: "1–2%",
    emphasizeTraditional: true,
    emphasizeTokenized: true,
  },
  {
    key: "roi",
    feature: "ROI",
    traditional: "≈ 0.8%",
    tokenized: "≈ 0.8%",
  },
  {
    key: "liquidity",
    feature: "Liquidity",
    traditional: "6–12 months",
    tokenized: "24/7 instant",
    emphasizeTraditional: true,
    emphasizeTokenized: true,
  },
  {
    key: "docs",
    feature: "Documentation",
    traditional: "Physical paperwork",
    tokenized: "Digital certificates",
    emphasizeTraditional: true,
    emphasizeTokenized: true,
  },
];

const WhyTokenized: FC<Props> = ({
  className,
  heading = "Why Choose Tokenized Real Estate?",
  subtext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  pairHeading = "Traditional vs Tokenized Investment",
  rows,
}) => {
  const data = useMemo(() => rows ?? defaultRows, [rows]);

  const columns = useMemo<ColumnsType<CompareRow>>(
    () => [
      {
        title: "Features",
        dataIndex: "feature",
        key: "feature",
        className: styles.colFeature,
      },
      {
        title: "Traditional",
        dataIndex: "traditional",
        key: "traditional",
        render: (text, record) => (
          <span className={record.emphasizeTraditional ? styles.neg : ""}>
            {text}
          </span>
        ),
      },
      {
        title: "Tokenized",
        dataIndex: "tokenized",
        key: "tokenized",
        render: (text, record) => (
          <span className={record.emphasizeTokenized ? styles.pos : ""}>
            {text}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <section className={`${styles.wrapwhy} ${className || ""}`}>
      <div className={styles.container}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>
        <Paragraph className={styles.sub}>{subtext}</Paragraph>

        <Title level={4} className={styles.pairHeading}>
          {pairHeading}
        </Title>

        <div className={styles.tableWrap}>
          <Table
            rowKey="key"
            bordered
            pagination={false}
            columns={columns}
            dataSource={data}
            className={styles.table}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTokenized;
