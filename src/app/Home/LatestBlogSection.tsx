"use client";

import { Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import "./index.scss";

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

export const LatestBlogSection = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="latest-blog-section">
      <div className="blog-header">
        <Title level={3}>Latest Blog</Title>
        <a className="see-all" href="#">
          See all <RightOutlined />
        </a>
      </div>

      <div className="slider-wrapper">
        <button className="nav left" onClick={() => sliderRef.current?.slickPrev()}>
          <LeftOutlined />
        </button>

        <Slider ref={sliderRef} {...settings} className="blog-slider">
          {blogData.map((item) => (
            <div className="blog-card" key={item.id}>
              <div className="image">
                <Image src={item.image} alt={item.title} width={400} height={220} />
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
          ))}
        </Slider>

        <button className="nav right" onClick={() => sliderRef.current?.slickNext()}>
          <RightOutlined />
        </button>
      </div>
    </section>
  );
};

export default LatestBlogSection;
