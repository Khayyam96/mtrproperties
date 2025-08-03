"use client";

import { Button, Row, Col, Typography, Space } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";
import { WhatsAppOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Text } = Typography;

export const GetDiscountSection = () => {
  return (
    <div className="get-discount-section">
        <Row align="middle" justify="space-between">
          <Col xs={24} md={16}>
            <div className="text-content">
              <Title level={3} className="title">
                Get Special Discount on the Properties
              </Title>
              <Text className="description">
                scelerisque eleifend donec pretium. Felis eget nunc lobortis
                mattis aliquam faucibus purus. scelerisque eleifend donec pretium. Felis eget nunc lobortis matt.
              </Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="button-wrapper">
              <Space size="middle" className="button-group">
                <Button type="default" className="contact-btn">
                  Contact Us
                </Button>
                <Button type="primary" className="whatsapp-btn" icon={<WhatsAppOutlined />}>
                  Whatsapp
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
    </div>
  );
};
