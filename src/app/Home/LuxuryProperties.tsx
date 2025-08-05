"use client";

import { useState } from "react";
import { Row, Col, Typography, Button, Segmented } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Image from "next/image";


const { Title, Text } = Typography;

const properties = [
    {
        id: 1,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 2,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 3,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 4,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 5,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 6,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 7,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
    {
        id: 8,
        image: "/luxury.png",
        name: "Property Name",
        type: "Penthouse",
    },
];

const categories = ["Penthouse", "Apartment", "Townhouse", "Villa"];

export const LuxuryProperties: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Penthouse");

    const filtered = properties.filter(
        (p) => p.type.toLowerCase() === selectedCategory.toLowerCase()
    );

    return (
        <section className="luxury-properties">
            <div className="luxury-properties__header">
                <div>
                    <Title level={2}>Luxury properties in Dubai</Title>
                    <Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Text>
                </div>
                <Segmented
                    options={categories.map((cat) => ({
                        label: cat + "s",
                        value: cat,
                    }))}
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val as string)}
                    className="luxury-properties__segmented"
                />
            </div>

            <Row gutter={[24, 24]} justify="center">
                {filtered.map((property) => (
                    <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
                        <div className="property-card">
                            <div className="property-card__image-wrapper">
                                <Image
                                    src={property.image}
                                    alt={property.name}
                                    fill
                                    className="property-card__image"
                                />
                                <div className="property-card__overlay">
                                    <div className="types">
                                        <div className="type">{property.type}</div>
                                    </div>
                                    <h4>{property.name}</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>


            <div className="view-more-wrapper">
                <Button
                    type="primary"
                    size="large"
                    icon={<AppstoreOutlined />}
                    onClick={() => alert("Load more…")}
                >
                    View More
                </Button>
            </div>
        </section>
    );
};

export default LuxuryProperties;
