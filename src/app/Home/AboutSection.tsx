"use client";

import { Row, Col, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import { FC } from "react";


const { Title, Paragraph } = Typography;

const cards = [
  {
    title: "More About us",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    button: "Read more",
  },
  {
    title: "Contact Us",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    button: "Contact Us",
  },
  {
    title: "Our Agents",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    button: "View More",
  },
];


type TProps = {
  title?: string;
  subtitle?: string;
};

export const AboutSection: FC<TProps> = ({ title, subtitle }) => {
  return (
    <section className="about-section">
      <Container>
        <div className="about-header">
        <Title level={2}>{title ?? ""}</Title>
        {subtitle ?
        <Paragraph className="about-text">
          {subtitle}
        </Paragraph>
         : null}

      </div>

      <Row gutter={[24, 24]} justify="center">
        {cards.map((card, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className="about-card">
              <Title level={4}>{card.title}</Title>
              <Paragraph className="card-text">{card.content}</Paragraph>
              <Button type="primary" className="about-btn">
                {card.button}
                <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
