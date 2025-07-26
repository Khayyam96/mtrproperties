"use client";

import { Col, Row, Typography, Card } from "antd";
import Image from "next/image";
import { Container } from "../../components/Lib/ProContainer/Container"; 
import "./index.scss";

const { Title, Text } = Typography;

const services = [
  {
    icon: "/team1.png",
    title: "Our Team",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,",
  },
  {
    icon: "/team2.png",
    title: "Our Success",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,",
  },
  {
    icon: "/team3.png",
    title: "Our Experience",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,",
  },
  {
    icon: "/team4.png",
    title: "Our Highlights",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,",
  },
];

export const OurServices = () => {
  return (
    <div className="our-services">
      <Container>
        <Title level={2}>Our Services</Title>
        <Text className="subtitle">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
        </Text>

        <Row gutter={[24, 24]} className="cards-row">
          {services.map((service, idx) => (
            <Col xs={24} md={12} lg={6} key={idx}>
              <Card className="service-card" bordered={false}>
                <div className="icon">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                  />
                </div>
                <Title level={4}>{service.title}</Title>
                <Text>{service.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
