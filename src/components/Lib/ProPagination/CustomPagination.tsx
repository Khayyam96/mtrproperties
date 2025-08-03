"use client";

import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./index.scss";

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export const CustomPagination = ({ current, total, onChange }: Props) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="custom-pagination">
      <Button
        className="nav-btn"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        icon={<LeftOutlined />}
      >
        Previous
      </Button>

      <div className="page-numbers">
        {pages.map((page) => (
          <button
            key={page}
            className={`page-btn ${current === page ? "active" : ""}`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        className="nav-btn"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        icon={<RightOutlined />}
        iconPosition="end"
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
