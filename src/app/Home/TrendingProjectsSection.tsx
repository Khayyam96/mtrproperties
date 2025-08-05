"use client";

import { FC } from "react";
import { Row, Col, Button } from "antd";

type Project = {
  image: string;
  price: string;
  title: string;
  location: string;
  badge: string;
};

const projects: Project[] = [
  {
    image: "/card1.png",
    price: "Starts From 8.8M",
    title: "Six Senses",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
  },
  {
    image: "/card2.png",
    price: "Starts From 8.8M",
    title: "Six Senses",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
  },
  {
    image: "/card3.png",
    price: "Starts From 8.8M",
    title: "Six Senses",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
  },
  {
    image: "/card4.png",
    price: "Starts From 8.8M",
    title: "Six Senses",
    location: "The Palm Jumeirah, Dubai",
    badge: "Ready to Move",
  },
];

export const TrendingProjectsSection: FC = () => {
  return (
    <div className="trending-projects-section">
        <div className="trending-projects-header">
          <h2>Most Trending Projects in Dubai</h2>
          <p>
            scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus purus. 
            Posuere urna nec tincidunt praesent
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
                  <Button className="view-more-btn" size="large">
                    View More <span className="arrow">→</span>
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
    </div>
  );
};
