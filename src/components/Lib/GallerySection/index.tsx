"use client";

import { useState, useMemo, useRef } from "react";
import { Typography, Modal, Row, Col } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import { Container } from "../ProContainer/Container";

const { Title } = Typography;

export default function GallerySection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const data = useMemo(
    () => [
      { id: 1, src: "/gal1.png", alt: "Gallery 1" },
      { id: 2, src: "/gal2.png", alt: "Gallery 2" },
      { id: 3, src: "/gal3.png", alt: "Gallery 3" },
      { id: 4, src: "/gal4.png", alt: "Gallery 4" },
      { id: 5, src: "/gal1.png", alt: "Gallery 5" },
      { id: 6, src: "/gal2.png", alt: "Gallery 6" },
      { id: 7, src: "/gal3.png", alt: "Gallery 7" },
      { id: 8, src: "/gal4.png", alt: "Gallery 8" },
    ],
    []
  );

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const chunkedData: typeof data[] = [];
  for (let i = 0; i < data.length; i += 4) {
    chunkedData.push(data.slice(i, i + 4));
  }

  const openLightbox = (index: number) => {
    setCurrent(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="gallery-section">
      <Container>
        <Title level={2} style={{ textAlign: "center" }}>
          Gallery
        </Title>

        <Slider ref={sliderRef} {...settings}>
          {chunkedData.map((group, slideIndex) => (
            <div key={slideIndex}>
              <Row gutter={[20, 20]}>
                {group.map((it, idx) => (
                  <Col xs={24} sm={12} md={12} lg={6} key={it.id}>
                    <button
                      className="g-card"
                      onClick={() => openLightbox(slideIndex * 4 + idx)}
                      aria-label={`Open ${it.alt}`}
                    >
                      <Image
                        src={it.src}
                        alt={it.alt}
                        width={600}
                        height={400}
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        priority={slideIndex === 0}
                      />
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Slider>
      </Container>

      <div className="gallery-nav">
        <button onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous">
          <LeftOutlined />
        </button>
        <button onClick={() => sliderRef.current?.slickNext()} aria-label="Next">
          <RightOutlined />
        </button>
      </div>

      <Modal
        open={isLightboxOpen}
        onCancel={() => setIsLightboxOpen(false)}
        footer={null}
        width="100%"
        centered
        className="lightbox-modal"
      >
        <div className="lightbox-body">
          <div className="lb-image-wrap">
            <Image
              src={data[current].src}
              alt={data[current].alt}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
