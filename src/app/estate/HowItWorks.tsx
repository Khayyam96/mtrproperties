"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, Typography, Button, Tag } from "antd";
import {
  SafetyOutlined,
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Step = {
  key: number;
  title: string;
  blurb: string;
  detailsTitle?: string;
  details: string[];
};

type Props = {
  className?: string;
  steps?: Step[];
};

const defaultSteps: Step[] = [
  {
    key: 1,
    title: "Property Selection & Evaluation",
    blurb:
      "Premium Dubai properties are carefully selected and evaluated by experts",
    detailsTitle: "Process Details:",
    details: [
      "Professional property valuation by certified appraisers",
      "Legal due diligence and title verification",
      "Market analysis and investment potential assessment",
      "Registration with Dubai Land Department",
    ],
  },
  {
    key: 2,
    title: "Legal Documentation & Compliance",
    blurb: "All legal frameworks and regulatory compliance are established",
    detailsTitle: "Process Details:",
    details: [
      "VARA compliance verification and approval",
      "Smart contract development and auditing",
      "Property title deed digitization",
      "Legal framework establishment",
    ],
  },
  {
    key: 3,
    title: "Blockchain Tokenization",
    blurb: "Property is divided into digital tokens on the XRP Ledger",
    detailsTitle: "Process Details:",
    details: [
      "Property fractional division calculation",
      "Token minting on XRP Ledger blockchain",
      "Immutable ownership record creation",
      "Smart contract deployment",
    ],
  },
  {
    key: 4,
    title: "Platform Integration",
    blurb: "Tokens are integrated into the platform and prepared for trading",
    detailsTitle: "Process Details:",
    details: [
      "Prypco platform integration",
      "Secondary market preparation",
      "Trading infrastructure setup",
      "Liquidity pool establishment",
    ],
  },
  {
    key: 5,
    title: "Distribution & Listing",
    blurb: "Tokens are listed and made available to qualified investors",
    detailsTitle: "Process Details:",
    details: [
      "Primary/secondary listing preparation",
      "KYC/AML verification pipeline",
      "Investor allocation & whitelist",
      "Issuance documentation distribution",
    ],
  },
  {
    key: 6,
    title: "Asset Management & Reporting",
    blurb: "Post-issuance monitoring, payouts, and transparent reporting",
    detailsTitle: "Process Details:",
    details: [
      "On-chain ownership tracking",
      "Automated payout scheduling",
      "Performance dashboards & reports",
      "Ongoing compliance monitoring",
    ],
  },
];

const HowItWorks: FC<Props> = ({ className, steps }) => {
  const data = useMemo(() => steps ?? defaultSteps, [steps]);
  const total = data.length;
  const [active, setActive] = useState<number>(1);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const idx = active - 1;
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [active]);

  const goTo = (idx1: number) =>
    setActive(Math.max(1, Math.min(total, idx1)));
  const onPrev = () => goTo(active - 1);
  const onNext = () => goTo(active + 1);

  const pos = (idx: number) =>
    data.length > 1 ? (idx / (data.length - 1)) * 100 : 0;

  return (
    <section className={`${styles.wrapsteps} ${className || ""}`}>
      <div className={styles.container}>
        <Tag icon={<SafetyOutlined />} className={styles.pill}>
          How It Works
        </Tag>

        <Title level={1} className={styles.heading}>
          From Property to Digital Ownership
        </Title>

        <Paragraph className={styles.sub}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s
        </Paragraph>

        <Title level={4} className={styles.subHeading}>
          Step-by-Step Tokenization Process
        </Title>

        <div className={styles.stepRail}>
          <div className={styles.line} />
          {data.map((s, idx) => (
            <button
              key={s.key}
              className={`${styles.stepPill} ${
                active === idx + 1 ? styles.active : ""
              }`}
              style={{ left: `${pos(idx)}%` }}
              onClick={() => goTo(idx + 1)}
              aria-label={`Go to step ${idx + 1}`}
              type="button"
            >
              STEP - {idx + 1}
            </button>
          ))}
        </div>

        <div className={styles.slider} ref={trackRef} aria-label="Steps slider">
          <div className={styles.track}>
            {data.map((s, idx) => (
              <div
                key={s.key}
                ref={setCardRef(idx)}
                className={`${styles.slide} ${
                  active === idx + 1 ? styles.slideActive : ""
                }`}
              >
                <Card bordered className={styles.stepCard} bodyStyle={{ padding: 24 }}>
                  <Title level={4} className={styles.cardTitle}>
                    {s.title}
                  </Title>
                  <Paragraph className={styles.cardBlurb}>{s.blurb}</Paragraph>
                  <div className={styles.detailsTitle}>
                    {s.detailsTitle || "Process Details:"}
                  </div>
                  <ul className={styles.details}>
                    {s.details.map((d, di) => (
                      <li key={di}>
                        <CheckCircleFilled className={styles.check} /> {d}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footerNav}>
          <Button
            className={styles.prevBtn}
            icon={<LeftOutlined />}
            disabled={active === 1}
            onClick={onPrev}
          >
            Previous Step
          </Button>

          <div className={styles.counter}>
            <Text strong>{active}</Text> <Text type="secondary">of</Text>{" "}
            <Text strong>{total}</Text>
          </div>

          <Button
            type="primary"
            className={styles.nextBtn}
            icon={<RightOutlined />}
            onClick={onNext}
            disabled={active === total}
          >
            Next Step
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
