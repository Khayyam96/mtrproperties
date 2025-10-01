// app/Home/ProductList/index.tsx (və ya sənin fayl yolun)
"use client";

import { Row, Col, Button, Typography } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ProCard } from "@/components/Lib/ProCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { FC } from "react";
import { LandProjectResponse } from "@/models/LatesProject.model";

const { Title, Text } = Typography;

type TProps = {
  data: LandProjectResponse;
};

export const ProductSection: FC<TProps> = ({ data }) => {
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
          {data?.data?.map((item) => (
            <Col
              key={item.id}
              xs={12}
              sm={12}
              md={12}
              lg={8}
              xl={6}
            >
              <ProCard {...item} />
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
