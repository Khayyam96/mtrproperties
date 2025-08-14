"use client";

import { useMemo, useState } from "react";
import { Row, Col } from "antd";
import { ProjectCard } from "@/components/Lib/ProjectCard/ProjectCard";
import CustomPagination from "@/components/Lib/ProPagination/CustomPagination";

type TItem = {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
};

const PAGE_SIZE = 9;

const IMAGES = ["inner2.png", "inner2.png", "inner2.png"];

const MOCK_DATA: TItem[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  name: "Lotus at Creek Beach",
  location: "Place of this property",
  price: "Starting at AED 970K*",
  image: IMAGES[i % IMAGES.length],
}));

export default function PlanCardSection() {
  const [current, setCurrent] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(MOCK_DATA.length / PAGE_SIZE),
    []
  );

  const paginated = useMemo(() => {
    const start = (current - 1) * PAGE_SIZE;
    return MOCK_DATA.slice(start, start + PAGE_SIZE);
  }, [current]);

  return (
    <section className="plan-card-section">
      <Row gutter={[20, 20]}>
        {paginated.map((item) => (
          <Col key={item.id} xs={24} md={12} lg={8}>
            <ProjectCard
              name={item.name}
              location={item.location}
              price={item.price}
              image={item.image}
            />
          </Col>
        ))}
      </Row>

      <div className="plan-card-pagination">
        <CustomPagination
          current={current}
          total={totalPages}
          onChange={setCurrent}
        />
      </div>
    </section>
  );
}
