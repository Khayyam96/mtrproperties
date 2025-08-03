"use client";

import { Typography, Row, Col, Card } from "antd";
import { Container } from "../../components/Lib/ProContainer/Container";


const { Title, Text } = Typography;

type Reason = {
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    title: "Heading 1",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    title: "Heading 2",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    title: "Heading 3",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
];

export const ReasonToInvest = () => {
  return (
    <section className="reason-section">
      <Container>
        <div className="text-center mb-5">
          <Title level={2}>Reason to invest in Dubai</Title>
          <Text>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {reasons.map((reason, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="reason-card" bordered={false}>
                <Title level={4}>{reason.title}</Title>
                <Text>{reason.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ReasonToInvest;
