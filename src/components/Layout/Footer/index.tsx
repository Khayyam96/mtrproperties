"use client";

import { Row, Col, Typography, Space, Collapse, Grid } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  PhoneOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import "./index.scss";
import Link from "next/link";
import { Container } from "@/components/Lib/ProContainer/Container";
const { useBreakpoint } = Grid;
const { Panel } = Collapse;

const { Title, Text } = Typography;

export const MainFooter = () => {
  const screens = useBreakpoint();
  const footerSections = [
    {
      key: "explore",
      title: "Explore Properties",
      items: ["Buy", "Rent", "Off Plan", "Developers", "Areas", "Communities"],
    },
    {
      key: "services",
      title: "Our Services",
      items: ["Sell", "Holiday Homes", "Property Management", "Mortgage Services"],
    },
    {
      key: "guides",
      title: "Guides",
      items: ["For Buyer", "For Investors", "For Landlord", "For Seller", "For Tenant"],
    },
    {
      key: "company",
      title: "Company",
      items: [
        <Link href="/about" key="about">About Us</Link>,
        <Link href="/contact" key="contact">Contact Us</Link>,
        "Blogs/News",
      ],
    },
  ];
  return (
    <div className="main-footer">
      <Container>
        <Row gutter={[32, 32]} className="footer-top">
          <Col xs={24} md={9}>
            <div className="footer-logo-box">

              <Image
                src="/whitelogo.png"
                alt="MTR Logo"
                className="footer-logo"
                width={160}
                height={48}
                priority
              />
            </div>

            <div className="footer-content">

              <div className="footer-address">
                <Title level={5}>Address</Title>
                <Text>Fifty One Tower - 1404 office - Business Bay - Dubai</Text>
              </div>

              <div className="footer-contact">
                <Title level={5}>Contact Us</Title>
                <div className="contact-item-all">
                  <div className="contact-item">
                    <PhoneOutlined />
                    <Text>04 331 7007</Text>
                  </div>
                  <div className="contact-item">
                    <MailOutlined />
                    <Text>contact@mtr.ae</Text>
                  </div>
                  <div className="contact-item">
                    <WhatsAppOutlined />
                    <Text>+971 56 933 2607</Text>
                  </div>
                </div>
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


          {screens.xs ? (
            <Col xs={24}>
              <Collapse
                accordion
                ghost
                expandIconPosition="end"
                className="footer-collapse"
              >
                {footerSections.map((section) => (
                  <Panel
                    header={<strong>{section.title}</strong>}
                    key={section.key}
                    className="footer-panel"
                  >
                    <ul>
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </Panel>
                ))}
              </Collapse>
            </Col>
          ) : (
            <>
              {footerSections.map((section) => (
                <Col xs={12} md={3} key={section.key}>
                  <Title level={5}>{section.title}</Title>
                  <ul>
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Col>
              ))}
            </>
          )}

        </Row>

        <Row justify="space-between" className="footer-bottom">
          <Col>
            <Text>© 2022 Copyright by MTR Properties</Text>
          </Col>
          <Col>
            <Link href="/privacy" className="footer-links">
              Privacy Policies
            </Link>
            <span className="divider">|</span>
            <Text className="footer-links">Terms & Conditions</Text>
            <span className="divider">|</span>
            <Text className="footer-links">Site Map</Text>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainFooter;
