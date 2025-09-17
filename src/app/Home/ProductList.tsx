"use client";

import { Row, Col, Button, Typography } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ProCard } from "@/components/Lib/ProCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { LandProjectResponse } from "@/models/LatesProject.model";
import { FC } from "react";

const { Title, Text } = Typography;

type TProps = {
  data: LandProjectResponse; 
};

export const ProductSection: FC<TProps> = ({ data }) =>  {
  console.log(data, "latesproject")
  const router = useRouter();

  return (
    <section className="product__list">
      <Container>
        <div className="header text-center">
          <Title className="title" level={2}>
            Latest Projects in the UAE
          </Title>
          <Text className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </div>

        <Row gutter={[24, 32]}>
          {data.data.map((p) => (
            <Col key={p.slug} xs={24} sm={12} md={12} lg={8} xl={6}>
              <ProCard {...p} />
            </Col>
          ))}
        </Row>

        <div className="view-more-wrapper">
          <Button
            type="primary"
            size="large"
            icon={<AppstoreOutlined />}
            onClick={() => router.push("/properties")}
          >
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;
