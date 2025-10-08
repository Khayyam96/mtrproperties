"use client";

import { useState } from "react";
import { Col, Row, Form, Input, Button, Typography, message } from "antd";
import "./index.scss";

const { Title, Text } = Typography;

const API_URL =
  "https://api.dubaiyachts.com/properties/api/v1/client/newsletter/subscribe";

type SubscribeValues = { name: string; email: string };
type ApiResponse = { message?: string; error?: string };

export const SubscribeSection = () => {
  const [form] = Form.useForm<SubscribeValues>();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: SubscribeValues) => {
    try {
      setSubmitting(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
        }),
      });

      let data: ApiResponse = {};
      try {
        data = (await res.json()) as ApiResponse;
      } catch {
        // ignore JSON parse errors; we'll fall back to status text
      }

      if (!res.ok) {
        const errMsg =
          data.message ||
          data.error ||
          `Subscribe failed (${res.status})`;
        throw new Error(errMsg);
      }

      message.success("Subscribed! Please check your inbox.");
      form.resetFields();
    } catch (err) {
      const errMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="subscribe-section">
      <Title level={3} className="text-center">
        Subscribe to our Newsletter
      </Title>
      <Text className="text-center d-block mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row justify="center" gutter={16}>
          <Col xs={24} md={4}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="eg: John Doe" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="eg: john@email.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={4}>
            <Form.Item colon={false}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                disabled={submitting}
              >
                Subscribe
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
