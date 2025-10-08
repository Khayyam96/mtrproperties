"use client";

import React, { FC, useMemo } from "react";
import { Typography } from "antd";
import { FaqAccordion } from "@/components/Lib/ProAccardion/FaqAccordion";
import { Container } from "@/components/Lib/ProContainer/Container";
import type { FaqResponse } from "@/models/Faq.model";

const { Title } = Typography;

type TPropsFaq = {
  data: FaqResponse;
};

const RealEstateFaqSection: FC<TPropsFaq> = ({ data }) => {

  const items = useMemo(
    () =>
      (data?.data ?? [])
        .slice()
        .sort((a, b) => a.id - b.id) 
        .map((i) => ({
          key: String(i.id),
          label: i.question,
          children: <p>{i.answer}</p>,
        })),
    [data]
  );

  const defaultActiveKey = items[0]?.key;

  return (
    <section className="realestate-faq-section">
      <Container className="no-padding" >
        <div className="faq-wrapper">
          <Title level={4} className="faq-title">
            Frequently Asked Questions
          </Title>
          <FaqAccordion items={items} defaultActiveKey={defaultActiveKey} />
        </div>
      </Container>
    </section>
  );
};

export default RealEstateFaqSection;
