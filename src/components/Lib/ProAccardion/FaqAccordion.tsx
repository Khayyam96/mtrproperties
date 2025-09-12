"use client";

import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import "./index.scss";

type FaqAccordionProps = {
  items: CollapseProps["items"];
  defaultActiveKey?: string | string[];
  accordion?: boolean;
  expandIconPosition?: "start" | "end";
  className?: string;
};

export const FaqAccordion = ({
  items,
  defaultActiveKey,
  accordion = true,
  expandIconPosition = "end",
  className = "faq-accordion",
}: FaqAccordionProps) => {
  return (
    <Collapse
      accordion={accordion}
      items={items}                          
      defaultActiveKey={defaultActiveKey}
      expandIconPosition={expandIconPosition}
      className={className}
    />
  );
};

export default FaqAccordion;
