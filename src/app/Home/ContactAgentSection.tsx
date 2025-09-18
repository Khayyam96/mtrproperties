"use client";

import React, { useState, FC } from "react";
import { Row, Col, Form, Input, Button, Typography, Select, message } from "antd";
import type { SelectProps } from "antd";
import { COUNTRIES, iso2ToFlag } from "@/constants/countries";
import { notification } from "antd";

const { Title, Text } = Typography;

type PhoneValue = {
  country: string;
  national: string;
};

type ContactFormValues = {
  name: string;
  email: string;
  phone: PhoneValue;
  message: string;
};

const MOCK_LEAD_DATA = {
  title: "Contact Our Agent",
  subtitle: "Fill out the form and we will get back to you shortly.",
  buttonText: "Submit Request",
  imageUrl: "/sectionimg.png",
};

const ContactAgentSection: FC = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const maxLength = 500;

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
    setLoading(true);
    try {
      const dial = findDial(values.phone.country);
      const phoneNumber = (values.phone.national || "").replace(/[^\d]/g, "");
      const fullPhone = dial ? `+${dial}${phoneNumber}` : phoneNumber;

      const payload = {
        fullname: values.name,
        email: values.email,
        phone: fullPhone,
        message: values.message,
      };

      const res = await fetch(
        "https://api.dubaiyachts.com/properties/api/v1/client/contact-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 201) {
        form.resetFields();
        setMessageLength(0);
        notification.success({
          message: "Uğurludur!",
          description: "Sizin müraciətiniz uğurla göndərildi.",
          placement: "topRight",
        });
        console.log("Created"); // ekranda və ya konsolda göstərə bilərsən
      } else {
        let errText = `Request failed: ${res.status}`;
        try {
          const d = await res.json();
          errText = d?.message || d?.error || errText;
        } catch { }
        throw new Error(errText);
      }
    } catch (e: unknown) {
      const errMsg =
        e instanceof Error ? e.message : typeof e === "string" ? e : "Submission failed. Please try again.";
      notification.error({
        message: "Xəta baş verdi",
        description: errMsg,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };


  const bgStyle: React.CSSProperties = MOCK_LEAD_DATA.imageUrl
    ? {
      backgroundImage: `url(${MOCK_LEAD_DATA.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }
    : {};

  const messageValue = Form.useWatch("message", form);

  return (
    <div className="contact-agent-section" style={bgStyle}>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12} className="contact-agent-section__left">
          <div className="contact-agent-section__content">
            <Title level={2}>{MOCK_LEAD_DATA.title}</Title>
            <Text>{MOCK_LEAD_DATA.subtitle}</Text>
          </div>
        </Col>

        <Col xs={24} md={12} className="contact-agent-section__right">
          <div className="contact-agent-section__form-wrapper">
            <Title level={4}>Get a call back from us</Title>

            <Form<ContactFormValues>
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ phone: { country: "AE", national: "" }, message: "" }}
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
                        style={{ width: 100 }}
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

              <Form.Item
                label="Message / Notes"
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <Input.TextArea
                  placeholder="Write your message here..."
                  maxLength={maxLength}
                  style={{ height: 60, resize: "none" }}
                  value={messageValue}
                  onChange={(e) => {
                    setMessageLength(e.target.value.length);
                    form.setFieldValue("message", e.target.value);
                  }}
                />
                <div style={{ textAlign: "right", fontSize: 12, opacity: 0.6 }}>
                  {messageLength} / {maxLength}
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
                  {MOCK_LEAD_DATA.buttonText}
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
