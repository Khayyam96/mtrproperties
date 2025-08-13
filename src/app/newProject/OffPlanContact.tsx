"use client";

import { Button, Col, Form, Input, Row, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Container } from "../../components/Lib/ProContainer/Container";

const { Title } = Typography;

interface ContactFormValues {
  name: string;
  email: string;
}

export const OffPlanContact = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [phone, setPhone] = useState<string>("");

  const onFinish = (values: ContactFormValues) => {
    const payload = { ...values, phone };
    console.log("Submitted:", payload);
  };

  return (
    <section className="offplan-contact-section">
      <Container>
        <Row justify="center" gutter={[24, 24]}>
          <Col xs={24} md={10} className="left-col">
            <div className="text-content">
              <Title level={4}>Do you want to know more abouasdasdasdt</Title>
              <Title level={2}>OFF PLAN</Title>
              <Title level={2}>PROPERTIES IN DUBAI</Title>
            </div>
          </Col>

          <Col xs={24} md={10}>
            <div className="form-wrapper">
              <Form<ContactFormValues>
                layout="vertical"
                form={form}
                onFinish={onFinish}
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
                  <PhoneInput
                    country={"ae"}
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<ArrowRightOutlined />}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OffPlanContact;
