"use client";

import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Image from "next/image";
import { useRef } from "react";

const { Title } = Typography;

const mockProperties = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx,
  name: "Property Name",
  bedrooms: 2,
  bathrooms: 3,
  size: "2500 sq.ft",
  image: "/luxury.png", 
}));

export default function PopularProperties() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="popular-properties">
      <Title level={4} className="section-title">
        Popular Searches for Properties in UAE
      </Title>

      <Slider ref={sliderRef} {...settings} className="property-slider">
        {mockProperties.map((item) => (
          <div key={item.id} className="property-card">
            <div className="image-wrapper">
              <Image src={item.image} alt="property" fill className="property-image" />
              <div className="overlay">
                <h3 className="name">{item.name}</h3>
                <div className="info">
                  <span>🛏 {item.bedrooms} bedroom</span>
                  <span>🛁 {item.bathrooms} bathroom</span>
                  <span>📏 {item.size}</span>
                </div>
                <div className="view-more">
                  View more <RightOutlined />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="carousel-buttons">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => sliderRef.current?.slickPrev()}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => sliderRef.current?.slickNext()}
        />
      </div>
    </div>
  );
}
