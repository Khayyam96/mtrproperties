"use client";

import React, { FC, useRef } from "react";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import type SliderType from "react-slick";
import { Container } from "@/components/Lib/ProContainer/Container";
import arrowRight from '../../../public/arrow-right-purple.svg'
import arrowLeft from '../../../public/arrow-left-purple.svg'
import { RightOutlined } from "@ant-design/icons";
import "./index.scss";
import {
  LastBlogResponse,
  LastBlogTranslation,
  LastBlogCategory,
} from "@/models/LastBlog.model";

const { Title, Text } = Typography;

type TProps = { data: LastBlogResponse };

const IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties/";
type LangCode = "EN" | "RU" | "DE" | "FR" | "ES" | "UAE";
const PREFERRED_LANGS: readonly LangCode[] = ["EN", "RU", "DE", "FR", "ES", "UAE"] as const;

/** Tarixi UTC-də formatla ki, gün dəyişməsin (Oct 4 -> Oct 4). */
function formatDateUTC(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

function pickFromArray(
  translations?: LastBlogTranslation[],
  preferred: readonly LangCode[] = PREFERRED_LANGS
): LastBlogTranslation | undefined {
  if (!translations?.length) return undefined;
  for (const lang of preferred) {
    const found = translations.find((t) => t.lang === lang);
    if (found) return found;
  }
  return translations[0];
}

/** Həm köhnə (name_EN, ...) həm yeni (name) struktur üçün kateqoriya adı. */
function getCategoryNameFlexible(
  cat?: Partial<LastBlogCategory> & { name?: string },
  lang: LangCode = "EN"
): string {
  if (!cat) return "Blog";
  if (cat.name) return cat.name; // yeni backend

  const map: Record<LangCode, keyof LastBlogCategory> = {
    EN: "name_EN",
    RU: "name_RU",
    DE: "name_DE",
    FR: "name_FR",
    ES: "name_ES",
    UAE: "name_UAE",
  };

  const key = map[lang];
  const val = (cat as Pick<LastBlogCategory, typeof key>)[key];
  return (val as unknown as string) || (cat as Partial<LastBlogCategory>).name_EN || "Blog";
}

/** Həm `translation` (obyekt), həm də `translations` (array) üçün çevik seçici. */
type MaybeTranslations = {
  translation?: LastBlogTranslation;
  translations?: LastBlogTranslation[];
};

function pickTranslationFlexible(item: MaybeTranslations): LastBlogTranslation | undefined {
  if (item?.translation) return item.translation;
  return pickFromArray(item?.translations);
}

export const LatestBlogSection: FC<TProps> = ({ data }) => {
  const sliderRef = useRef<SliderType | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1.1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="latest-blog-section">
      <Container>
        <div className="blog-header">
          <div className="left">
            <Title level={3}>Latest Blog</Title>
            <Link className="see-all" href="/blog">
              See all <Image width={20} height={20} src={arrowRight} alt="arrow"/>
            </Link>
          </div>

          <div className="slider-nav">
            <button
              type="button"
              className="nav left"
              aria-label="Previous"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <Image src={arrowLeft} alt="Previous" width={30} height={30} />
            </button>

            <button
              type="button"
              className="nav right"
              aria-label="Next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <Image src={arrowRight} alt="Next" width={30} height={30} />
            </button>
          </div>
        </div>

        <div className="slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {data?.data?.map((item) => {
              const chosen = pickTranslationFlexible({
                translation: (item as MaybeTranslations).translation,
                translations: (item as MaybeTranslations).translations,
              });
              const lang: LangCode = (chosen?.lang as LangCode) ?? "EN";

              const title: string =
                (chosen?.title?.trim() ||
                  chosen?.subtitle?.trim() ||
                  getCategoryNameFlexible(item.category as Partial<LastBlogCategory> & { name?: string }, lang) ||
                  "Blog") as string;

              const imagePath = item.main_image
                ? `${IMAGE_BASE}${item.main_image}`
                : "/placeholder.png";

              const dateStr = formatDateUTC(item.created_at);
              const hasSlug = Boolean(item.slug);
              const href = hasSlug ? `/blog/${item.slug}` : "#";

              const CardInner = (
                <article className="blog-card">
                  <div className="image">
                    <Image
                      src={imagePath}
                      alt={title}
                      width={400}
                      height={310}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: 310, objectFit: "cover" }}
                    />
                  </div>

                  <div className="content">
                    <Title level={5} ellipsis={{ rows: 2 }}>
                      {title}
                    </Title>

                    {/* created_at — UTC formatında göstərilir */}
                    <div className="meta">
                      <Text type="secondary">{dateStr}</Text>
                    </div>

                    {hasSlug ? (
                      <span className="read-more">
                        Read more <RightOutlined />
                      </span>
                    ) : (
                      <span
                        className="read-more disabled"
                        aria-disabled="true"
                        title="Slug yoxdur"
                      >
                        Read more{" "}
                        <Image src="/nexticon.png" alt="Next" width={16} height={16} />
                      </span>
                    )}
                  </div>
                </article>
              );

              return (
                <div key={item.id} className="blog-slide">
                  {hasSlug ? (
                    <Link href={href} className="card-link">
                      {CardInner}
                    </Link>
                  ) : (
                    CardInner
                  )}
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default LatestBlogSection;
