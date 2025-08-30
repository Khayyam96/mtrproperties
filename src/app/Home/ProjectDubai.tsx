"use client";

import { useRef } from "react";
import { Typography, Button } from "antd";
import Slider from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import Image from "next/image";
import { ProjectCard } from "@/components/Lib/ProjectCard/ProjectCard";
import { useRouter } from "next/navigation";
import { AppstoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const projects = [
  {
    id: 1,
    slug: "lotus-at-creek-beach",
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 2,
    slug: "lotus-at-creek-beach-2",
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
  {
    id: 3,
    slug: "lotus-at-creek-beach-3",
    name: "Lotus at Creek Beach",
    location: "Place of this property",
    price: "3 BR Apartment Starting at AED 970K*",
    image: "/img4.png",
  },
];

export const ProjectDubai: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="project-dubai-section">
      <Container>
        <div className="header text-center">
          <Title level={2}>New Off Plan Projects In Dubai</Title>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </div>

        <div className="slider-container">
          <Button
            className="slider-arrow left"
            shape="circle"
            icon={<Image src="/previcon.png" alt="prev" width={16} height={16} />}
            onClick={() => sliderRef.current?.slickPrev()}
          />

          <Slider {...settings} ref={sliderRef} className="project-slider">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </Slider>

          <Button
            className="slider-arrow right"
            shape="circle"
            icon={<Image src="/nexticon.png" alt="next" width={16} height={16} />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>

        <div className="view-more-wrapper text-center" style={{ marginTop: 30 }}>
          <Button type="primary" icon={<AppstoreOutlined />} size="large" onClick={() => router.push("/planpage")}>
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ProjectDubai;
