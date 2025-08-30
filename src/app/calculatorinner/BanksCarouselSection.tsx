"use client";

import { FC, useMemo, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Link from "next/link";
import { Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type BankItem = {
  name: string;
  logo: string;     // public/ içindən yol, məsələn "/banks/enbd.png"
  href?: string;    // verilərsə loqo kliklənə bilər
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: BankItem[];
  className?: string;
};

const defaultItems: BankItem[] = [
  { name: "Emirates NBD", logo: "/banks/enbd.png" },
  { name: "ADCB", logo: "/banks/adcb.png" },
  { name: "Citi", logo: "/banks/citi.png" },
  { name: "RAKBANK", logo: "/banks/rakbank.png" },
  { name: "Mashreq", logo: "/banks/mashreq.png" },
  { name: "FAB", logo: "/banks/fab.png" },
  { name: "Dubai Islamic", logo: "/banks/dib.png" },
];

const BanksCarouselSection: FC<Props> = ({
  heading = "Our Banks in UAE",
  subheading = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  items,
  className,
}) => {
  const data = useMemo(() => (items?.length ? items : defaultItems), [items]);
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 450,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className={`${styles.wrapcarousel} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.h2}>{heading}</Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        <div className={styles.sliderWrap}>
          <Slider ref={sliderRef} {...settings}>
            {data.map((b, idx) => {
              const content = (
                <div className={styles.logoCard}>
                  <Image
                    src={b.logo}
                    alt={b.name}
                    fill
                    className={styles.logoImg}
                    sizes="(max-width: 576px) 45vw, (max-width: 992px) 28vw, 18vw"
                  />
                </div>
              );
              return (
                <div key={idx} className={styles.slide}>
                  {b.href ? (
                    <Link href={b.href} aria-label={b.name}>
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </Slider>
        </div>

        <div className={styles.nav}>
          <Button
            shape="round"
            size="large"
            className={styles.navBtn}
            icon={<LeftOutlined />}
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <Button
            shape="round"
            size="large"
            className={styles.navBtn}
            icon={<RightOutlined />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
    </section>
  );
};

export default BanksCarouselSection;
