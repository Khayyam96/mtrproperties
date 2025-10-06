"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Row, Col, Card, Typography, Button } from "antd";
import "./index.scss";

const { Title, Paragraph } = Typography;

type DocItem = {
  key: string;
  title: string;
  description: string;
  /** Path under /public, e.g. "/icons/id.svg" */
  iconSrc: string;
  /** Optional alt text for accessibility */
  iconAlt?: string;
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
    iconSrc: "/icons/mortgage/id.svg",
    iconAlt: "ID Icon",
  },
  {
    key: "address",
    title: "Proof of Address",
    description:
      "Recent utility bill, tenancy contract, or bank statement (local or international).",
    iconSrc: "/icons/mortgage/address.svg",
    iconAlt: "Address Icon",
  },
  {
    key: "photo",
    title: "Passport Size Photograph(s)",
    description:
      "Recent photographs; requirements may specify digital format.",
    iconSrc: "/icons/mortgage/photo.svg",
    iconAlt: "Photo Icon",
  },
  {
    key: "residence-visa",
    title: "UAE Residence Visa Copy (if applicable)",
    description: "For expatriates residing in the UAE.",
    iconSrc: "/icons/mortgage/visa.svg",
    iconAlt: "Visa Icon",
  },
  {
    key: "sales-agreement",
    title: "Sales Agreement / Reservation Form",
    description:
      "Provided by MTR Properties or property developer (PDF download suggested).",
    iconSrc: "/icons/mortgage/agreement.svg",
    iconAlt: "Agreement Icon",
  },
  {
    key: "income-proof",
    title: "Proof of Income/Bank Statement",
    description:
      "Salary certificate, official payslips, or recent bank statements (for mortgage/loan eligibility).",
    iconSrc: "/icons/mortgage/income.svg",
    iconAlt: "Income Icon",
  },
  {
    key: "poa",
    title: "Power of Attorney (if applicable)",
    description:
      "Required if you appoint someone else to act on your behalf.",
    iconSrc: "/icons/mortgage/poa.svg",
    iconAlt: "POA Icon",
  },
];

const DocumentsRequiredSection: FC<Props> = ({
  heading = "Required Documents for Mortgage Application in the UAE",
  subheading = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  items,
  ctaText = "Book a Consultation",
  onCta,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaults), [items]);

  return (
    <section className={`wrapdocuments ${className || ""}`}>
      <div className="container">
        <div className="header">
          <Title level={1} className="h1">
            {heading}
          </Title>
          <Paragraph className="sub">{subheading}</Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {data.map((it) => (
            <Col key={it.key} xs={24} sm={12} lg={6}>
              <Card hoverable className="card" bordered={false}>
                <div className="cardInner">
                  <div className="iconWrap" aria-hidden>
                    <Image
                      src={it.iconSrc}
                      alt={it.iconAlt || it.title}
                      width={40}
                      height={40}
                      className="icon"
                      priority={false}
                    />
                  </div>
                  <div className="meta">
                    <Title level={4} className="cardTitle">
                      {it.title}
                    </Title>
                    <Paragraph className="cardText">
                      {it.description.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="cta">
          <Paragraph className="ctaText">
            Do you want to know more details contact our expert
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="ctaBtn"
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
