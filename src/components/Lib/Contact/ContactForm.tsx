"use client";

import { useState } from "react";
import { Button, Form, Input, Select } from "antd";

type ContactFormValues = {
  name: string;
  email: string;
  phonePrefix: string;
  phone: string;
  message: string;
};

const countryOptions = [
  { label: "🇦🇪 +971", value: "+971" },
  { label: "🇦🇿 +994", value: "+994" },
  { label: "🇹🇷 +90", value: "+90" },
  { label: "🇬🇧 +44", value: "+44" },
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm<ContactFormValues>();

  const onFinish = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // Burada real API çağırışını et (fetch/axios).
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      console.log("Submit:", values);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name="phonePrefix" noStyle initialValue="+971">
      <Select options={countryOptions} style={{ width: 110 }} />
    </Form.Item>
  );

  return (
    <Form<ContactFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
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
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input placeholder="eg: john@email.com" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        required
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
          style={{ display: "inline-block", width: "100%" }}
        >
          <Input
            placeholder="eg: 050123456"
            addonBefore={prefixSelector}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Please enter your message" }]}
      >
        <Input.TextArea
          placeholder="eg: I want to know about…"
          autoSize={{ minRows: 4, maxRows: 6 }}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
      >
        Submit
      </Button>
    </Form>
  );
}
