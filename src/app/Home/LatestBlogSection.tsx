"use client";

import { FC, useRef } from "react";
import { Typography } from "antd";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

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

export const LatestBlogSection: FC = () => {
  const sliderRef = useRef<Slider | null>(null); // ✅ any əvəzinə Slider tipi

  const settings: Settings = {
    dots: false,
    infinite: blogData.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="latest-blog-section">
      <Container>
        <div className="blog-header">
          <div className="left">
            <Title level={3}>Latest Blog</Title>
            <a className="see-all" href="#">
              See all <RightOutlined />
            </a>
          </div>
          <div className="slider-nav">
            <span
              className="nav left"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <LeftOutlined />
            </span>
            <span
              className="nav right"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <RightOutlined />
            </span>
          </div>
        </div>

        <div className="slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {blogData.map((item) => (
              <div key={item.id} className="blog-card">
                <div className="image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={220}
                    style={{ width: "100%", height: "310px" }}
                  />
                </div>
                <div className="content">
                  <Title level={5}>{item.title}</Title>
                  <div className="meta">
                    <Text>{item.date}</Text>
                    <span style={{ margin: "0 8px" }}> </span>
                    <Text>{item.author}</Text>
                  </div>
                  <a href="#" className="read-more">
                    Read more <RightOutlined />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default LatestBlogSection;
