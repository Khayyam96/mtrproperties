"use client";

import { Col, Row, Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import { MapSection } from "@/components/Lib/Map/MapSection";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Text } = Typography;

export default function ContactPage() {
    return (
        <div className="contact-page">
            <Container>
                <MapSection />
            </Container>

            <div className="contact-section">
                <Container>
                    <Row justify="center">
                        <Col xs={24} md={18}>
                            <Title level={2} className="text-center">Contact Us</Title>
                            <Text className="text-center d-block mb-4">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </Text>

                            <Row gutter={[32, 32]}>
                                <Col xs={24} md={12}>
                                    <h4>Email to Us</h4>
                                    <div className="form-block">
                                        <Form layout="vertical">
                                            <Form.Item label="Name" name="name">
                                                <Input placeholder="eg: John Doe" />
                                            </Form.Item>
                                            <Form.Item label="Email" name="email">
                                                <Input placeholder="eg: john@email.com" />
                                            </Form.Item>
                                            <Form.Item label="Phone Number" name="phone">
                                                <PhoneInput
                                                    country={"ae"}
                                                    onlyCountries={["ae"]}
                                                    masks={{ ae: "........" }}
                                                    placeholder="eg: 050123456"
                                                    inputProps={{
                                                        name: "phone",
                                                        required: true,
                                                    }}
                                                    inputStyle={{
                                                        width: "100%",
                                                        height: "40px",
                                                        borderRadius: "6px",
                                                        fontWeight: 600,
                                                        fontSize: "14px",
                                                        paddingLeft: "48px",
                                                        boxShadow: "0 4px 12px rgba(52, 53, 53, 0.16)",
                                                        border: "1px solid #d9d9d9",
                                                    }}
                                                    buttonStyle={{
                                                        border: "1px solid #d9d9d9",
                                                        borderTopLeftRadius: "6px",
                                                        borderBottomLeftRadius: "6px",
                                                    }}
                                                    containerStyle={{
                                                        width: "100%",
                                                    }}
                                                />
                                            </Form.Item>

                                            <Form.Item label="Message" name="message">
                                                <Input.TextArea rows={4} placeholder="eg: I want to know about..." />
                                            </Form.Item>
                                            <Button icon={<ArrowRightOutlined />} iconPosition="end">
                                                Submit
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Card className="info-card" bordered={false}>
                                        <p><EnvironmentOutlined /> 1404 office, 14 floor,<br />51 @ Business Bay Tower, Dubai, UAE</p>
                                        <p><PhoneOutlined /> +971 4 331 7007</p>
                                        <p><MailOutlined /> contact@mtr.ae</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <div className="subscribe-section">
                    <Title level={3} className="text-center">Subscribe to our Newsletter</Title>
                    <Text className="text-center d-block mb-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Text>
                    <Form layout="vertical">
                        <Row justify="center" gutter={16}>
                            <Col xs={24} md={6}>
                                <Form.Item label="Name" name="name">
                                    <Input placeholder="eg: John Doe" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={6}>
                                <Form.Item label="Email" name="email">
                                    <Input placeholder="eg: john@email.com" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={3}>
                                <Form.Item label="."  name="email">
                                    <Button>Subscribe</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
