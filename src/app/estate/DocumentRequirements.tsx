"use client";

import { FC, useMemo } from "react";
import { Row, Col, Card, Typography } from "antd";
import styles from "./index.module.scss";

const { Title } = Typography;

type Group = {
  title: string;
  items: string[];
  borderColor: string;
  bgColor: string;
  titleColor: string;
};

type Props = {
  className?: string;
  heading?: string;
  groups?: Group[];
};

const defaults: Group[] = [
  {
    title: "UAE Residents",
    items: ["Emirates ID", "UAE Bank Account", "Salary Certificate", "Proof of Address"],
    borderColor: "#16a34a",
    bgColor: "#f0fdf4",
    titleColor: "#16a34a",
  },
  {
    title: "Non-UAE Residents",
    items: ["Valid Passport", "International Bank Account", "Proof of Income", "Proof of Address"],
    borderColor: "#2563eb",
    bgColor: "#eef5ff",
    titleColor: "#2563eb",
  },
  {
    title: "Corporate Investors",
    items: ["Trade License", "Corporate Bank Account", "Board Resolution", "Authorized Signatory List"],
    borderColor: "#7c3aed",
    bgColor: "#f5f0ff",
    titleColor: "#7c3aed",
  },
];

const DocumentRequirements: FC<Props> = ({ className, heading = "Document Requirements", groups }) => {
  const data = useMemo(() => groups ?? defaults, [groups]);

  return (
    <section className={`${styles.wraprequirement} ${className || ""}`}>
      <div className={styles.container}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>

        <Row gutter={[24, 24]}>
          {data.map((g, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card
                className={styles.card}
                bodyStyle={{ padding: 20 }}
                style={{
                  borderColor: g.borderColor,
                  background: g.bgColor,
                }}
              >
                <div className={styles.cardTitle} style={{ color: g.titleColor }}>
                  {g.title}
                </div>

                <ul className={styles.list}>
                  {g.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default DocumentRequirements;
