"use client";

import { FC, useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./index.scss";

type Props = {
  name: string;
  location: string;
  price: string;
  image: string;
};

const Countdown: FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hrs = Math.floor((timeLeft % (60 * 60 * 24)) / 3600);
  const min = Math.floor((timeLeft % 3600) / 60);
  const sec = timeLeft % 60;

  return (
    <div className="countdown">
      <div><strong>{days}</strong> Days</div>
      <div><strong>{hrs}</strong> Hrs</div>
      <div><strong>{min}</strong> Min</div>
      <div><strong>{sec}</strong> Sec</div>
    </div>
  );
};

export const ProjectCard: FC<Props> = ({ name, location, price, image }) => {
  return (
    <div className="project-card">
      <div className="image-wrapper">
        <Image src={image} alt={name} width={400} height={250} className="main-img" />

        <div className="badges">
          <div className="badge">Handover 2027</div>
          <div className="badge">50/50 Payment plan</div>
        </div>

        <Countdown />
      </div>

      <div className="info">
        <div className="tag">LUXURY</div>
        <div className="title">{name}</div>
        <div className="location">
          <EnvironmentOutlined /> {location}
        </div>
        <div className="price">{price}</div>
        <div className="mag-logo">
          <Image src="/imglogo.png" alt="MAG Logo" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};
