"use client";

import { FC, useMemo, useRef, useCallback } from "react";
import { Typography, Rate, Avatar } from "antd";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import Image from "next/image";
import moment from "moment";
import { Container } from "@/components/Lib/ProContainer/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewResponse } from "@/models/Review.model";

const { Title, Text } = Typography;

type TProps = {
  data: ReviewResponse;
};

const PALETTE = ["#6fcf97", "#27ae60", "#9b51e0", "#2d9cdb", "#eb5757", "#f2994a", "#56ccf2"];

function colorFromString(s?: string) {
  const str = (s || "").trim();
  if (!str) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function firstInitial(s?: string) {
  const c = (s || "").trim().charAt(0);
  return c ? c.toUpperCase() : "?";
}

function formatDate(d?: string | number | Date) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM D, YYYY") : "";
}

export const GoogleReviewsSection: FC<TProps> = ({ data }) => {
  console.log(data, "review data");
  const sliderRef = useRef<Slider | null>(null);

  const items = useMemo(() => data?.data ?? [], [data?.data]);
  const itemsLength = items.length;

  const avgRating = useMemo(() => {
    // Prefer API-provided average if exists and parseable
    const apiAvg = data?.average ? parseFloat(String(data.average)) : NaN;
    if (!Number.isNaN(apiAvg)) return Math.round(apiAvg * 10) / 10;

    if (!itemsLength) return 0;
    const sum = items.reduce((acc, r) => {
      const val = Number.isFinite(Number(r.rating)) ? Number(r.rating) : parseFloat(String(r.rating)) || 0;
      return acc + val;
    }, 0);
    return Math.round((sum / itemsLength) * 10) / 10;
  }, [data?.average, items, itemsLength]);

  const sliderSettings: Settings = useMemo(
    () => ({
      dots: false,
      infinite: itemsLength > 5,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      swipeToSlide: true,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.2,
            variableWidth: true,
            infinite: false,
            arrows: false,
            swipeToSlide: true,
          },
        },
      ],
    }),
    [itemsLength]
  );

  const handlePrev = useCallback(() => sliderRef.current?.slickPrev(), []);
  const handleNext = useCallback(() => sliderRef.current?.slickNext(), []);

  return (
    <div className="google-reviews-section">
      <Container>
        <div className="reviews-row-header">
          <Title level={4} className="reviews-title">
            Customer reviews on Google
          </Title>
          <div className="slider-btn-group">
            <button className="slider-btn" aria-label="Previous" onClick={handlePrev} type="button">
              <Image src="/previcon.png" alt="Prev" width={32} height={32} />
            </button>
            <button className="slider-btn" aria-label="Next" onClick={handleNext} type="button">
              <Image src="/nexticon.png" alt="Next" width={32} height={32} />
            </button>
          </div>
        </div>

        <div className="reviews-rating-row">
          <Rate disabled allowHalf value={avgRating} />
          <Text className="rating-text">
            {avgRating.toFixed(1)} rating{itemsLength ? ` of ${itemsLength} reviews` : ""}
          </Text>
        </div>

        {itemsLength === 0 ? (
          <div className="reviews-empty">
            <Text>No reviews yet.</Text>
          </div>
        ) : (
          <Slider ref={sliderRef} {...sliderSettings} className="reviews-slider">
            {items.map((item) => (
              <div className="review-slide" key={item.id}>
                <div className="review-card">
                  <div className="review-header">
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: colorFromString(item.fullname),
                        width: 40,
                        height: 40,
                        lineHeight: "40px",
                      }}
                    >
                      {firstInitial(item.fullname)}
                    </Avatar>
                    <div className="review-info">
                      <Text className="review-name">{item.fullname}</Text>
                      <Text className="review-date">{formatDate(item.created_at)}</Text>
                    </div>
                  </div>
                  <Rate disabled allowHalf value={Number(item.rating) || 0} />
                  {item.review ? <div className="review-comment">{item.review}</div> : null}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </Container>
    </div>
  );
};

export default GoogleReviewsSection;
