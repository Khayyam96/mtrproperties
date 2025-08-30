"use client";

import { FC, useRef } from "react";
import { Typography, Rate, Avatar } from "antd";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import Image from "next/image";
import { Container } from "@/components/Lib/ProContainer/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Title, Text } = Typography;

const reviews = [
  { name: "Baljinder Singh", date: "Feb 19, 2025", rating: 1, comment: "Waiting for 20 minutes no service", avatarColor: "#6fcf97" },
  { name: "Gautam Kohli", date: "Feb 10, 2025", rating: 5, comment: "", avatarColor: "#27ae60" },
  { name: "Deepak Kalia", date: "Jan 17, 2025", rating: 5, comment: "", avatarColor: "#9b51e0" },
  { name: "Mitin Sharma", date: "Dec 26, 2024", rating: 2, comment: "The bakery items(pastries) were a huge disappointment - stale, dry and clearly not fresh.", avatarColor: "#2d9cdb" },
  { name: "Rafik Khan", date: "Jan 04, 2025", rating: 5, comment: "", avatarColor: "#eb5757" },
  { name: "Alex Johnson", date: "Jan 20, 2025", rating: 4, comment: "Good service, but can improve.", avatarColor: "#f2994a" },
  { name: "Aysel Memmedova", date: "Feb 5, 2025", rating: 5, comment: "", avatarColor: "#56ccf2" },
];

export const GoogleReviewsSection: FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings: Settings = {
    dots: false,
    infinite: reviews.length > 5,
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
  };

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

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
          <Rate disabled defaultValue={5} allowHalf />
          <Text className="rating-text">5.0 rating of 12 reviews</Text>
        </div>

        <Slider ref={sliderRef} {...sliderSettings} className="reviews-slider">
          {reviews.map((review, idx) => (
            <div className="review-slide" key={idx}>
              <div className="review-card">
                <div className="review-header">
                  <Avatar style={{ backgroundColor: review.avatarColor }}>{review.name[0]}</Avatar>
                  <div className="review-info">
                    <Text className="review-name">{review.name}</Text>
                    <Text className="review-date">on {review.date}</Text>
                  </div>
                </div>

                <Rate disabled defaultValue={review.rating} />
                {review.comment && <div className="review-comment">{review.comment}</div>}
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default GoogleReviewsSection;
