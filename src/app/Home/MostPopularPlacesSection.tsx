"use client";

import { FC } from "react";
import { Typography, Row, Col } from "antd";
import { PlaceCard } from "@/components/Lib/PopularPlaces/PlaceCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { MostPopularResponse } from "@/models/MostPopular.model";

const { Title, Paragraph } = Typography;

type TProps = {
  data: MostPopularResponse;
  title?: string;
  subtitle?: string;
};

export const MostPopularPlacesSection: FC<TProps> = ({ data, title, subtitle }) => {
  console.log(data, "most popularaedasdadasdad")

  return (
    <section className="popular-places-section">
      <Container>
        <Title level={2} className="popular-title">
          {title ?? ""}
        </Title>
        {subtitle ?
        <Paragraph className="popular-desc">
          {subtitle}
        </Paragraph>
        : null}

        <Row gutter={[20, 20]} justify="center" align="stretch">
          {data.data.map((item) => (
            <Col key={item.id} xs={12} sm={12} md={12} lg={8} xl={8} style={{ display: "flex" }} >
              <PlaceCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
