"use client";

import { FC, useMemo, useState } from "react";
import { Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

type Team = {
  name: string;
  status: "hiring" | "next" | "soon";
};

type Props = {
  heading?: string;
  subheading?: string;
  teams?: Team[];
  positionsCount?: number;
  className?: string;
  onSelect?: (team: Team, index: number) => void;
};

const defaultTeams: Team[] = [
  { name: "Downtown Dubai", status: "hiring" },
  { name: "Palm Jumeirah", status: "next" },
  { name: "Dubai Marina", status: "soon" },
  { name: "Bussiness Bay", status: "soon" },
  { name: "Dubai Hills", status: "soon" },
];

const AreaTeamsSection: FC<Props> = ({
  heading = "Join Specialized Area Teams",
  subheading =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  teams,
  positionsCount = 5,
  className,
  onSelect,
}) => {
  const data = useMemo(() => (teams?.length ? teams : defaultTeams), [teams]);
  // default active = first “hiring” or index 0
  const defaultIndex =
    data.findIndex((t) => t.status === "hiring") >= 0
      ? data.findIndex((t) => t.status === "hiring")
      : 0;
  const [active, setActive] = useState(defaultIndex);

  const handleSelect = (idx: number) => {
    setActive(idx);
    onSelect?.(data[idx], idx);
  };

  return (
    <section className={`${styles.wraparea} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={1} className={styles.h1}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Chips panel */}
        <div className={styles.panel}>
          {data.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                className={`${styles.chip} ${isActive ? styles.active : ""}`}
                onClick={() => handleSelect(i)}
                type="button"
              >
                <Text strong className={styles.chipText}>
                  {t.name}
                </Text>

                {t.status === "hiring" && (
                  <span className={`${styles.badge} ${styles.badgeHiring}`}>
                    Hiring Now
                  </span>
                )}
                {t.status === "next" && (
                  <span className={`${styles.badge} ${styles.badgeNext}`}>
                    Next Month
                  </span>
                )}
                {t.status === "soon" && (
                  <span className={`${styles.badge} ${styles.badgeSoon}`}>
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom availability pill */}
        <div className={styles.footerPill}>
          <TeamOutlined />
          <span>
            {positionsCount} Position{positionsCount !== 1 ? "s" : ""} Available
          </span>
        </div>
      </div>
    </section>
  );
};

export default AreaTeamsSection;
