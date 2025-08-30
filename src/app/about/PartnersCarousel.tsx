"use client";

import { Typography } from "antd";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import type SliderType from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title, Text } = Typography;

const partners = [
  "/emaar.png",
  "/pagani.png",
  "/damac.png",
  "/Meraas1.png",
  "/damac.png",
  "/Omniyat.png",
];

export const PartnersCarousel = () => {
  const sliderRef = useRef<SliderType | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="partnersSection">
      <Title level={3} className="title">Our Partners</Title>
      <Text className="subtitle">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has
        roots in a piece of classical Latin literature from 45 BC, making it over
        2000 years old.
      </Text>
      <Slider ref={sliderRef} {...settings} className="carousel">
        {partners.map((src, idx) => (
          <div key={idx} className="partnerCard">
            <Image src={src} alt={`Partner ${idx + 1}`} width={200} height={80} />
          </div>
        ))}
      </Slider>
      <div className="customArrows">
        <div className="arrowBtn" onClick={() => sliderRef.current?.slickPrev()}>
          <Image src="/previcon.png" alt="Previous" width={50} height={50} />
        </div>
        <div className="arrowBtn" onClick={() => sliderRef.current?.slickNext()}>
          <Image src="/nexticon.png" alt="Next" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
