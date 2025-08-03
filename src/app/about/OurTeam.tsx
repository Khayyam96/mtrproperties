"use client";

import { Col, Row, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../../components/Lib/ProContainer/Container";


const { Title, Text } = Typography;

const teamMembers = [
  {
    name: "Person name",
    role: "Designation",
    image: "/t1.png",

  },
  {
    name: "Person name",
    role: "Designation",
    image: "/t2.png",
  },
  {
    name: "Person name",
    role: "Designation",
    image: "/t3.png",
  },
  {
    name: "Person name",
    role: "Designation",
    image: "/t4.png",
  },
];

export const OurTeam = () => {
  return (
    <div className="our-team-section">
      <Container>
        <div className="text-center">
          <Title level={2}>Our Team</Title>
          <Text className="subtitle">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Text>
        </div>

        <Row gutter={[24, 24]} className="team-row mt-2">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <div className="team-card">
                <div className="team-img">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={500}
                    height={500}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="see-more text-center">
          <Link href="/agents" className="see-link">
            See all Agents
          </Link>
        </div>
      </Container>
    </div>
  );
};
