"use client";

import { Collapse } from "antd";
import type { CollapseProps } from "antd";

const { Panel } = Collapse;

type FaqItem = {
  key: string;
  label: string;
  children: React.ReactNode;
};

type FaqAccordionProps = {
  items: FaqItem[];
  defaultActiveKey?: string[];
  accordion?: boolean;
  expandIconPosition?: "start" | "end";
};

export const FaqAccordion = ({
  items,
  defaultActiveKey = [],
  accordion = true,
  expandIconPosition = "end",
}: FaqAccordionProps) => {
  return (
    <Collapse
      accordion={accordion}
      defaultActiveKey={defaultActiveKey}
      expandIconPosition={expandIconPosition}
      className="faq-accordion"
    >
      {items.map((item) => (
        <Panel header={item.label} key={item.key}>
          {item.children}
        </Panel>
      ))}
    </Collapse>
  );
};

export default FaqAccordion;
