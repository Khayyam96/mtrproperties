"use client";

import { Card, Col, Row, Typography } from "antd";
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import ContactForm from "../../components/Lib/Contact/ContactForm";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

export default function ContactSection() {
    return (
        <section className={styles.wrap}>
            <Container>
                <div className={styles.header}>
                    <Title level={2} className={styles.title}>
                        Contact Us
                    </Title>
                    <Text className={styles.subtitle}>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                        roots in a piece of classical Latin literature from 45 BC, making it over
                        2000 years old.
                    </Text>
                </div>

                <Row gutter={[24, 24]} justify="center">
                    <Col xs={24} lg={18}>
                        <Text className="form-title" style={{color: "#000000", fontSize: "20px", lineHeight: "26px",  fontWeight :"800"}}>Email to Us</Text>
                    </Col>
                </Row>


                <Row gutter={[24, 24]} justify="center">
                    <Col xs={24} lg={9}>
                        <Card className={styles.card}>
                            <ContactForm />
                        </Card>
                    </Col>

                    <Col xs={24} lg={9}>
                        <Card className={styles.carinfo}>
                            <div className={styles.infoItem}>
                                <EnvironmentOutlined className={styles.icon} />
                                <div>
                                    <Text strong className="contact-address">1404 office, 14 floor,</Text>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <PhoneOutlined className={styles.icon} />
                                <Text className="contact-address">+971 4 331 7007</Text>
                            </div>

                            <div className={styles.infoItem}>
                                <MailOutlined className={styles.icon} />
                                <Text className="contact-address">contact@mtr.ae</Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
