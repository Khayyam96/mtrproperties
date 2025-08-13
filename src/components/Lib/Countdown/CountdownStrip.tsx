"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col } from "antd";
import classNames from "classnames";
import "./index.scss";

type Size = "sm" | "md" | "lg";

type Props = {
  deadline: string | number | Date;
  className?: string;
  size?: Size;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  onFinish?: () => void;
};

type Left = { total: number; d: number; h: number; m: number; s: number };

const MS = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

function getLeft(targetMs: number): Left {
  const total = Math.max(0, targetMs - Date.now());
  const d = Math.floor(total / MS.d);
  const h = Math.floor((total % MS.d) / MS.h);      // 0..23
  const m = Math.floor((total % MS.h) / MS.m);      // 0..59
  const s = Math.floor((total % MS.m) / MS.s);      // 0..59
  return { total, d, h, m, s };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function CountdownStrip({
  deadline,
  className,
  size = "lg",
  labels,
  onFinish,
}: Props) {
  const target = useMemo(() => new Date(deadline).getTime(), [deadline]);
  const [left, setLeft] = useState<Left>(() => getLeft(target));
  const finishedRef = useRef(false);

  useEffect(() => {
    finishedRef.current = false;
    setLeft(getLeft(target));

    const id = setInterval(() => {
      setLeft((prev) => {
        const next = getLeft(target);
        if (!finishedRef.current && prev.total > 0 && next.total === 0) {
          finishedRef.current = true;
          onFinish?.();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [target, onFinish]);

  const l = {
    days: labels?.days ?? "Days",
    hours: labels?.hours ?? "Hours",
    minutes: labels?.minutes ?? "Minutes",
    seconds: labels?.seconds ?? "Seconds",
  };

  return (
    <div className={classNames("countdown-strip", `countdown-strip--${size}`, className)}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={12} sm={6}><Box value={String(left.d)} label={l.days} /></Col>
        <Col xs={12} sm={6}><Box value={pad2(left.h)} label={l.hours} /></Col>
        <Col xs={12} sm={6}><Box value={pad2(left.m)} label={l.minutes} /></Col>
        <Col xs={12} sm={6}><Box value={pad2(left.s)} label={l.seconds} /></Col>
      </Row>
    </div>
  );
}

function Box({ value, label }: { value: string; label: string }) {
  return (
    <div className="cd-box">
      <div className="cd-value">{value}</div>
      <div className="cd-label">{label}</div>
    </div>
  );
}
