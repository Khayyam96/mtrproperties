"use client";

import dynamic from "next/dynamic";
import { Row, Col, Typography, Card, Form, Input, Button, message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import Image from "next/image";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import type { ContactSettingsResponse } from "../../models/Contact.mode";

import arrow from "../../../public/arrow-righticontwo.svg";
import location from "../../../public/location-marker.png";
import telphone from "../../../public/phoneIcon.svg";
import letter from "../../../public/letterIcon.svg";

const { Title, Paragraph } = Typography;

const MapStrip = dynamic(() => import("./MapStrip"), { ssr: false });

type Props = {
  contact: ContactSettingsResponse;
};

type FormValues = {
  name: string;
  email: string;
  message?: string;
};

export default function ContactSection({ contact }: Props) {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const onFinish = async ({ name, email, message: msg }: FormValues) => {
    setLoading(true);
    try {
      const payload = { name, email, phone, message: msg ?? "" };

      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      console.log("Contact payload:", payload);
      await new Promise((r) => setTimeout(r, 800));
      message.success("Your message has been sent successfully.");
      form.resetFields();
      setPhone("");
    } catch {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <MapStrip
        lat={contact?.lat}
        long={contact?.long}
        address={contact?.address}
        phone={contact?.phone}
        email={contact?.email}
      />

      <section className="contact-wrap">
        <div className="container">
          <div className="header text-center">
            <Title level={2} className="title">Contact Us</Title>
            <Paragraph className="subtitle">
              Get in touch with our team. We typically respond within one business day.
            </Paragraph>
          </div>

          <Row justify="center">
            <Col xs={24} lg={18}>
              <Row gutter={[24, 24]} align="top">
                <Col xs={24} md={12}>
                  <Title level={5} className="form-title">Email to Us</Title>
                  <Card className="form-card" bordered={false}>
                    <Form<FormValues>
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
                        <Input placeholder="eg: John Doe" size="large" />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter your email" },
                          { type: "email", message: "Please enter a valid email" },
                        ]}
                      >
                        <Input placeholder="eg: john@email.com" size="large" />
                      </Form.Item>

                      <Form.Item
                        label="Phone Number"
                        name="phone"  // ✅ name əlavə olundu ki, rules işləsin
                        rules={[
                          {
                            validator: (_, value) =>
                              (value ?? phone)?.toString().trim().length > 0
                                ? Promise.resolve()
                                : Promise.reject(new Error("Please enter your phone number")),
                          },
                        ]}
                        required
                      >
                        <PhoneInput
                          country={"az"}
                          value={phone}
                          onChange={(v) => setPhone(v)}
                          inputProps={{ name: "phone", required: true, "aria-label": "Phone number" }}
                          containerClass="phone-container"
                          inputClass="phone-input"
                          buttonClass="phone-button"
                          placeholder="eg: 050123456"
                        />
                      </Form.Item>

                      <Form.Item label="Message" name="message">
                        <Input.TextArea
                          rows={4}
                          placeholder="eg: I want to know about..."
                          maxLength={1000}
                          showCount
                        />
                      </Form.Item>

                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="submit-btn"
                        loading={loading}
                        block
                      >
                        Submit
                        <Image src={arrow} alt="arrow" />
                      </Button>
                    </Form>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card className="info-card" bordered={false}>
                    <ul className="info-list">
                      <li>
                        <Image className="icon" src={location} alt="address" />
                        <div>
                          <Paragraph className="info-text">{contact?.address}</Paragraph>
                        </div>
                      </li>

                      <li>
                        <Image className="icon" src={telphone} alt="phone" />
                        <div>
                          <Paragraph className="info-text">{contact?.phone}</Paragraph>
                        </div>
                      </li>

                      <li>
                        <Image className="icon" src={letter} alt="email" />
                        <div>
                          <Paragraph className="info-text">{contact?.email}</Paragraph>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>

      <SubscribeSection />
    </div>
  );
}
