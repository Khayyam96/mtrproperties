"use client";

import { useState, useEffect, useRef } from "react";
import { Typography, Button } from "antd";
import { AppstoreOutlined, EnvironmentOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import Image from "next/image";
import "./index.scss";

const { Title, Text } = Typography;

type Project = {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 2,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 3,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "Starting at AED 970K*",
    image: "/img4.png",
  },
];

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hrs = Math.floor((timeLeft % (60 * 60 * 24)) / 3600);
  const min = Math.floor((timeLeft % 3600) / 60);
  const sec = timeLeft % 60;

  return (
    <div className="countdown">
      <div><strong>{days}</strong> Days</div>
      <div><strong>{hrs}</strong> Hrs</div>
      <div><strong>{min}</strong> Min</div>
      <div><strong>{sec}</strong> Sec</div>
    </div>
  );
};

export const ProjectDubai: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // custom arrows
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
    <section className="project-dubai-section">
      <div className="text-center header">
        <Title level={2}>New Projects In Dubai</Title>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </div>

      <div className="slider-container">
        <Button className="slider-arrow left" shape="circle" icon={<LeftOutlined />} onClick={() => sliderRef.current?.slickPrev()} />
        
        <Slider {...settings} ref={sliderRef} className="project-slider">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="image-wrapper">
                <Image src={project.image} alt={project.name} width={400} height={250} />
                <Countdown />
              </div>
              <div className="info">
                <div className="title">{project.name}</div>
                <div className="location">
                  <EnvironmentOutlined /> {project.location}
                </div>
                <div className="price">{project.price}</div>
                <div className="mag-logo">
                  <Image src="/imglogo.png" alt="MAG" width={40} height={40} />
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <Button className="slider-arrow right" shape="circle" icon={<RightOutlined />} onClick={() => sliderRef.current?.slickNext()} />
      </div>

      <div className="view-more-wrapper">
        <Button type="primary" size="large" icon={<AppstoreOutlined />}>
          View More
        </Button>
      </div>
    </section>
  );
};

export default ProjectDubai;
