"use client";

import { Collapse, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const faqItems: { key: string; label: string; children: React.ReactNode }[] = [
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
      label: "It is a long established fact that a reader",
      children: <></>,
    },
    {
      key: "3",
      label: "It is a long established fact that a reader",
      children: <></>,
    },
    {
      key: "4",
      label: "It is a long established fact that a reader",
      children: <></>,
    },
    {
      key: "5",
      label: "It is a long established fact that a reader",
      children: <></>,
    },
    {
      key: "6",
      label: "It is a long established fact that a reader",
      children: <></>,
    },
  ];
  

export const RealEstateFaqSection = () => {
  return (
    <section className="realestate-faq-section">
      <div className="realestate-intro">
        <Title level={3}>Realestate agency in dubai</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </Paragraph>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem
          Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s.
        </Paragraph>
        <a className="read-more" href="#">
          Read More <DownOutlined />
        </a>
      </div>

      <div className="faq-wrapper">
        <Title level={4} className="faq-title">
          Frequently Asked Question
        </Title>

        <Collapse
          accordion
          expandIconPosition="end"
          defaultActiveKey={["2"]}
          className="faq-collapse"
        >
          {faqItems.map((item) => (
            <Panel header={item.label} key={item.key}>
              {item.children}
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
};

export default RealEstateFaqSection;
