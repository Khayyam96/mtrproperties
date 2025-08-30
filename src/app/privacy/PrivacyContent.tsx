"use client";

import { FC } from "react";
import { Row, Col, Typography } from "antd";
import styles from "./index.module.scss";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Text } = Typography;

type Props = {
    className?: string;
};

const PrivacyContent: FC<Props> = ({ className }) => {
    return (
        <section className={`${styles.wrap} ${className || ""}`}>
            <Container>
                <Row justify="center">
                    <Col xs={24} span={9} >
                        <div className={styles.innerconnect}>
                            <Title level={3} className={styles.subHeading}>
                                Sub heading for privacy
                            </Title>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu.
                            </Text>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum <em>ruhasellus</em> at condimentum purus. Praesent et dictum ante. Proin
                                sed ipsum non nisi pretium tempus quis et augue. Morbi ullamcorper, dolor eu.
                            </Text>

                            <Title level={3} className={styles.subHeading}>
                                Sub heading for privacy
                            </Title>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu.
                            </Text>

                            <ul className={styles.list}>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Aliquam tincidunt mauris eu risus.</li>
                                <li>Vestibulum auctor dapibus neque.</li>
                                <li>Nunc dignissim risus id metus.</li>
                                <li>Cras ornare tristique elit.</li>
                                <li>Vivamus vestibulum nulla nec ante.</li>
                                <li>Praesent placerat risus quis eros.</li>
                                <li>Fusce pellentesque suscipit nibh.</li>
                                <li>Integer vitae libero ac risus egestas placerat.</li>
                            </ul>

                            <Title level={3} className={styles.subHeading}>
                                Sub heading for privacy
                            </Title>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu.
                            </Text>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu. Curabitur commodo vulputate ex id posuere. Phasellus at
                                condimentum purus. Praesent et dictum ante, Proin sed ipsum non nisi pretium tempus
                                quis et augue.
                            </Text>

                            <Title level={3} className={styles.subHeading}>
                                Sub heading for privacy
                            </Title>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu.
                            </Text>
                            <Text className="privacy-text">
                                Curabitur commodo vulputate ex id posuere. Phasellus at condimentum purus. Praesent
                                et dictum ante. Proin sed ipsum non nisl pretium tempus quis et augue. Morbi
                                ullamcorper, dolor eu accumsan aliquet, nibh nisl molestie odio, at lobortis sapien
                                nisl interdum arcu.
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default PrivacyContent;
