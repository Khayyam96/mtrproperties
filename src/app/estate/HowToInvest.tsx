"use client";

import { FC, useMemo, useState } from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import {
  UserAddOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  FileDoneOutlined,
  CheckCircleFilled,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Step = {
  id: number;
  label: string;           // STEP 1
  title: string;           // Sign Up on Prypco
  icon: React.ReactNode;
  iconColor: string;       // e.g. "#16a34a"
  iconBg: string;          // e.g. "#dcfce7"
  description: string;
  bullets: string[];
};

type Props = {
  className?: string;
  heading?: string;
  subtext?: string;
  steps?: Step[];
  onCTA?: () => void;
};

const defaultSteps: Step[] = [
  {
    id: 1,
    label: "STEP 1",
    title: "Sign Up on Prypco",
    icon: <UserAddOutlined />,
    iconColor: "#16a34a",
    iconBg: "#dcfce7",
    description:
      "Register on the Prypco platform with your basic information",
    bullets: [
      "Valid email address",
      "Mobile phone number",
      "Create secure password",
      "Accept terms & conditions",
    ],
  },
  {
    id: 2,
    label: "STEP 2",
    title: "Complete KYC Verification",
    icon: <SafetyCertificateOutlined />,
    iconColor: "#9333ea",
    iconBg: "#efe7ff",
    description:
      "Verify your identity to meet regulatory requirements and keep your account secure.",
    bullets: [
      "Upload ID document",
      "Selfie / liveness check",
      "Address verification",
      "Automatic review",
    ],
  },
  {
    id: 3,
    label: "STEP 3",
    title: "Fund Your Account",
    icon: <CreditCardOutlined />,
    iconColor: "#2563eb",
    iconBg: "#eaf2ff",
    description:
      "Add AED balance to your wallet using supported local payment methods.",
    bullets: ["AED payments", "Fast settlement", "Secure processors", "No crypto needed"],
  },
  {
    id: 4,
    label: "STEP 4",
    title: "Purchase Property Tokens",
    icon: <ShoppingOutlined />,
    iconColor: "#ec4899",
    iconBg: "#ffe4f1",
    description:
      "Choose a listed property and buy the number of tokens that fits your budget.",
    bullets: ["Browse offerings", "Select quantity", "Confirm purchase", "Instant allocation"],
  },
  {
    id: 5,
    label: "STEP 5",
    title: "Receive Digital Certificate",
    icon: <FileDoneOutlined />,
    iconColor: "#16a34a",
    iconBg: "#dcfce7",
    description:
      "Get a tamper-proof on-chain proof of ownership stored in your account.",
    bullets: ["View certificate", "Track ownership", "Download receipt", "Start earning benefits"],
  },
];

const HowToInvest: FC<Props> = ({
  className,
  heading = "How to Participate in Investing",
  subtext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  steps,
  onCTA,
}) => {
  const data = useMemo(() => steps ?? defaultSteps, [steps]);
  const [active, setActive] = useState<number>(data[0]?.id ?? 1);
  const activeStep = useMemo(
    () => data.find((s) => s.id === active) ?? data[0],
    [active, data]
  );

  return (
    <section className={`${styles.wrapinvest} ${className || ""}`}>
      <div className={styles.container}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>
        <Paragraph className={styles.sub}>{subtext}</Paragraph>

        <Row gutter={[24, 24]}>
          {/* Left: steps list */}
          <Col xs={24} lg={10}>
            <div className={styles.list}>
              {data.map((s) => {
                const isActive = s.id === active;
                return (
                  <button
                    key={s.id}
                    className={`${styles.listItem} ${isActive ? styles.active : ""}`}
                    onClick={() => setActive(s.id)}
                    type="button"
                  >
                    <span
                      className={styles.iconBox}
                      style={{ color: s.iconColor, backgroundColor: s.iconBg }}
                    >
                      {s.icon}
                    </span>
                    <span className={styles.meta}>
                      <span className={styles.stepLabel}>{s.label}</span>
                      <span className={styles.stepTitle}>{s.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Col>

          {/* Right: details */}
          <Col xs={24} lg={14}>
            <Card className={styles.detailCard} bodyStyle={{ padding: 22 }}>
              <div
                className={styles.detailIcon}
                style={{
                  color: activeStep.iconColor,
                  backgroundColor: activeStep.iconBg,
                }}
              >
                {activeStep.icon}
              </div>

              <Title level={4} className={styles.detailTitle}>
                {activeStep.title}
              </Title>

              <Paragraph className={styles.detailDesc}>
                {activeStep.description}
              </Paragraph>

              <div className={styles.reqHeading}>Requirements:</div>
              <ul className={styles.reqList}>
                {activeStep.bullets.map((b, idx) => (
                  <li key={idx}>
                    <CheckCircleFilled className={styles.reqCheck} />
                    {b}
                  </li>
                ))}
              </ul>

              <Button
                type="primary"
                className={styles.cta}
                size="large"
                onClick={onCTA}
              >
                Contact Our Team <TeamOutlined />
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HowToInvest;
