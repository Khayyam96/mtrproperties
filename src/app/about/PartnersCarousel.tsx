"use client";

import { Typography, Empty } from "antd";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import type SliderType from "react-slick";
import Image from "next/image";
import { useMemo, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

import type { PartnerListResponse } from "../../models/PartnerList.model";
import { buildPartnerImgUrl } from "../../models/PartnerList.model";

const { Title, Text } = Typography;

type Props = { data: PartnerListResponse };

export const PartnersCarousel: React.FC<Props> = ({ data }) => {
  const sliderRef = useRef<SliderType | null>(null);
  const items = useMemo(() => data?.data ?? [], [data]);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.7,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992,  settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2.5 } },
      { breakpoint: 576,  settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="partnersSection">
      <Title level={3} className="title">Our Partners</Title>
      <Text className="subtitle">
        We collaborate with leading developers across the region.
      </Text>

      {items.length === 0 ? (
        <Empty style={{ marginTop: 24 }} description="No partners found" />
      ) : (
        <Slider ref={sliderRef} {...settings} className="carousel">
          {items.map((p) => (
            <div key={p.id} className="partnerSlide">
              <div className="partnerCard" title={p.name}>
                <div className="logoBox">
                  <Image
                    src={buildPartnerImgUrl(p.image_url)}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 45vw, 210px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <div className="customArrows">
        <button
          aria-label="Previous"
          className="arrowBtn"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <Image src="/previcon.png" alt="Previous" width={24} height={24} />
        </button>
        <button
          aria-label="Next"
          className="arrowBtn"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <Image src="/nexticon.png" alt="Next" width={24} height={24} />
        </button>
      </div>
    </section>
  );
};

export default PartnersCarousel;
