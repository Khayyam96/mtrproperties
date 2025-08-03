"use client";

import { useState } from "react";
import { Row, Col, Typography } from "antd";
import { ProjectCard } from "../../components/Lib/ProjectCard/ProjectCard";
import CustomPagination from "../../components/Lib/ProPagination/CustomPagination";
import { Container } from "../../components/Lib/ProContainer/Container"; 
import "./index.scss";


type Project = {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
};

const allProjects: Project[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: "Lotus at Creek Beach",
  location: "Place of this property",
  price: "Starting at AED 970K*",
  image: "/img4.png",
}));

const pageSize = 9;

export const ProjectListingSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProjects = allProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(allProjects.length / pageSize);

  return (
    <div className="project-listing-section">
      <Container>
        <Row gutter={[24, 24]}>
          {paginatedProjects.map((project) => (
            <Col key={project.id} xs={24} sm={12} md={8}>
              <ProjectCard
                name={project.name}
                location={project.location}
                price={project.price}
                image={project.image}
              />
            </Col>
          ))}
        </Row>

        <div className="pagination-wrapper">
          <CustomPagination
            current={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProjectListingSection;
