"use client";

import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";

interface RealestateInfoCardProps {
    title: string;
    desc: string;
    moreDesc: string;
}

export const RealestateInfoCard = ({
    title,
    desc,
    moreDesc,
}: RealestateInfoCardProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="realestate-info-card">
            <Container>
                <div className="re-title">{title}</div>
                <div className="re-desc">{desc}</div>
                {expanded && <div className="re-desc">{moreDesc}</div>}
                <div className="read-btns">
                    <span
                        className="read-more-btn"
                        onClick={() => setExpanded((v) => !v)}
                        role="button"
                        tabIndex={0}
                    >
                        {expanded ? "Read Less" : "Read More"}{" "}
                        {expanded ? <UpOutlined /> : <DownOutlined />}
                    </span>
                </div>
            </Container>
        </div>
    );
};

export default RealestateInfoCard;
