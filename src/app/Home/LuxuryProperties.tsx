"use client";

import { FC, useState, useEffect } from "react";
import { Row, Col, Typography, Button, Segmented, Spin } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Container } from "@/components/Lib/ProContainer/Container";
import { LuxuryTabResponse } from "@/models/LuxuryTab.model";
import { fetchAPI } from "@/utils";

const { Title, Text } = Typography;

type TProperty = {
    id: number;
    slug: string;
    address: string;
    price: string;
    currency: string;
    bedroom_count: number;
    bathroom_count: number;
    sq_ft: string;
    media: {
        id: number;
        gallery: string[];
    };
    property_type: {
        id: number;
        name: string;
    };
    translation: {
        id: number;
        title: string;
        subtitle: string;
    };
};

type TProps = {
    tab: LuxuryTabResponse;
};

export const LuxuryProperties: FC<TProps> = ({ tab }) => {
    const categories = tab.data.map(item => ({ id: item.id, name: item.name }));
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || { id: 0, name: "" });
    const [properties, setProperties] = useState<TProperty[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProperties = async (property_type_id: number) => {
        setLoading(true);
        try {
            const res = await fetchAPI<{ data: TProperty[] }>(`/client/latest-projects?property_type_id=${property_type_id}`);
            setProperties(res.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCategory.id) {
            fetchProperties(selectedCategory.id);
        }
    }, [selectedCategory]);

    console.log(properties, "propertiespropertiesproperties")

    return (
        <section className="luxury-properties">
            <Container>
                <div className="luxury-properties__header">
                    <div>
                        <Title level={2}>Luxury properties in Dubai</Title>
                        <Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                    </div>
                    <Segmented
                        options={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
                        value={selectedCategory.id}
                        onChange={(val) => {
                            const cat = categories.find(c => c.id === val);
                            if (cat) setSelectedCategory(cat);
                        }}
                        className="luxury-properties__segmented"
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: 50 }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Row gutter={[24, 24]} justify="center">
                        {properties.map((property) => (
                            <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
                                <div className="property-card">
                                    <div className="property-card__image-wrapper">
                                        <Image
                                            src={
                                                property.media.gallery[0]
                                                    ? `https://api.dubaiyachts.com/uploads/properties/${property.media.gallery[0]}`
                                                    : "/luxury.png"
                                            }
                                            alt={property.translation.title}
                                            fill
                                            className="property-card__image"
                                        />

                                        <div className="property-card__overlay">
                                            <div className="types">
                                                <div className="type">{property.property_type.name}</div>
                                            </div>
                                            <h4>{property.translation.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}

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
            </Container>
        </section>
    );
};

export default LuxuryProperties;
