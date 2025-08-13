"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Typography, Button, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const { Title } = Typography;

export default function GallerySection() {
  const sliderRef = useRef<Slider | null>(null);
  const thumbsRef = useRef<Slider | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const gridSettings: Settings = {
    dots: false,
    arrows: false,
    speed: 400,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 4,
    responsive: [
      { breakpoint: 1200, settings: { slidesPerRow: 3 } },
      { breakpoint: 992,  settings: { slidesPerRow: 2 } },
      { breakpoint: 576,  settings: { slidesPerRow: 1 } },
    ],
  };

  const thumbSettings: Settings = {
    dots: false,
    arrows: true,
    speed: 300,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992,  settings: { slidesToShow: 4 } },
      { breakpoint: 576,  settings: { slidesToShow: 3 } },
    ],
  };

  const data = useMemo(
    () => [
      { id: 1, src: "/gal1.png", alt: "Gallery 1" },
      { id: 2, src: "/gal2.png", alt: "Gallery 2" },
      { id: 3, src: "/gal3.png", alt: "Gallery 3" },
      { id: 4, src: "/gal4.png", alt: "Gallery 4" },
      { id: 5, src: "/gal1.png", alt: "Gallery 5" },
      { id: 6, src: "/gal2.png", alt: "Gallery 6" },
    ],
    []
  );

  const openLightbox = (index: number) => {
    setCurrent(index);
    setIsLightboxOpen(true);
    // kiçik bir gecikmə ilə thumbnail cari elemana scroll et
    setTimeout(() => thumbsRef.current?.slickGoTo(index, true), 0);
  };

  const goPrev = () => setCurrent((i) => (i - 1 + data.length) % data.length);
  const goNext = () => setCurrent((i) => (i + 1) % data.length);

  // Klaviatura dəstəyi (← → Esc)
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen]);

  return (
    <section className="gallery-section">
      <Title level={2} style={{ textAlign: "center" }}>Gallery</Title>

      <Slider ref={sliderRef} {...gridSettings}>
        {data.map((it, idx) => (
          <div key={it.id} className="g-slide">
            <button className="g-card" onClick={() => openLightbox(idx)} aria-label="Open image">
              <img src={it.src} alt={it.alt} />
            </button>
          </div>
        ))}
      </Slider>

      <div className="gallery-nav">
        <Button onClick={() => sliderRef.current?.slickPrev()} icon={<LeftOutlined />} />
        <Button onClick={() => sliderRef.current?.slickNext()} icon={<RightOutlined />} />
      </div>

      {/* LIGHTBOX */}
      <Modal
        open={isLightboxOpen}
        onCancel={() => setIsLightboxOpen(false)}
        footer={null}
        width="90vw"
        centered
        destroyOnClose
        className="lightbox-modal"
      >
        <div className="lightbox-body">
          <button className="lb-nav prev" onClick={goPrev} aria-label="Previous">
            <LeftOutlined />
          </button>

          <div className="lb-image-wrap">
            <img src={data[current].src} alt={data[current].alt} className="lb-image" />
          </div>

          <button className="lb-nav next" onClick={goNext} aria-label="Next">
            <RightOutlined />
          </button>
        </div>

        <div className="lb-counter">
          {current + 1} / {data.length}
        </div>

        <div className="lb-thumbs">
          <Slider ref={thumbsRef} {...thumbSettings}>
            {data.map((it, idx) => (
              <div key={it.id} className="lb-thumb-item">
                <button
                  className={`lb-thumb ${idx === current ? "is-active" : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to ${idx + 1}`}
                >
                  <img src={it.src} alt={it.alt} />
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </Modal>
    </section>
  );
}
