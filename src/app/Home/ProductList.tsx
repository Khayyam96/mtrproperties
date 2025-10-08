"use client";

import { Row, Col, Typography } from "antd";
// import { useRouter, usePathname } from "next/navigation";
import { ProCard } from "@/components/Lib/ProCard";
import { Container } from "@/components/Lib/ProContainer/Container";
import { FC, useMemo } from "react";
import { LandProjectResponse } from "@/models/LatesProject.model";
import { usePathname } from "next/navigation";

const { Title } = Typography;

type TProps = {
  data: LandProjectResponse;
  title?: string;
  subtitle?: string;
};

export const ProductSection: FC<TProps> = ({ data, title }) => {
  // const router = useRouter();
  const pathname = usePathname();

  const isBlogInner = useMemo(() => pathname?.startsWith("/blog/"), [pathname]);

  const headerTitle = isBlogInner ? "Featured Properties" : (title ?? "Latest Projects in the UAE");
  

  const items = useMemo(() => {
    const list = data?.data ?? [];
    return isBlogInner ? list.slice(0, 4) : list;
  }, [data, isBlogInner]);

  return (
    <section className={`product__list ${isBlogInner ? "product__list--blog" : ""}`}>
      <Container>
        <div className="header text-center">
          <Title className="title" level={2}>
            {headerTitle}
          </Title>
        </div>

        <Row gutter={[24, 32]}>
          {items.map((item) => (
            <Col
              key={item.id}
              {...(isBlogInner
                ? { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
                : { xs: 12, sm: 12, md: 12, lg: 8, xl: 6 })}
            >
              <ProCard {...item} />
            </Col>
          ))}
        </Row>

        {/* {!pathname.includes("blog") && (
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
        )} */}
      </Container>
    </section>
  );
};

export default ProductSection;
