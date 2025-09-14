"use client";

import { FC, useMemo } from "react";
import { Typography, Row, Col } from "antd";
import { PlaceCard } from "@/components/Lib/PopularPlaces/PlaceCard";
import { Container } from "@/components/Lib/ProContainer/Container";

const { Title, Paragraph } = Typography;

type MostPopularItem = {
  id: number;
  title: string;
  image: string;
};

type ApiResp = { items: MostPopularItem[] };

type Props = {
  data: MostPopularItem[] | ApiResp;
};

export const MostPopularPlacesSection: FC<Props> = ({ data }) => {
  const items = useMemo<MostPopularItem[]>(() => {
    if (Array.isArray(data)) return data;
    if (data && "items" in data) return data.items ?? [];
    return [];
  }, [data]);

  return (
    <section className="popular-places-section">
      <Container>
        <Title level={2} className="popular-title">
          Most Popular Places in Dubai
        </Title>
        <Paragraph className="popular-desc">
          scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus
          purus. Posuere urna nec tincidunt praesent
        </Paragraph>

        <Row gutter={[20, 20]} justify="center" align="stretch">
          {items.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={8} style={{ display: "flex" }}>
              <PlaceCard image={item.image} title={item.title} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
