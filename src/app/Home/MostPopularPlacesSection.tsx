"use client";

import { FC, useMemo } from "react";
import { Typography, Row, Col } from "antd";
import { PlaceCard } from "@/components/Lib/PopularPlaces/PlaceCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { MostPopularResponse } from "@/models/MostPopular.model";

const { Title, Paragraph } = Typography;

type TProps = {
    data: MostPopularResponse;
};

export const MostPopularPlacesSection: FC<TProps> = ({ data }) => {
  console.log(data, "most popularaedasdadasdad")

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
          {data.data.map((item, idx) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={8} style={{ display: "flex" }} >
              <PlaceCard {...item}/>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
