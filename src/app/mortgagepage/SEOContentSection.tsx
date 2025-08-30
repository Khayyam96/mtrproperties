"use client";

import { FC, useMemo } from "react";
import { Typography, Divider } from "antd";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

type Section = {
  heading: string;
  paragraphs?: string[];     // Heading-dən sonra gələn paraqraflar
  bullets?: string[];        // İstəyə görə maddə-lik
  trailing?: string[];       // Bullet-lərdən sonra əlavə paraqraflar
};

type Props = {
  top?: Section;             // 1-ci blok (bənövşəyi başlıq)
  bottom?: Section;          // 2-ci blok
  className?: string;
};

const defaults: Required<Props> = {
  top: {
    heading: "Heading for the SEO which will be a long heading",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Lorem sed risus ultricies tristique. In iaculis nunc sed augue lacus viverra vitae congue eu. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus purus. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Nullam eget felis eget nunc lobortis.",
    ],
    bullets: [],
    trailing: [],
  },
  bottom: {
    heading: "Heading for the SEO",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Lorem sed risus ultricies tristique. In iaculis nunc sed augue lacus viverra vitae congue eu. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Felis eget nunc lobortis mattis aliquam faucibus purus. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Nullam eget felis eget nunc lobortis.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet.",
    ],
    bullets: [
      "mpor incididunt ut labore et dolore adli incididunt ut labo, sedo eiusmod tempor",
      "mpor incididunt ut labore et dolore adipiscing sed adipiscing elit, sedo eiusmod tempor",
      "mpor incididunt ut labore et dolore adli incididunt, sed eiusmod temporadipiscing elit",
      "mpor incididunt ut labore et dolore adipiscing elit",
      "mpor incididunt ut labore et dolore incididunt ut labo",
    ],
    trailing: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa",
    ],
  },
  className: "",
};

const SEOContentSection: FC<Props> = ({ top, bottom, className }) => {
  const data = useMemo(
    () => ({
      top: top ?? defaults.top,
      bottom: bottom ?? defaults.bottom,
    }),
    [top, bottom]
  );

  return (
    <section className={`${styles.wrapcontent} ${className || ""}`}>
      <div className={styles.container}>
        {/* Üst blok – bənövşəyi heading */}
        <div className={styles.block}>
          <Title level={2} className={`${styles.h2} ${styles.purple}`}>
            {data.top.heading}
          </Title>
          {data.top.paragraphs?.map((p, i) => (
            <Paragraph key={i} className={styles.p}>
              {p}
            </Paragraph>
          ))}
        </div>

        <Divider className={styles.divider} />

        {/* Alt blok – heading + bullets */}
        <div className={styles.block}>
          <Title level={2} className={styles.h2}>
            {data.bottom.heading}
          </Title>

          {data.bottom.paragraphs?.map((p, i) => (
            <Paragraph key={`bp-${i}`} className={styles.p}>
              {p}
            </Paragraph>
          ))}

          {!!data.bottom.bullets?.length && (
            <ul className={styles.list}>
              {data.bottom.bullets.map((b, i) => (
                <li key={`bl-${i}`}>{b}</li>
              ))}
            </ul>
          )}

          {data.bottom.trailing?.map((p, i) => (
            <Paragraph key={`bt-${i}`} className={styles.p}>
              {p}
            </Paragraph>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;
