"use client";

import { FC } from "react";
import Image from "next/image";
import { Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Props = {
  heading?: string;
  subheading?: string;
  image?: string;          // e.g. "/images/seo-room.jpg" (from public/)
  imageAlt?: string;
  topParagraph?: string;
  midParagraph?: string;
  bullets?: string[];
  bottomParagraph?: string;
  imageHeight?: number;    // px
  className?: string;
};

const SeoImageTextSection: FC<Props> = ({
  heading = "Heading which is used for SEO, will update later",
  subheading = "Vayk by Dacha is a vacation home rental specialist with 17 years of real estate experience paired with a Swiss hospitality excellence. We will maximize your property investment with our short-term rental solutions including full management of your property",
  image = "/images/seo-hero.jpg",
  imageAlt = "Interior photo",
  topParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Lorem sed risus ultricies tristique. In iaculis nunc sed augue lacus viverra vitae congue eu. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus purus. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Nullam eget felis eget nunc lobortis.",
  midParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa",
  bullets = [
    "mpor ut labore et dolore adi incididunt ut labo, sedo eiusmod",
    "Incididunt ut labore et dolore adipiscing sed adipiscing.",
    "mpor ut labore et dolore adi incididunt, sed eiusmod.",
    "ut labore et dolore adipiscing elit",
    "Incididunt ut labore et dolore  incididunt ut labo",
    "mpor ut labore et dolore adi incididunt ut labo, sedo eiusmod",
  ],
  bottomParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa Lorem sed risus ultricies tristique. In iaculis nunc sed augue lacus viverra vitae congue eu. Fringilla phasellus faucibus scelerisque eleifend donec pretium.",
  imageHeight = 300,
  className,
}) => {
  return (
    <section className={`${styles.wrapcontentsection} ${className || ""}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Title level={2} className={styles.h2}>{heading}</Title>
          <Paragraph className={styles.sub}>{subheading}</Paragraph>
        </div>

        {/* Center image */}
        <div className={styles.imageWrap} style={{ height: imageHeight }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 992px) 90vw, 700px"
            priority
          />
        </div>

        {/* Text blocks */}
        <Paragraph className={styles.p}>{topParagraph}</Paragraph>

        <Paragraph className={styles.p}>{midParagraph}</Paragraph>

        {!!bullets.length && (
          <div className={styles.listWrap}>
            <ul className={styles.list}>
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        <Paragraph className={styles.p}>{bottomParagraph}</Paragraph>
      </div>
    </section>
  );
};

export default SeoImageTextSection;
