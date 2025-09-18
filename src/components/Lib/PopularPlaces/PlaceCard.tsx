"use client";

import { FC } from "react";
import Image from "next/image";
import "./index.scss";

export type TProCard = {
  id: number;
  type: string;
  name: string;
  lat: string;
  long: string;
  image_url: string;
  is_most_popular: boolean;
};

export const PlaceCard: FC<TProCard> = ({
  name,
  image_url,
}) => {
  const fullImageUrl = `https://api.dubaiyachts.com/uploads/properties/${image_url}`;

  return (
    <div className="place-card">
      <Image
        src={fullImageUrl}
        alt={name}
        fill
        className="place-card-img"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="place-card-title">{name}</div>
    </div>
  );
};
