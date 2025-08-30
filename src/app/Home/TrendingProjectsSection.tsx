// src/components/TrendingProjectsSection.tsx
"use client";

import { FC } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";

type Project = {
  image: string;
  price: string;
  title: string;
  location: string;
  badge: string;
  slug: string; // <-- slug əlavə
};

const projects: Project[] = [
  {
    image: "/card1.png",
    price: "Starts From 8.8M",
    title: "Six Senses",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
    slug: "six-senses",
  },
  {
    image: "/card2.png",
    price: "Starts From 8.8M",
    title: "Palm Views",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
    slug: "palm-views",
  },
  {
    image: "/card3.png",
    price: "Starts From 8.8M",
    title: "Dubai Marina Heights",
    location: "Dubai Marina, Dubai",
    badge: "Ready to Move",
    slug: "dubai-marina-heights",
  },
  {
    image: "/card4.png",
    price: "Starts From 8.8M",
    title: "Emaar Beachfront",
    location: "Dubai Harbour, Dubai",
    badge: "Ready to Move",
    slug: "emaar-beachfront",
  },
];

export const TrendingProjectsSection: FC = () => {
  return (
    <div className="trending-projects-section">
      <div className="trending-projects-header">
        <h2>Most Trending Projects in Dubai</h2>
        <p>
          scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis
          aliquam faucibus purus. Posuere urna nec tincidunt praesent
        </p>
      </div>

      <Row gutter={[24, 0]} className="trending-projects-row">
        {projects.map((project, idx) => (
          <Col xs={24} md={6} key={idx}>
            <div
              className="project-card"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="overlay" />
              <div className="badges">
                <div className="badge">{project.badge}</div>
                <div className="price">{project.price}</div>
              </div>

              <div className="project-info">
                <div className="title">{project.title}</div>
                <div className="location">{project.location}</div>

                <Link href={`/planpage/${project.slug}`} prefetch>
                  <Button className="view-more-btn" size="large">
                    View More <span className="arrow">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
