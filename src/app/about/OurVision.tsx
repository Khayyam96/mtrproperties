"use client";

import { Col, Row, Typography } from "antd";
import { Container } from "../../components/Lib/ProContainer/Container";


const { Title, Text } = Typography;

export const OurVision = () => {
  return (
    <div className="our-vision-section">
      <Container>
        <div className="text-center">
          <Title level={2}>Our Vision</Title>
          <Text className="subtitle">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Text>
        </div>

        <Row gutter={[24, 24]} justify="center" className="vision-cards">
          {[1, 2, 3].map((item) => (
            <Col xs={24} md={8} key={item}>
              <div className="vision-card">
                <h4>Heading 1</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC,
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
