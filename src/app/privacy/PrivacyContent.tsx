"use client";

import { FC } from "react";
import { Row, Col } from "antd";
import { Container } from "@/components/Lib/ProContainer/Container";
import type { PrivacyPolicyResponse } from "@/models/PrivacyContent.model";
import "./index.scss";

type Props = {
  className?: string;
  data: PrivacyPolicyResponse;
};

const PrivacyContent: FC<Props> = ({ className, data }) => {
  return (
    <section className={`privacy-content ${className || ""}`}>
      <Container>
        <Row justify="center">
          <Col xs={24} lg={18}>
            <div
              className="privacy-content__html"
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PrivacyContent;
