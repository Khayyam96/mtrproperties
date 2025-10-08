"use client";

import React from "react";
import { Col, Row, Typography, Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../../components/Lib/ProContainer/Container";
import type { TeamListResponse } from "../../models/Team.model";
import "./index.scss";

const { Title, Text } = Typography;

const MEDIA_BASE = "https://api.dubaiyachts.com/uploads/properties/";
// Təhlükəsiz birləşdirmə + fallback
const buildSrc = (path?: string | null) =>
  path
    ? `${MEDIA_BASE}${path}`.replace(/([^:]\/)\/+/g, "$1")
    : "/images/noavatar.svg";

type TProps = {
  data: TeamListResponse;
};

const OurTeam: React.FC<TProps> = ({ data }) => {
  const members = data?.data ?? [];

  return (
    <div className="our-team-section">
      <Container>
        <div className="text-center">
          <Title level={2}>Our Team</Title>
          <Text className="subtitle">
            Meet the people behind our projects and customer success.
          </Text>
        </div>

        {members.length === 0 ? (
          <div className="mt-2">
            <Empty description="No team members found" />
          </div>
        ) : (
          <Row gutter={[24, 24]} className="team-row mt-2">
            {members.map((m) => (
              <Col xs={24} sm={12} md={8} lg={6} key={m.id}>
                <div className="team-card">
                  <div className="team-img">
                    <Image
                      src={buildSrc(m.image_url)}
                      alt={m.name}
                      width={600}
                      height={600}
                      // static positioning + full container cover
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "static" }}
                      priority={false}
                    />

                  </div>

                  <div className="team-info">
                    <h4 className="name">{m.name}</h4>
                    <p className="role">{m.position ?? ""}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        <div className="see-more text-center">
          <Link href="/agents" className="see-link">
            See all Agents
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default OurTeam;
export { OurTeam };
