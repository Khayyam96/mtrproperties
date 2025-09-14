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

type GalleryItem = { id: number | string; src: string; alt?: string };

type Props = {
  items: GalleryItem[]; // serverdən gəlir
};

export default function GallerySection({ items }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  // 4-lük qruplaşdırma
  const chunkedData = useMemo(() => {
    const chunks: GalleryItem[][] = [];
    for (let i = 0; i < items.length; i += 4) {
      chunks.push(items.slice(i, i + 4));
    }
    return chunks;
  }, [items]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openLightbox = (flatIndex: number) => {
    setCurrent(flatIndex);
    setIsLightboxOpen(true);
  };

  // Modal üçün düz massiv
  const flatData = useMemo(() => items, [items]);

  if (!items || items.length === 0) return null;

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
                {group.map((it, idx) => {
                  const flatIndex = slideIndex * 4 + idx;
                  return (
                    <Col xs={24} sm={12} md={12} lg={6} key={it.id}>
                      <button
                        className="g-card"
                        onClick={() => openLightbox(flatIndex)}
                        aria-label={`Open ${it.alt ?? `Image ${flatIndex + 1}`}`}
                      >
                        <Image
                          src={it.src}
                          alt={it.alt ?? `Image ${flatIndex + 1}`}
                          width={600}
                          height={400}
                          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                          priority={slideIndex === 0}
                        />
                      </button>
                    </Col>
                  );
                })}
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
              src={flatData[current].src}
              alt={flatData[current].alt ?? `Image ${current + 1}`}
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
