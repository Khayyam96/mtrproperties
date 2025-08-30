"use client";

import { FC } from "react";
import { Typography, Button } from "antd";
import { TeamOutlined, DownloadOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  className?: string;
  heading?: string;
  subtext?: string;
  /** If provided, Download button becomes a link with download attr */
  downloadHref?: string;
  onDownload?: () => void;
  onContact?: () => void;
  contactHref?: string;
  contactTarget?: "_blank" | "_self";
};

const LegalConsultation: FC<Props> = ({
  className,
  heading = "Need Legal Consultation?",
  subtext = "Our legal team is available to answer questions about the regulatory framework, your rights as an investor, and any compliance matters.",
  downloadHref,
  onDownload,
  onContact,
  contactHref,
  contactTarget = "_self",
}) => {
  const DownloadBtn = (
    <Button
      className={styles.btnOutline}
      size="large"
      onClick={downloadHref ? undefined : onDownload}
      href={downloadHref}
      download={downloadHref ? "" : undefined}
    >
      <span>Download Documents</span>
      <DownloadOutlined className={styles.iconRight} />
    </Button>
  );

  const ContactBtn = (
    <Button
      type="primary"
      className={styles.btnPrimary}
      size="large"
      onClick={contactHref ? undefined : onContact}
      href={contactHref}
      target={contactHref ? contactTarget : undefined}
    >
      <TeamOutlined className={styles.iconLeft} />
      <span>Contact Our Team</span>
    </Button>
  );

  return (
    <section className={`${styles.wraplegal} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <Title level={3} className={styles.heading}>
            {heading}
          </Title>
          <Paragraph className={styles.sub}>{subtext}</Paragraph>

          <div className={styles.actions}>
            {DownloadBtn}
            {ContactBtn}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalConsultation;
