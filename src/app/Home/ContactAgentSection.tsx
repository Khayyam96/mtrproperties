"use client";

import { Row, Col, Form, Input, Button, Typography } from "antd";
import React from "react";


const { Title, Text } = Typography;

// Dəyərlərin tipi müəyyən edilir
type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
};

const ContactAgentSection: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();

  const onFinish = (values: ContactFormValues) => {
    console.log("Submitted: ", values);
  };

  return (
    <div className="contact-agent-section">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12} className="contact-agent-section__left">
          <div className="contact-agent-section__content">
            <Title level={2}>Speak with our Real Estate Agents in Dubai</Title>
            <Text>
              Tired of searching your dream home in Dubai? Let our experts help you
              find your dream property in Dubai. Just fill out an online request and
              our professional real estate agents in Dubai will contact you at your
              convenient time to discuss further.
            </Text>
          </div>
        </Col>
        <Col xs={24} md={12} className="contact-agent-section__right">
          <div className="contact-agent-section__form-wrapper">
            <Title level={4}>Get a call back from us</Title>
            <Form<ContactFormValues> form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="eg: John Doe" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
              >
                <Input placeholder="eg: john@email.com" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input
                  addonBefore={<span>🇦🇪 +971</span>}
                  placeholder="eg: 050123456"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactAgentSection;
