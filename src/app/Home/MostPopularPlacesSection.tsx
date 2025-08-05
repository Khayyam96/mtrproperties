"use client";
import { Typography, Row, Col } from "antd";
import { PlaceCard } from "@/components/Lib/PopularPlaces/PlaceCard";
import { Container } from "@/components/Lib/ProContainer/Container";


const { Title, Paragraph } = Typography;

const places = [
    { image: "/inner3.png", title: "Place Name in Dubai" },
    { image: "/inner3.png", title: "Place Name in Dubai" },
    { image: "/inner3.png", title: "Place Name in Dubai" },
    { image: "/inner3.png", title: "Place Name in Dubai" },
    { image: "/inner3.png", title: "Place Name in Dubai" },
    { image: "/inner3.png", title: "Place Name in Dubai" },
];

export const MostPopularPlacesSection = () => (
    <section className="popular-places-section">
        <Container>
            <Title level={2} className="popular-title">Most Popular Places in Dubai</Title>
            <Paragraph className="popular-desc">
                scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus purus. Posuere urna nec tincidunt praesent
            </Paragraph>
            <Row gutter={[20, 20]} justify="center" align="stretch">
                {places.map((place, idx) => (
                    <Col
                        key={idx}
                        xs={24}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={8}
                        style={{ display: "flex" }}
                    >
                        <PlaceCard {...place} />
                    </Col>
                ))}
            </Row>
        </Container>
    </section>
);
