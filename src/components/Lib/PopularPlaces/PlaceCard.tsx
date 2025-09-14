"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import "./index.scss";

type PlaceCardProps = {
  image?: string;
  title: string;
};

const HOST = "https://api.dubaiyachts.com";
const UPLOADS_PREFIX = "/uploads/properties";

function resolveImage(src?: string): string {
  if (!src) return "/placeholder.png";

  if (/^https?:\/\//i.test(src)) return src;

  if (src.startsWith(UPLOADS_PREFIX)) {
    return `${HOST}${src}`;
  }

  const cleaned = src.replace(/^\/+/, ""); 
  return `${HOST}${UPLOADS_PREFIX}/${cleaned}`;
}

export const PlaceCard: FC<PlaceCardProps> = ({ image, title }) => {
  const resolved = useMemo(() => resolveImage(image), [image]);

  return (
    <div className="place-card">
      <Image src={resolved} alt={title} fill className="place-card-img" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="place-card-title">{title}</div>
    </div>
  );
};
