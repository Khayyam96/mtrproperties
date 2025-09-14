"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col } from "antd";
import classNames from "classnames";
import "./index.scss";

type Size = "sm" | "md" | "lg";
type Labels = { days?: string; hours?: string; minutes?: string; seconds?: string };

type Left = { total: number; d: number; h: number; m: number; s: number };

const MS = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

function getLeft(targetMs: number): Left {
  const total = Math.max(0, targetMs - Date.now());
  const d = Math.floor(total / MS.d);
  const h = Math.floor((total % MS.d) / MS.h);
  const m = Math.floor((total % MS.h) / MS.m);
  const s = Math.floor((total % MS.m) / MS.s);
  return { total, d, h, m, s };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

// ⬇️ Bu tipi EXPORT et ki başqa fayllar da düzgün görsün
export type CountdownProps = {
  deadline: string | number | Date;
  className?: string;
  size?: Size;
  labels?: Labels;
  onFinish?: () => void; // ⬅️ Burada var
};

// ⬇️ Funksiyanı mütləq eyni tip ilə imzala
export default function CountdownStrip({
  deadline,
  className,
  size = "lg",
  labels,
  onFinish,
}: CountdownProps) {
  const target = useMemo(() => {
    const t = new Date(deadline).getTime();
    return Number.isFinite(t) ? t : NaN;
  }, [deadline]);

  const onFinishRef = useRef<(() => void) | undefined>(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const [left, setLeft] = useState<Left>(() =>
    Number.isFinite(target) ? getLeft(target) : { total: 0, d: 0, h: 0, m: 0, s: 0 }
  );
  const finishedRef = useRef(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target)) {
      finishedRef.current = true;
      return;
    }

    finishedRef.current = false;
    setLeft(getLeft(target));

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    intervalIdRef.current = setInterval(() => {
      setLeft((prev) => {
        const next = getLeft(target);
        if (!finishedRef.current && prev.total > 0 && next.total === 0) {
          finishedRef.current = true;
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          onFinishRef.current?.();
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [target]);

  const l = {
    days: labels?.days ?? "Days",
    hours: labels?.hours ?? "Hours",
    minutes: labels?.minutes ?? "Minutes",
    seconds: labels?.seconds ?? "Seconds",
  };

  const invalid = !Number.isFinite(target);

  return (
    <div className={classNames("countdown-strip", `countdown-strip--${size}`, className)}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={12} sm={6}><Box value={invalid ? "0" : String(left.d)} label={l.days} /></Col>
        <Col xs={12} sm={6}><Box value={invalid ? "00" : pad2(left.h)} label={l.hours} /></Col>
        <Col xs={12} sm={6}><Box value={invalid ? "00" : pad2(left.m)} label={l.minutes} /></Col>
        <Col xs={12} sm={6}><Box value={invalid ? "00" : pad2(left.s)} label={l.seconds} /></Col>
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
