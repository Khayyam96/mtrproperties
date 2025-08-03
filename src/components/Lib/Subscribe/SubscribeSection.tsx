"use client";

import { Col, Row, Form, Input, Button, Typography } from "antd";
import "./index.scss";

const { Title, Text } = Typography;

export const SubscribeSection = () => {
  return (
    <div className="subscribe-section">
      <Title level={3} className="text-center">Subscribe to our Newsletter</Title>
      <Text className="text-center d-block mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Form layout="vertical">
        <Row justify="center" gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="Name" name="name">
              <Input placeholder="eg: John Doe" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Email" name="email">
              <Input placeholder="eg: john@email.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={3}>
            <Form.Item label="." name="submit">
              <Button>Subscribe</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
