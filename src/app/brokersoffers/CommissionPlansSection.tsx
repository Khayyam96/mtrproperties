"use client";

import { FC, useMemo } from "react";
import { Table, Typography, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type RowData = {
  key: string;
  feature: string;
  wait: string;
  instant: string;
};

type Props = {
  eyebrow?: string;                  // "Commission Plans"
  heading?: string;                  // "Choose Your Commission Structure"
  subheading?: string;
  waitLabel?: string;                // "100% Commission (Wait)"
  instantLabel?: string;             // "90% Commission (Instant)"
  rows?: RowData[];
  className?: string;
};

const defaultRows: RowData[] = [
  {
    key: "payout",
    feature: "Payout Amount",
    wait: "Full commission (minus VAT)",
    instant: "90% with 10% service fee",
  },
  {
    key: "timing",
    feature: "Payment Timing",
    wait: "After deal closure",
    instant: "Immediately on sale agreement",
  },
  {
    key: "fees",
    feature: "Admin Fees",
    wait: "None",
    instant: "10% retained by company",
  },
  {
    key: "cashflow",
    feature: "Cash Flow Impact",
    wait: "Full Cash at Closing",
    instant: "Immediate cash inflow",
  },
];

const CommissionPlansSection: FC<Props> = ({
  eyebrow = "Commission Plans",
  heading = "Choose Your Commission Structure",
  subheading = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  waitLabel = "100% Commission (Wait)",
  instantLabel = "90% Commission (Instant)",
  rows,
  className,
}) => {
  const data = useMemo(() => (rows?.length ? rows : defaultRows), [rows]);

  const columns: ColumnsType<RowData> = [
    {
      title: "Features",
      dataIndex: "feature",
      key: "feature",
      width: 280,
      onHeaderCell: () => ({ className: styles.th }),
      render: (v: string) => <Text strong>{v}</Text>,
    },
    {
      title: waitLabel,
      dataIndex: "wait",
      key: "wait",
      onHeaderCell: () => ({ className: styles.th }),
    },
    {
      title: instantLabel,
      dataIndex: "instant",
      key: "instant",
      onHeaderCell: () => ({ className: styles.th }),
    },
  ];

  return (
    <section className={`${styles.wrap} ${className || ""}`}>
      <div className={styles.container}>
        {/* Eyebrow / pill */}
        <div className={styles.header}>
          <Space className={styles.eyebrow} size={8}>
            <SafetyCertificateOutlined />
            <Text strong>{eyebrow}</Text>
          </Space>

          <Title level={1} className={styles.h1}>
            {heading}
          </Title>

          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <Table<RowData>
          className={styles.table}
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 800 }}
        />
      </div>
    </section>
  );
};

export default CommissionPlansSection;
