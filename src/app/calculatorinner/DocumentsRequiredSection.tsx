"use client";

import { FC, useMemo } from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import {
  IdcardOutlined,
  HomeOutlined,
  UserOutlined,
  SolutionOutlined,
  FileTextOutlined,
  ProfileOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type DocItem = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: DocItem[];
  ctaText?: string;
  onCta?: () => void;
  className?: string;
};

const defaults: DocItem[] = [
  {
    key: "id-passport",
    title: "Emirates ID / Passport Copy",
    description:
      "For UAE residents: Emirates ID.\nFor non-residents: valid passport copy.",
    icon: <IdcardOutlined />,
  },
  {
    key: "address",
    title: "Proof of Address",
    description:
      "Recent utility bill, tenancy contract, or bank statement (local or international).",
    icon: <HomeOutlined />,
  },
  {
    key: "photo",
    title: "Passport Size Photograph(s)",
    description:
      "Recent photographs; requirements may specify digital format.",
    icon: <UserOutlined />,
  },
  {
    key: "residence-visa",
    title: "UAE Residence Visa Copy (if applicable)",
    description: "For expatriates residing in the UAE.",
    icon: <SolutionOutlined />,
  },
  {
    key: "sales-agreement",
    title: "Sales Agreement / Reservation Form",
    description:
      "Provided by MTR Properties or property developer (PDF download suggested).",
    icon: <FileTextOutlined />,
  },
  {
    key: "income-proof",
    title: "Proof of Income/Bank Statement",
    description:
      "Salary certificate, official payslips, or recent bank statements (for mortgage/loan eligibility).",
    icon: <ProfileOutlined />,
  },
  {
    key: "poa",
    title: "Power of Attorney (if applicable)",
    description:
      "Required if you appoint someone else to act on your behalf.",
    icon: <FileProtectOutlined />,
  },
];

const DocumentsRequiredSection: FC<Props> = ({
  heading = "Required Documents for Mortgage Application in the UAE",
  subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  items,
  ctaText = "Book an Consultation",
  onCta,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaults), [items]);

  return (
    <section className={`${styles.wrapdocuments} ${className || ""}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Grid of cards */}
        <Row gutter={[24, 24]}>
          {data.map((it) => (
            <Col key={it.key} xs={24} sm={12} lg={6}>
              <Card hoverable className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.iconWrap} aria-hidden>
                    {it.icon}
                  </div>
                  <div className={styles.meta}>
                    <Title level={4} className={styles.cardTitle}>
                      {it.title}
                    </Title>
                    <Paragraph className={styles.cardText}>
                      {it.description.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < it.description.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className={styles.cta}>
          <Paragraph className={styles.ctaText}>
            Do you want to know more details contact our expert
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className={styles.ctaBtn}
            onClick={onCta}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DocumentsRequiredSection;
