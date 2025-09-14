// ProjectCard.tsx
"use client";

import { FC, KeyboardEvent, useEffect, useState, useMemo, useCallback } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "./index.scss";

type Props = {
  slug: string;
  name: string;
  location?: string;
  price: string;
  imageUrl: string;
  segment?: string;
  handoverYear?: number | string;
  handoverAt?: string | Date | null;
  paymentPlanLabel?: string;
  developerLogo?: string;
};

const msIn = {
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const Countdown: FC<{ target?: string | Date | null }> = ({ target }) => {
  // Parse once, reuse
  const targetMs = useMemo(() => {
    if (!target) return null;
    const t = typeof target === "string" ? new Date(target) : target;
    const ms = t.getTime();
    return Number.isNaN(ms) ? null : ms;
  }, [target]);

  const getMsLeft = useCallback(() => {
    if (targetMs == null) return 0;
    const ms = targetMs - Date.now();
    return ms > 0 ? ms : 0;
  }, [targetMs]);

  const [msLeft, setMsLeft] = useState<number>(() => getMsLeft());

  useEffect(() => {
    // kick once and start ticking
    setMsLeft(getMsLeft());
    const id = setInterval(() => {
      setMsLeft(() => {
        const next = getMsLeft();
        if (next <= 0) {
          clearInterval(id);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [getMsLeft]);

  const days = Math.floor(msLeft / msIn.day);
  const hrs = Math.floor((msLeft % msIn.day) / msIn.hour);
  const min = Math.floor((msLeft % msIn.hour) / msIn.minute);
  const sec = Math.floor((msLeft % msIn.minute) / msIn.second);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="countdown">
      <div><strong>{pad(days)}</strong><p>Days</p></div>
      <div><strong>{pad(hrs)}</strong><p>Hrs</p></div>
      <div><strong>{pad(min)}</strong><p>Min</p></div>
      <div><strong>{pad(sec)}</strong><p>Sec</p></div>
    </div>
  );
};

export const ProjectCard: FC<Props> = ({
  slug,
  name,
  location,
  price,
  imageUrl,
  segment,
  handoverAt,
  paymentPlanLabel,
  developerLogo,
}) => {
  const href = `/planpage/${slug}`;

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      (e.currentTarget.querySelector("a") as HTMLAnchorElement)?.click();
    }
  };

  const handoverLabel = useMemo(() => {
    if (!handoverAt) return "Handover TBD";
    const m = moment(handoverAt);
    return m.isValid() ? `Handover ${m.format("YYYY")}` : "Handover TBD";
  }, [handoverAt]);

  return (
    <div className="project-card" role="link" tabIndex={0} onKeyDown={handleKey}>
      <Link href={href} className="card-link" prefetch>
        <div className="image-wrapper">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={250}
            className="main-img"
          />

          <div className="badges">
            <div className="badge">{handoverLabel}</div>
            <div className="badge">
              {paymentPlanLabel ? `${paymentPlanLabel} Payment plan` : "Payment plan"}
            </div>
          </div>

          <Countdown target={handoverAt} />
        </div>

        <div className="info">
          {segment && <div className="tag">{segment}</div>}
          <div className="title">{name}</div>

          {location && (
            <div className="location" title={location}>
              <EnvironmentOutlined /> {location}
            </div>
          )}

          <div className="price">{price}</div>

          {developerLogo && (
            <div className="mag-logo">
              <Image
                src={developerLogo}
                alt={`${name} developer logo`}
                width={50}
                height={50}
                className="dev-logo"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
