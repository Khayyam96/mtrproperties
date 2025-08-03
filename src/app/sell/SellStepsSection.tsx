"use client";

import { Row, Col, Typography, Form, Input, Select, Button } from "antd";
import { FaqAccordion } from "../../components/Lib/ProAccardion/FaqAccordion"
import { Container } from "@/components/Lib/ProContainer/Container";


const { Title, Paragraph } = Typography;
const { Option } = Select;

const faqItems = [
  {
    key: "1",
    label: "Step 1 - Contact our Agent",
    children: (
      <Row gutter={32} className="step-content">
        <Col xs={24} md={12}>
          <Title level={4} className="contact-title">
            Our agent will contact you soon
          </Title>
          <Paragraph className="contact-text">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <div className="form-wrapper">
            <Title level={5}>Fill out the form</Title>
            <Form layout="vertical">
              <Form.Item label="Name" name="name">
                <Input placeholder="eg: John Doe" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="eg: john@email.com" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="eg: 050123456" />
              </Form.Item>
              <Form.Item label="Listing Type" name="listingType">
                <Select defaultValue="Any">
                  <Option value="Any">Any</Option>
                  <Option value="Rent">Rent</Option>
                  <Option value="Sale">Sale</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input placeholder="eg: Apt. no. 001, Bld. Tower, UAE" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="submit-btn">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    ),
  },
  {
    key: "2",
    label: "Step 2 - Gathering all Information",
    children: <p>We will gather all the necessary information for your property.</p>,
  },
  {
    key: "3",
    label: "Step 3 - Shoot Video and Photo of Property",
    children: <p>Our team will shoot high-quality photos and videos.</p>,
  },
  {
    key: "4",
    label: "Step 4 - Marketing your Property",
    children: <p>Your property will be listed and promoted on top channels.</p>,
  },
  {
    key: "5",
    label: "Step 5 - Showing Result",
    children: <p>We will show you the feedback and results from potential buyers.</p>,
  },
];

export const SellStepsSection = () => {
  return (
    <section className="sell-steps-section">
      <Container>
        <Row justify="center">
          <Col xs={24} md={16} lg={16}>
            <div className="title-container">
              <Paragraph className="subtitle text-center">
                Scroll to find out the steps we follow to sell your property
              </Paragraph>
            </div>
            <FaqAccordion items={faqItems} defaultActiveKey={["1"]} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SellStepsSection;
