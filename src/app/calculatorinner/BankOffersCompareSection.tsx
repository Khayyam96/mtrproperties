"use client";

import { FC, useMemo } from "react";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

export type OfferRow = {
  key: string;
  bank: string;
  product: string;
  interestRate: string;
  downPayment: string;
  tenure: string;
  features: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  rows?: OfferRow[];
  footnote?: string;
  className?: string;
};

const defaultRows: OfferRow[] = [
  {
    key: "enbd",
    bank: "Emirates NBD",
    product: "Home Loan - Fixed",
    interestRate: "3.40% Fixed",
    downPayment: "20%",
    tenure: "25 yrs",
    features: "Salary transfer, fast approval",
  },
  {
    key: "adcb",
    bank: "ADCB",
    product: "Dream Home Mortgage",
    interestRate: "3.25% Variable",
    downPayment: "20%",
    tenure: "25 yrs",
    features: "Free property insurance",
  },
  {
    key: "mashreq",
    bank: "Mashreq",
    product: "Mashreq Home Loan",
    interestRate: "3.50% Fixed/Reducing",
    downPayment: "15% - 20%",
    tenure: "25 yrs",
    features: "Flexible repayment, no settlement fee (limited)",
  },
  {
    key: "dubaiislamic",
    bank: "Dubai Islamic",
    product: "Al Islami Home Finance",
    interestRate: "3.65% Reducing",
    downPayment: "20%",
    tenure: "25 yrs",
    features: "Sharia compliant, Takaful incl.",
  },
  {
    key: "fab",
    bank: "FAB",
    product: "MyHome Mortgage",
    interestRate: "3.59% Fixed",
    downPayment: "20%",
    tenure: "25 yrs",
    features: "Zero processing fee, cash back offer",
  },
];

const BankOffersCompareSection: FC<Props> = ({
  heading = "Compare UAE Mortgage Offers by Banks",
  subheading =
    "Explore the latest mortgage rates and features from top UAE banks. Use this table to easily compare interest rates, down payments, tenures, and special benefits",
  rows,
  footnote =
    "*Mortgage offers, interest rates, and terms listed are subject to change at any time in accordance with the policies of the respective banks and regulations set by the Central Bank of UAE (CBUAE)",
  className,
}) => {
  const data = useMemo(() => (rows?.length ? rows : defaultRows), [rows]);

  const columns: ColumnsType<OfferRow> = [
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      width: 160,
      onHeaderCell: () => ({ className: styles.th }),
      render: (v: string) => <Text strong>{v}</Text>,
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
      width: 160,
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: "Down Payment",
      dataIndex: "downPayment",
      key: "downPayment",
      width: 150,
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
