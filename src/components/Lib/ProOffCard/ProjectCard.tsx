"use client";

import { FC, KeyboardEvent, useMemo, useState, useEffect, useCallback } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import "./index.scss";

export type ProjectCardProps = {
  slug: string;
  name: string;
  location?: string;
  price?: string;
  imageUrl: string;
  segment?: string | null;
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
  const targetMs = useMemo(() => {
    if (!target) return null;
    const t = typeof target === "string" ? new Date(target) : target;
    const ms = t.getTime();
    return Number.isNaN(ms) ? null : ms;
  }, [target]);

  const nowLeft = useCallback(() => {
    if (targetMs == null) return 0;
    const diff = targetMs - Date.now();
    return diff > 0 ? diff : 0;
  }, [targetMs]);

  const [msLeft, setMsLeft] = useState<number>(() => nowLeft());

  useEffect(() => {
    setMsLeft(nowLeft());
    const id = setInterval(() => {
      setMsLeft(() => {
        const next = nowLeft();
        if (next <= 0) {
          clearInterval(id);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [nowLeft]);

  const days = Math.floor(msLeft / msIn.day);
  const hrs = Math.floor((msLeft % msIn.day) / msIn.hour);
  const min = Math.floor((msLeft % msIn.hour) / msIn.minute);
  const sec = Math.floor((msLeft % msIn.minute) / msIn.second);
  const pad = (n: number) => String(n).padStart(2, "0");

  if (targetMs == null) {
    return (
      <div className="countdown" aria-label="handover countdown">
        <div><strong>--</strong><p>Days</p></div>
        <div><strong>--</strong><p>Hrs</p></div>
        <div><strong>--</strong><p>Min</p></div>
        <div><strong>--</strong><p>Sec</p></div>
      </div>
    );
  }

  return (
    <div className="countdown" aria-label="handover countdown">
      <div><strong>{pad(days)}</strong><p>Days</p></div>
      <div><strong>{pad(hrs)}</strong><p>Hrs</p></div>
      <div><strong>{pad(min)}</strong><p>Min</p></div>
      <div><strong>{pad(sec)}</strong><p>Sec</p></div>
    </div>
  );
};

export const ProjectCard: FC<ProjectCardProps> = ({
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
  // ✅ Yeganə və düzgün route
  const href = `/popylarinner/${encodeURIComponent(slug)}`;

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      (e.currentTarget.querySelector("a") as HTMLAnchorElement)?.click();
    }
  };

  const handoverLabel = useMemo(() => {
    if (!handoverAt) return "Handover TBD";
    const d = typeof handoverAt === "string" ? new Date(handoverAt) : handoverAt;
    if (Number.isNaN(d.getTime())) return "Handover TBD";
    return `Handover ${d.getFullYear()}`;
  }, [handoverAt]);

  return (
    <div className="project-card" role="link" tabIndex={0} onKeyDown={handleKey}>
      <Link href={href} className="card-link" prefetch>
        <div className="image-wrapper">
          <Image src={imageUrl} alt={name} width={400} height={250} className="main-img" />
          <div className="badges">
            <div className="badge">{handoverLabel}</div>
            <div className="badge">
              {paymentPlanLabel ? `${paymentPlanLabel} Payment plan` : "Payment plan"}
            </div>
          </div>
          <Countdown target={handoverAt} />
        </div>

        <div className="info">
          <div>
            {segment && (
              <div className="tag">
                <p>{segment}</p>
              </div>
            )}
            <h1 className="title">{name}</h1>

            {location && (
              <div className="location" title={location}>
                <EnvironmentOutlined /> {location}
              </div>
            )}

            {price && <div className="price">{price}</div>}
          </div>

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

export default ProjectCard;
