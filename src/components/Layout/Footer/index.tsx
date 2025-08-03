"use client";

import { Row, Col, Typography, Space } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import "./index.scss";

const { Title, Text } = Typography;

export const MainFooter = () => {
  return (
    <div className="main-footer">
      <div className="footer-container">
        <Row gutter={[32, 32]} className="footer-top">
          <Col xs={24} md={6}>
            <Image
              src="/logo.png"
              alt="MTR Logo"
              className="footer-logo"
              width={160}
              height={48}
              priority
            />
            <div className="footer-address">
              <Title level={5}>Address</Title>
              <Text>Fifty One Tower - 1404 office - Business Bay - Dubai</Text>
            </div>

            <div className="footer-contact">
              <Title level={5}>Contact Us</Title>
              <div className="contact-item">
                <PhoneOutlined />
                <Text>04 331 7007</Text>
              </div>
              <div className="contact-item">
                <MailOutlined />
                <Text>contact@mtr.ae</Text>
              </div>
              <div className="contact-item">
                <Image
                  src="/whatsapp.png"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  style={{ display: "inline-block" }}
                />
                <Text>+971 56 933 2607</Text>
              </div>
            </div>

            <div className="footer-social">
              <Title level={5}>Follow Us On</Title>
              <Space size="middle">
                <FacebookFilled />
                <InstagramOutlined />
                <LinkedinFilled />
              </Space>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <Title level={5}>Explore Properties</Title>
            <ul>
              <li>Buy</li>
              <li>Rent</li>
              <li>Off Plan</li>
              <li>Developers</li>
              <li>Areas</li>
              <li>Communities</li>
            </ul>
          </Col>

          <Col xs={12} md={4}>
            <Title level={5}>Our Services</Title>
            <ul>
              <li>Sell</li>
              <li>Holiday Homes</li>
              <li>Property Management</li>
              <li>Mortgage Services</li>
            </ul>
          </Col>

          <Col xs={12} md={4}>
            <Title level={5}>Guides</Title>
            <ul>
              <li>For Buyer</li>
              <li>For Investors</li>
              <li>For Landlord</li>
              <li>For Seller</li>
              <li>For Tenant</li>
            </ul>
          </Col>

          <Col xs={12} md={4}>
            <Title level={5}>Company</Title>
            <ul>
              <li>
                {/* <Link href="/about">About Us</Link> */}
              </li>
              <li>
                {/* <Link href="/contact">Contact Us</Link> */}
              </li>
              <li>Blogs/News</li>
            </ul>
          </Col>
        </Row>

        <Row justify="space-between" className="footer-bottom">
          <Col>
            <Text>© 2022 Copyright by MTR Properties</Text>
          </Col>
          <Col>
            <Text className="footer-links">Privacy Policies</Text>
            <span className="divider">|</span>
            <Text className="footer-links">Terms & Conditions</Text>
            <span className="divider">|</span>
            <Text className="footer-links">Site Map</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainFooter;
