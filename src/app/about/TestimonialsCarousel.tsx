"use client";

import { Typography } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "../../components/Lib/ProContainer/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import Link from "next/link";

const { Title, Text } = Typography;

const testimonials = [
  {
    name: "Person name",
    title: "CEO and founder",
    image: "/Ellipse.png",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
  },
  {
    name: "Person name",
    title: "CEO and founder",
    image: "/Ellipse1.png",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
  },
  {
    name: "Person name",
    title: "CEO and founder",
    image: "/Ellipse2.png",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
  },
  {
    name: "Person name",
    title: "CEO and founder",
    image: "/Ellipse1.png",
    description:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
  }
];

export const TestimonialsCarousel = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="testimonials-section">
      <Container>
        <div className="header-row">
          <div className="title-container">
            <Title level={3} className="title">Testimonials</Title>
            {/* <Link href="/testimonials" className="see-all" aria-label="See all testimonials">
              See all
              <Image
                src="/nexticon.png"  
                alt=""
                width={16}
                height={16}
                className="see-all-icon"
                draggable={false}
              />
            </Link> */}
          </div>
          <div className="actions">
            <div className="arrows">
              <Image
                src="/previcon.png"
                alt="Previous"
                width={24}
                height={24}
                onClick={() => sliderRef.current?.slickPrev()}
                className="arrow-icon"
              />
              <Image
                src="/nexticon.png"
                alt="Next"
                width={24}
                height={24}
                onClick={() => sliderRef.current?.slickNext()}
                className="arrow-icon"
              />
            </div>
          </div>
        </div>


        <div className="slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="avatar"
                />
                <div>
                  <Text className="name">{item.name}</Text>
                </div>
                <div>
                  <Text className="title-text">{item.title}</Text>
                </div>
                <div>
                  <Text className="desc">{item.description}</Text>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

