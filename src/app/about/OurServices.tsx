"use client";

import React, { useMemo } from "react";
import { Col, Row, Typography, Card } from "antd";
import Image from "next/image";
import { Container } from "../../components/Lib/ProContainer/Container";
import type { OurServicesResponse, IconKey } from "../../models/OurServices.model";

const { Title, Text } = Typography;

const PUBLIC_ICONS: Record<IconKey, string> = {
  users: "/team1.png",   
  check: "/team2.png",
  award: "/team3.png",
  list:  "/team4.png",
};

const ICON_SIZE = { width: 40, height: 40 };

function IconRenderer({ name, alt }: { name: IconKey; alt: string }) {
  const src = PUBLIC_ICONS[name] ?? PUBLIC_ICONS["list"]; 
  return (
    <Image
      src={src}
      alt={alt}
      width={ICON_SIZE.width}
      height={ICON_SIZE.height}
    />
  );
}

type TProps = { data: OurServicesResponse };

export const OurServices: React.FC<TProps> = ({ data }) => {
  const items = useMemo(() => data?.data ?? [], [data]);

  return (
    <div className="our-services">
      <Container>
        <Title level={2}>Our Services</Title>
        <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Text>

        <Row gutter={[24, 24]} className="cards-row">
          {items.map((service) => (
            <Col xs={24} md={12} lg={6} key={service.id}>
              <Card className="service-card" bordered={false}>
                <div className="icon">
                  <IconRenderer name={service.icon as IconKey} alt={service.title} />
                </div>
                <Title level={4}>{service.title}</Title>
                <Text>{service.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
