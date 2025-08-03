"use client";

import { useRef } from "react";
import { Typography, Button } from "antd";
import { AppstoreOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import { ProjectCard } from "@/components/Lib/ProjectCard/ProjectCard";
import "./index.scss";

const { Title, Text } = Typography;

const projects = [
  {
    id: 1,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 2,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 3,
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
];

export const ProjectDubai: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
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
    <section className="project-dubai-section">
      <Container>
        <div className="header text-center">
          <Title level={2}>New Off Plan Projects In Dubai</Title>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </div>

        <div className="slider-container">
          <Button className="slider-arrow left" shape="circle" icon={<LeftOutlined />} onClick={() => sliderRef.current?.slickPrev()} />

          <Slider {...settings} ref={sliderRef} className="project-slider">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </Slider>

          <Button className="slider-arrow right" shape="circle" icon={<RightOutlined />} onClick={() => sliderRef.current?.slickNext()} />
        </div>

        <div className="view-more-wrapper text-center" style={{ marginTop: 40 }}>
          <Button type="primary" size="large" icon={<AppstoreOutlined />}>
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProjectDubai;
