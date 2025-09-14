"use client";

import { useState, KeyboardEvent } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import type { RealEstate } from "@/models/RealEstate.model";

type TProps = { data: RealEstate };

export default function RealestateInfoCard({ data }: TProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);
  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const short =
    data.content && data.content.length > 220
      ? data.content.slice(0, 220) + "…"
      : data.content;

  return (
    <div className="realestate-info-card">
      <Container>
        <div className="re-title">{data.title}</div>
        <div className="re-desc">
          {expanded ? data.content : short}
        </div>

        <div className="read-btns" style={{display:"flex", width:"100%", justifyContent: "flex-end"}}>
          <span
            className="read-more-btn"
            onClick={toggle}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}{" "}
            {expanded ? <UpOutlined /> : <DownOutlined />}
          </span>
        </div>
      </Container>
    </div>
  );
}
