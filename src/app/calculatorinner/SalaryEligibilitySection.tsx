"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Typography, Button } from "antd";
import "./index.scss";

const { Title, Paragraph } = Typography;

type Props = {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  ctaText?: string;
  ctaHref?: string;
  onCta?: () => void;
  className?: string;
  imageHeight?: number;
};

const defaultBullets = [
  "Lorem Ipsum has been the industry's standard",
  "Lorem Ipsum has been the industry's standard",
  "dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting",
  "dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting",
];

const SalaryEligibilitySection: FC<Props> = ({
  image = "/salary-eligibility.jpg",
  imageAlt = "Salary eligibility illustration",
  title = "Salary Eligibility Criteria",
  description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  bullets = defaultBullets,
  ctaText = "Contact Us Now",
  ctaHref,
  onCta,
  className,
  imageHeight = 300,
}) => {
  return (
    <section className={`wrapsalary ${className || ""}`}>
      <div className="container">
        <div className="panel">
          <Row gutter={16} align="middle">
            <Col xs={24} lg={10}>
              <div className="imageCard" style={{ height: imageHeight }}>
                <Image src={image} alt={imageAlt} fill className="image" sizes="(max-width: 992px) 100vw, 40vw" priority />
              </div>
            </Col>

            <Col xs={24} lg={14}>
              <div className="content">
                <Title level={3} className="title">{title}</Title>
                <Paragraph className="desc">{description}</Paragraph>

                {!!bullets.length && (
                  <ul className="list">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}

                {ctaHref ? (
                  <Link href={ctaHref} className="btnLink">
                    <Button type="primary" size="large" className="btn">{ctaText}</Button>
                  </Link>
                ) : (
                  <Button type="primary" size="large" className="btn" onClick={onCta}>{ctaText}</Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default SalaryEligibilitySection;
