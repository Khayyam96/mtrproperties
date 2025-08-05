"use client";

import { Row, Col, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";


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

export const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-header">
        <Title level={2}>About MTR Properties</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>

      </div>

      <Row gutter={[24, 24]} justify="center">
        {cards.map((card, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className="about-card">
              <Title level={4}>{card.title}</Title>
              <Paragraph>{card.content}</Paragraph>
              <Button type="primary" icon={<ArrowRightOutlined />} className="about-btn">
                {card.button}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default AboutSection;
