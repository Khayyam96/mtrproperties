"use client";

import { Typography } from "antd";
import Image from "next/image";
import "./index.scss";

const { Title, Paragraph } = Typography;

export const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <Image
        src="/hero.png"         
        alt="Luxury villa with pool"
        fill
        priority
        className="hero__bg"
      />

      <div className="hero__overlay">
        <div>
          <Title level={2} className="hero__title">
            Our Specialist Agents
            <br />
            <span>will help you choose the right property</span>
          </Title>
          <Paragraph className="hero__subtitle">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
