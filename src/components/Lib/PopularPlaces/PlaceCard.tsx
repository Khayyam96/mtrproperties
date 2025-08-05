"use client";
import { FC } from "react";
import Image from "next/image";
import "./index.scss";

type PlaceCardProps = {
  image: string;
  title: string;
};

export const PlaceCard: FC<PlaceCardProps> = ({ image, title }) => (
  <div className="place-card">
    <Image src={image} alt={title} fill className="place-card-img" />
    <div className="place-card-title">{title}</div>
  </div>
);
