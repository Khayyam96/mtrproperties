"use client";

import React, { useState, FC } from "react";
import { Row, Col, Form, Input, Button, Typography, Select, message } from "antd";
import type { SelectProps } from "antd";
import { COUNTRIES, iso2ToFlag } from "@/constants/countries";

const { Title, Text } = Typography;

type PhoneValue = {
  country: string;
  national: string;
};

type ContactFormValues = {
  name: string;
  email: string;
  phone: PhoneValue;
};

const API_URL = "https://api.dubaiyachts.com/properties/api/v1/client/forms/lead";
const UPLOAD_BASE = "https://api.dubaiyachts.com/uploads/properties";

type LeadFormData = {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
};

type TProps = {
  data: LeadFormData;
};

const toImageUrl = (p?: string) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  const clean = p.replace(/^\/+/, "");
  return `${UPLOAD_BASE}/${clean}`;
};

const ContactAgentSection: FC<TProps> = ({ data }) => {
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);

  const findDial = (iso2?: string) =>
    COUNTRIES.find((c) => c.iso2 === iso2)?.dialCode || "";

  const countryOptions: SelectProps["options"] = COUNTRIES.map((c) => ({
    value: c.iso2,
    label: `${c.name} (+${c.dialCode})`,
  }));

  const filterOption: SelectProps["filterOption"] = (input, option) => {
    const iso2 = String(option?.value || "").toLowerCase();
    const label = String(option?.label || "").toLowerCase();
    return label.includes(input.toLowerCase()) || iso2.includes(input.toLowerCase());
  };

  const onFinish = async (values: ContactFormValues) => {
    try {
      setLoading(true);
      const dial = findDial(values.phone.country);
      const phoneCountryCode = dial ? `+${dial}` : "";
      const phoneNumber = (values.phone.national || "").replace(/[^\d]/g, "");
      const payload = { name: values.name, email: values.email, phoneCountryCode, phoneNumber };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = `Request failed: ${res.status}`;
        try {
          const d = await res.json();
          errText = d?.message || d?.error || errText;
        } catch {}
        throw new Error(errText);
      }

      message.success("Your request has been submitted successfully.");
      form.setFieldsValue({ name: "", email: "", phone: { country: "AE", national: "" } });
    } catch (e: unknown) {
      const errMsg =
        e instanceof Error ? e.message : typeof e === "string" ? e : "Submission failed. Please try again.";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const bgUrl = toImageUrl(data?.imageUrl);
  const bgStyle: React.CSSProperties = bgUrl
    ? {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <div className="contact-agent-section" style={bgStyle}>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12} className="contact-agent-section__left">
          <div className="contact-agent-section__content">
            <Title level={2}>{data?.title}</Title>
            <Text>{data?.subtitle}</Text>
          </div>
        </Col>

        <Col xs={24} md={12} className="contact-agent-section__right">
          <div className="contact-agent-section__form-wrapper">
            <Title level={4}>Get a call back from us</Title>

            <Form<ContactFormValues>
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ phone: { country: "AE", national: "" } }}
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
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="eg: john@email.com" />
              </Form.Item>

              <Form.Item label="Phone Number" required>
                <Input
                  size="large"
                  placeholder="eg: 050 123 456"
                  addonBefore={
                    <Form.Item name={["phone", "country"]} noStyle rules={[{ required: true }]}>
                      <Select
                        showSearch
                        options={countryOptions}
                        filterOption={filterOption}
                        style={{ width: 180 }}
                        optionRender={(option) => {
                          const iso2 = String(option.value);
                          const dial = findDial(iso2);
                          const name = String(option.label).replace(/\s*\(\+\d+\)\s*$/, "");
                          return (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 18 }}>{iso2ToFlag(iso2)}</span>
                              <span
                                style={{
                                  flex: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {name}
                              </span>
                              <span style={{ opacity: 0.7 }}>+{dial}</span>
                            </div>
                          );
                        }}
                        labelRender={(props) => {
                          const iso2 = String(props.value);
                          const c = COUNTRIES.find((x) => x.iso2 === iso2);
                          if (!c) return props.label;
                          return (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 18 }}>{iso2ToFlag(iso2)}</span>
                              <span style={{ fontWeight: 500 }}>+{c.dialCode}</span>
                            </div>
                          );
                        }}
                      />
                    </Form.Item>
                  }
                  onChange={(e) => form.setFieldValue(["phone", "national"], e.target.value)}
                  value={Form.useWatch(["phone", "national"], form)}
                />
                <Form.Item
                  name={["phone", "national"]}
                  noStyle
                  rules={[
                    { required: true, message: "Please enter your phone number" },
                    {
                      validator: async (_, v: string) => {
                        const digits = (v || "").replace(/[^\d]/g, "");
                        if (digits.length < 7) return Promise.reject("Phone number looks too short");
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input style={{ display: "none" }} />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
                  {data?.buttonText || "Submit"}
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
