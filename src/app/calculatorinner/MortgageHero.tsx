"use client";

import { FC } from "react";
import Image from "next/image";
import { Typography } from "antd";
import "./index.scss";

const { Title, Paragraph } = Typography;

type Props = {
  image?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  overlay?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

const MortgageHero: FC<Props> = ({
  image = "/mortgage-hero.jpg",
  title = "Mortgage Calculator",
  subtitle = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
  height = 240,
  overlay = 0.45,
  className,
  priority = true,
  alt = "Mortgage hero background",
}) => {
  return (
    <section className={`wraphero ${className || ""}`} style={{ height }}>
      <div className="bgWrap" aria-hidden>
        <Image src={image} alt={alt} fill priority={priority} className="bg" sizes="100vw" />
        <div className="overlay" style={{ background: `rgba(0,0,0,${overlay})` }} />
      </div>

      <div className="content">
        <div className="container">
          <Title level={2} className="title">{title}</Title>
          <Paragraph className="subtitle">{subtitle}</Paragraph>
        </div>
      </div>
    </section>
  );
};

export default MortgageHero;
