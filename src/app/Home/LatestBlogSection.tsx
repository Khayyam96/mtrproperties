"use client";

import { FC } from "react";
import { Row, Col, Typography } from "antd";
import Image from "next/image";
import { Container } from "@/components/Lib/ProContainer/Container";
import { RightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const blogData = [
  {
    id: 1,
    image: "/blog1.png",
    title: "Lorem Ipsum is simply dummy text of the printing",
    date: "23 Dec 2022",
    author: "Author name",
  },
  {
    id: 2,
    image: "/blog2.png",
    title: "Lorem Ipsum is simply dummy text of the printing",
    date: "23 Dec 2022",
    author: "Author name",
  },
  {
    id: 3,
    image: "/blog1.png",
    title: "Lorem Ipsum is simply dummy text of the printing",
    date: "23 Dec 2022",
    author: "Author name",
  },
  {
    id: 4,
    image: "/blog2.png",
    title: "Lorem Ipsum is simply dummy text of the printing",
    date: "23 Dec 2022",
    author: "Author name",
  },
];

export const LatestBlogSection: FC = () => (
  <section className="latest-blog-section">
    <Container>
      <div className="blog-header">
        <div className="left">
          <Title level={3}>Latest Blog</Title>
          <a className="see-all" href="#">
            See all <RightOutlined />
          </a>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        {blogData.map((item) => (
          <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
            <div className="blog-card">
              <div className="image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={220}
                  style={{ width: "100%", height: "310px"}}
                />
              </div>
              <div className="content">
                <Title level={5}>{item.title}</Title>
                <div className="meta">
                  <Text>{item.date}</Text>
                  <span>•</span>
                  <Text>{item.author}</Text>
                </div>
                <a href="#" className="read-more">
                  Read more <RightOutlined />
                </a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default LatestBlogSection;
