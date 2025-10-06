// app/Home/ProductList/index.tsx
"use client";

import { Row, Col, Button, Typography } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { ProCard } from "@/components/Lib/ProCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { FC, useMemo } from "react";
import type { LandProjectResponse } from "@/models/LatesProject.model";

const { Title, Text } = Typography;

type TProps = {
  data: LandProjectResponse;
  title?: string;
  subtitle?: string;
};

export const ProductSection: FC<TProps> = ({ data, title, subtitle }) => {
  const router = useRouter();
  const pathname = usePathname();

  // /blog/[slug] -> iki iki göstər
  const isBlogInner = useMemo(
    () => !!pathname && /^\/blog\/[^/]+$/.test(pathname),
    [pathname]
  );

  const colProps = isBlogInner
    ? { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } // 2 sütun
    : { xs: 12, sm: 12, md: 12, lg: 8, xl: 6 };  // default: 3-4 sütun

  return (
    <section className="product__list">
      <Container>
        <div className="header text-center">
          <Title className="title" level={2}>
            {title ?? "Latest Projects in the UAE"}
          </Title>
          {subtitle ? <Text className="text">{subtitle}</Text> : null}
        </div>

        <Row gutter={[24, 32]}>
          {data?.data?.map((item) => (
            <Col key={item.id} {...colProps}>
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
