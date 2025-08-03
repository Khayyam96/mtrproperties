"use client";

import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaqAccordion } from "@/components/Lib/ProAccardion/FaqAccordion";
import "./index.scss";

const { Title, Paragraph } = Typography;

const faqItems = [
  {
    key: "1",
    label: "It is a long established fact that a reader",
    children: (
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
        Latin literature from 45 BC, making it over 2000 years old.
      </p>
    ),
  },
  {
    key: "2",
    label: "Where can I find real estate investment opportunities?",
    children: <p>You can find them in prime Dubai locations such as Downtown, Marina, and Business Bay.</p>,
  },
  {
    key: "3",
    label: "How much is the minimum investment in Dubai property?",
    children: <p>Minimum investment starts from AED 750,000 (~$204,000).</p>,
  },
];

export const RealEstateFaqSection = () => {
  return (
    <section className="realestate-faq-section">
      <div className="realestate-intro">
        <Title level={3}>Realestate agency in Dubai</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </Paragraph>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </Paragraph>
        <a className="read-more" href="#">
          Read More <DownOutlined />
        </a>
      </div>

      <div className="faq-wrapper">
        <Title level={4} className="faq-title">Frequently Asked Questions</Title>
        <FaqAccordion items={faqItems} defaultActiveKey={["2"]} />
      </div>
    </section>
  );
};

export default RealEstateFaqSection;
