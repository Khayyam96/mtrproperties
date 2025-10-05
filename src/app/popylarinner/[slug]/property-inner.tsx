// app/popylarinner/[slug]/property-inner.tsx
"use client";

import { FC, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Typography, Tag, Row, Col, Breadcrumb, Button, Input, Card } from "antd";
import { ArrowLeftOutlined, EnvironmentOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Container } from "@/components/Lib/ProContainer/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import type { PropertyDetail } from "./page";
import wticon from "/public/wt.svg";
import LocationNearby from "./LocationNearby";
import arrow from "/public/blackup.png";

const { Title, Text, Paragraph } = Typography;

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://api.dubaiyachts.com/uploads/properties";

function buildImgUrl(name?: string | null) {
  if (!name) return "";
  if (/^https?:\/\//i.test(name)) return name;
  if (name.startsWith("/uploads/properties/")) {
    return `https://api.dubaiyachts.com${name}`;
  }
  return `${MEDIA_BASE}/${name}`.replace(/([^:]\/)\/+/g, "$1");
}

function formatAED(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000) return Math.round(v / 1_000) + "K";
  return String(v);
}

const renderBeds = (b?: number | null) => {
  if (typeof b !== "number" || Number.isNaN(b)) return "Beds";
  return `${b} Bed${b > 1 ? "s" : ""}`;
};

// === NEW HELPERS ===
function formatRelativeTime(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const nowMs = Date.now();
  let diffSec = Math.floor((nowMs - d.getTime()) / 1000);

  const steps: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (let i = 0; i < steps.length; i++) {
    const [step, u] = steps[i];
    if (Math.abs(diffSec) < step) { unit = u; break; }
    diffSec = Math.round(diffSec / step);
  }
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  return rtf.format(-diffSec, unit);
}

function buildQRCodeUrl(text?: string | null, size = 260) {
  const data = text || "";
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    data
  )}&size=${size}x${size}&margin=0`;
}

type UnitItem = NonNullable<PropertyDetail["units"]>[number];
type UnitTypeItem = NonNullable<UnitItem["types"]>[number];

type Props = { data: PropertyDetail };
type PaymentPlanItem = { label: string; value: string; note?: string; desc?: string };

type WithMedia = { media?: { gallery?: unknown } | null };
function pickGallery(d: unknown): string[] {
  const media = (d as WithMedia | null | undefined)?.media;
  const g = media?.gallery;
  if (Array.isArray(g)) {
    return g
      .map((x) => (typeof x === "string" ? x : typeof x === "number" ? String(x) : ""))
      .filter(Boolean)
      .map((s) => buildImgUrl(s))
      .filter(Boolean) as string[];
  }
  return [];
}

type WithBuildings = { number_of_buildings?: unknown };
function pickNumberOfBuildings(d: unknown): number {
  const nb = (d as WithBuildings | null | undefined)?.number_of_buildings;
  return typeof nb === "number" ? nb : 1;
}

type WithAmenities = { amenities?: unknown };
type WithTranslationAmenities = { translation?: { amenities?: unknown } | null };
function pickAmenities(d: unknown): string[] {
  const fromRoot = (d as WithAmenities | null | undefined)?.amenities;
  const fromTrans = (d as WithTranslationAmenities | null | undefined)?.translation?.amenities;

  const raw: unknown = typeof fromRoot !== "undefined" ? fromRoot : fromTrans;

  if (Array.isArray(raw)) {
    return raw
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

type WithPaymentPlans = {
  translation?: {
    payment_plans?: Array<{ label?: unknown; value?: unknown; note?: unknown; desc?: unknown }>;
  } | null;
};
function pickPaymentPlans(d: unknown): PaymentPlanItem[] {
  const pp = (d as WithPaymentPlans | null | undefined)?.translation?.payment_plans ?? [];
  return pp.map((x) => {
    const label = typeof x.label === "string" ? x.label : String(x.label ?? "");
    const value = typeof x.value === "string" ? x.value : String(x.value ?? "");
    const note =
      typeof x.note === "string"
        ? x.note
        : typeof x.desc === "string"
        ? x.desc
        : undefined;
    return { label, value, note };
  });
}

const PropertyInner: FC<Props> = ({ data }) => {
  useEffect(() => { }, [data]);

  console.log(data, "property-detail-data");
  const images = useMemo(() => {
    const gallery = pickGallery(data);

    const projectImg = data.project?.image_url ? [buildImgUrl(data.project.image_url)] : [];

    const fromTypes =
      data.units?.flatMap((u) =>
        (u.types ?? []).map((t) => (t?.image_url ? buildImgUrl(t.image_url) : ""))
      ).filter(Boolean) as string[] ?? [];

    const all = [...gallery, ...projectImg, ...fromTypes]
      .filter((x): x is string => Boolean(x))
      .filter((v, i, arr) => arr.indexOf(v) === i);

    return all.length ? all : ["/placeholder.jpg"];
  }, [data]);

  const firstUnit = data.units?.[0];
  const propertyType = firstUnit?.property_type?.name_EN ?? data.category ?? "Property";
  const priceFrom = firstUnit?.price_from ? Number(firstUnit.price_from) : undefined;

  const [navMain, setNavMain] = useState<Slider | null>(null);
  const [navThumbs, setNavThumbs] = useState<Slider | null>(null);

  const agentName = data.agent?.name ?? "Our Agent";
  const agentPhone = data.agent?.phone ?? "";
  const agentPhoneClean = agentPhone.replace(/[^\d]/g, "");
  const agentWa = agentPhoneClean ? `https://wa.me/${agentPhoneClean}` : undefined;

  const formatDate = (d?: string | null, full = false) => {
    if (!d) return "—";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "—";
    return full
      ? date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })
      : date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  };

  const paymentPlans: PaymentPlanItem[] = useMemo(() => pickPaymentPlans(data), [data]);

  const amenities = useMemo(() => pickAmenities(data), [data]);

  const unitBlockRef = useRef<HTMLDivElement | null>(null);

  function onAccordionToggle(currentAccordionEl: HTMLElement) {
    const block = unitBlockRef.current;
    if (!block) return;
    const accordions = Array.from(block.querySelectorAll<HTMLElement>(".unit-accordion"));
    accordions.forEach((acc) => {
      const btn = acc.querySelector<HTMLButtonElement>(".ua-header");
      if (acc === currentAccordionEl) {
        const isOpen = acc.classList.toggle("is-open");
        if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      } else {
        acc.classList.remove("is-open");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function parseDateLoose(input?: string | null) {
    if (!input) return null;
    const normalized = input.replace(" ", "T");
    const d = new Date(normalized);
    return isNaN(d.getTime()) ? null : d;
  }

  function getVideoEmbed(url?: string | null) {
    if (!url) return null;
    const u = url.trim();

    const yt = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/.exec(u);
    if (yt) {
      const id = yt[1];
      const src =
        `https://www.youtube.com/embed/${id}` +
        `?controls=0&rel=0&modestbranding=1&playsinline=1&fs=0&disablekb=1` +
        `&autoplay=1&mute=1&loop=1&playlist=${id}`;
      return { kind: "youtube" as const, src, title: "YouTube video" };
    }

    const vm = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u);
    if (vm) {
      const id = vm[1];
      const src = `https://player.vimeo.com/video/${id}?controls=0&autoplay=1&muted=1&loop=1&background=1`;
      return { kind: "vimeo" as const, src, title: "Vimeo video" };
    }

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u)) {
      return { kind: "html5" as const, src: u, title: "Video" };
    }

    return { kind: "iframe" as const, src: u, title: "Video" };
  }

  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => clearTimeout(t);
  }, [images.length]);

  const numberOfBuildings = useMemo(() => pickNumberOfBuildings(data), [data]);

  return (
    <div className="property-inner">
      <Container>
        <div className="topbar">
          <Button
            type="link"
            className="back"
            icon={<ArrowLeftOutlined />}
            onClick={() => history.back()}
          >
            Back to Search
          </Button>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Dubai</Breadcrumb.Item>
            <Breadcrumb.Item>{data.address ? "Location" : "—"}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="status-row">
          {data.is_new_listing && <Tag className="pill pill--new">New Listing</Tag>}
          {data.segment && <Tag className="pill pill--verified">{data.segment}</Tag>}
        </div>

        <Row gutter={[16, 16]} align="top">
          <Col xs={24} lg={14}>
            <div className="main-gallery">
              <Slider
                key={`main-${images.length}`}
                asNavFor={navThumbs ?? undefined}
                ref={(s) => setNavMain(s)}
                arrows={false}
                dots={false}
                infinite={images.length > 1}
                speed={400}
                slidesToShow={1}
                swipeToSlide
                adaptiveHeight
              >
                {images.map((src, i) => (
                  <div key={i} className="main-slide">
                    <Image
                      src={src}
                      alt={`${data.title}-${i}`}
                      fill
                      className="main-img"
                      sizes="(max-width: 991px) 100vw, 60vw"
                      priority={i === 0}
                      loader={({ src }) => src}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>

          {/* THUMBS */}
          <Col xs={0} lg={4}>
            <div className="thumbs-wrap">
              <Slider
                className="thumbs-slider"
                vertical
                verticalSwiping
                slidesToShow={Math.min(4, Math.max(1, images.length))}
                swipeToSlide
                focusOnSelect
                arrows={false}
                dots={false}
                asNavFor={navMain ?? undefined}
                ref={(s) => setNavThumbs(s)}
                infinite={images.length > 4}
              >
                {images.map((src, i) => (
                  <div key={i} className="thumb">
                    <Image
                      src={src}
                      alt={`thumb-${i}`}
                      fill
                      className="thumb-img"
                      sizes="120px"
                      loader={({ src }) => src}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>

          <Col xs={24} lg={6}>
            <div className="agent-cards">
              <div className="agent-header">
                <Image src="/avatar.png" alt={agentName} width={50} height={50} className="agent-image" />
                <div>
                  <p className="agent-text">Contact our agent</p>
                  <p className="agent-name">{agentName}</p>
                </div>
              </div>

              <div className="agent-buttons">
                <Button className="call-btn" href={agentPhone ? `tel:${agentPhone}` : undefined}>
                  <Image src="/phone.png" alt="Call" width={16} height={16} />
                  Call Us
                </Button>

                <Button className="whatsapp-btn" href={agentWa} target="_blank">
                  <Image src="/what.png" alt="Whatsapp" width={16} height={16} />
                  Whatsapp
                </Button>
              </div>

              <div className="agent-form">
                <label htmlFor="pi-name">Name</label>
                <Input id="pi-name" placeholder="eg: John Doe" />

                <label htmlFor="pi-email">Email</label>
                <Input id="pi-email" placeholder="eg: john@email.com" />

                <label htmlFor="pi-phone">Phone Number</label>
                <Input
                  id="pi-phone"
                  addonBefore={
                    <div className="phone-prefix">
                      <Image src="/uae-flag.png" alt="uae" width={20} height={14} />
                      <span className="prefix-text">+971</span>
                    </div>
                  }
                  placeholder="eg: 050123456"
                />

                <label htmlFor="pi-msg">Message</label>
                <Input.TextArea id="pi-msg" placeholder="eg: I want to know about..." rows={3} />

                <Button type="primary" className="submit-btn">
                  Submit
                  <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={19}>
            <div className="price-block">
              <div className="type">{propertyType}</div>
              <div className="prices">
                <Title level={4} className="headline">{data.title}</Title>
                <Title level={2} className="price">
                  {typeof priceFrom === "number"
                    ? `AED ${Number(priceFrom).toLocaleString()}`
                    : "Price on request"}
                </Title>
                <Title level={4} className="headline">
                  {data.sq_ft_from ? `${data.sq_ft_from} sqft` : ""}
                </Title>
              </div>

              <Paragraph className="lead">{data.translation?.subtitle ?? ""}</Paragraph>
              <div className="place">
                <EnvironmentOutlined />
                <span className="text one-line-ellipsis">{data.address ?? "-"}</span>
              </div>
            </div>

            <div className="contact-bar">
              <div className="contact-bar__inner">
                <Text className="contact-bar__text">Get in touch now for more information.</Text>
                <Button className="whatsapp-btn" href={agentWa} target="_blank">
                  Whatsapp
                  <Image src="/what.png" alt="Whatsapp" width={16} height={16} />
                </Button>
              </div>
            </div>

            <div className="developer-info">
              <Card bordered className="dev-card">
                <div className="dev-card__wrap">
                  <div className="dev-card__logo" aria-hidden={!data?.developer?.image_url}>
                    {data?.developer?.image_url ? (
                      <Image
                        src={buildImgUrl(data.developer.image_url)}
                        alt={`${data.developer.name} logo`}
                        fill
                        sizes="96px"
                        style={{ objectFit: "contain" }}
                        priority
                        loader={({ src }) => src}
                      />
                    ) : (
                      <span className="dev-card__logo-fallback">
                        {(data?.developer?.name ?? "D")?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="dev-card__meta">
                    <Text className="dev-card__label">Developer</Text>
                    <Title level={3} className="dev-card__name">
                      {data?.developer?.name ?? "—"}
                    </Title>
                  </div>
                </div>
              </Card>
            </div>

            <Title level={4} className="section-title">Property Information</Title>
            <div className="pi-info">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Property type</div>
                    <div className="pi-info__value">
                      {firstUnit?.property_type?.name_EN ??
                        (data.category ? data.category[0].toUpperCase() + data.category.slice(1) : "—")}
                    </div>
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Delivery Date</div>
                    <div className="pi-info__value">{formatDate(data.handover_at)}</div>
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Sale starts</div>
                    <div className="pi-info__value">{formatDate(data.sale_start_at, true)}</div>
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Location</div>
                    <div className="pi-info__value">{data.address ?? "—"}</div>
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Number of buildings</div>
                    <div className="pi-info__value">{numberOfBuildings}</div>
                  </div>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <div className="pi-info__item">
                    <div className="pi-info__label">Government fee</div>
                    <div className="pi-info__value">4%</div>
                  </div>
                </Col>
              </Row>
            </div>

            <Title level={4} className="section-title">Payment plan</Title>
            <div className="payment-plan">
              {paymentPlans?.length ? (
                <Row gutter={[16, 16]}>
                  {paymentPlans.map((p, idx) => (
                    <Col key={idx} xs={24} sm={12} lg={8}>
                      <div className="pp-card">
                        <div className="pp-label">{p.label}%</div>
                        <div className="pp-value">{p.value}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row>
                  <Col span={24}>
                    <div className="pp-empty">Payment plan will be provided on request.</div>
                  </Col>
                </Row>
              )}
            </div>

            <Title level={4} className="section-title">Amenities</Title>
            <div className="amenities" role="list">
              <div className="amenities-list">
                {amenities.length ? (
                  amenities.map((label, idx) => (
                    <div className="amenity-chip" role="listitem" key={idx}>
                      <span className="amenity-dot" aria-hidden />
                      <span className="amenity-label">{label}</span>
                    </div>
                  ))
                ) : (
                  <div className="amenities-empty">Amenities will be provided soon.</div>
                )}
              </div>
            </div>

            <Title level={4} className="section-title">Units from developer</Title>
            {(data.units?.length ?? 0) === 0 ? (
              <div className="unit-empty">No units have been provided yet.</div>
            ) : (
              <div className="unit-block" role="list" ref={unitBlockRef}>
                <div className="unit-category">
                  {firstUnit?.property_type?.name_EN ?? "Apartment"}
                </div>

                {(data.units ?? []).map((u, idx) => {
                  const defaultOpen = idx === 0;
                  const pf = u.price_from ? Number(u.price_from) : undefined;
                  const rows: (UnitTypeItem | undefined)[] =
                    u.types && u.types.length ? u.types : [undefined];

                  return (
                    <div className={`unit-accordion ${defaultOpen ? "is-open" : ""}`} key={`unit-${u.id}`}>
                      <button
                        type="button"
                        className="ua-header"
                        aria-expanded={defaultOpen ? "true" : "false"}
                        onClick={(e) => {
                          const root = e.currentTarget.parentElement as HTMLElement;
                          onAccordionToggle(root);
                        }}
                      >
                        <span className="ua-title">{renderBeds(u.room_count)}</span>

                        <a
                          className="ua-inquire"
                          href={agentWa}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Image src={wticon} alt="WhatsApp" />
                          <span>Inquire</span>
                        </a>

                        <Image
                          className="ua-chevron-img"
                          src={arrow}
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden
                          priority={false}
                        />
                      </button>

                      <div className="ua-body">
                        <div className="ua-grid ua-grid--head">
                          <div>Floor plan</div>
                          <div>Layout type</div>
                          <div>Price</div>
                          <div>Size (sqft)</div>
                        </div>

                        {rows.map((t, rIdx) => (
                          <div className="ua-grid ua-grid--row" key={`${u.id}-${rIdx}`}>
                            {/* Floor plan */}
                            <div className="ua-plan">
                              <div className="ua-plan__img">
                                {t?.image_url ? (
                                  <Image
                                    src={buildImgUrl(t.image_url)}
                                    alt={t?.label ? `Plan - ${t.label}` : "Floor plan"}
                                    fill
                                    sizes="140px"
                                    style={{ objectFit: "cover" }}
                                    loader={({ src }) => src}
                                  />
                                ) : (
                                  <span className="ua-plan__placeholder">—</span>
                                )}
                              </div>
                            </div>

                            {/* Layout type */}
                            <div className="ua-cell ua-type">
                              <div className="ua-type__name">
                                {t?.label || (u.property_type?.name_EN ?? "Type")}
                              </div>
                            </div>

                            <div className="ua-cell ua-price">
                              {typeof pf === "number" ? <>from {formatAED(pf)} AED</> : "Price on request"}
                            </div>

                            <div className="ua-cell ua-size">
                              {t?.sq_ft ? String(t.sq_ft) : (u.sq_ft_to ?? u.sq_ft_from ?? "—")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Title level={4} className="section-title">Project Timeline</Title>
            <div className="timeline">
              {Array.isArray(data.project?.timeline) && (data.project?.timeline?.length ?? 0) > 0 ? (
                <ul className="tl-list" role="list">
                  {(data.project!.timeline ?? [])
                    .slice()
                    .sort((a, b) => {
                      const da = parseDateLoose(a.date)?.getTime() ?? 0;
                      const db = parseDateLoose(b.date)?.getTime() ?? 0;
                      return da - db;
                    })
                    .map((it, idx, arr) => {
                      const dt = parseDateLoose(it.date);
                      const today = new Date();
                      const isDone = !!dt && dt.getTime() <= today.getTime();

                      const labelMap: Record<string, string> = {
                        announcement: "Project announcement",
                        expected_booking_date: "Booking Started",
                        construction_started: "Construction Started",
                        expected_completion: "Expected Completion",
                      };

                      const dateText = dt
                        ? dt.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: it.type === "announcement" ? undefined : "numeric",
                          })
                        : "—";

                      const isLast = idx === arr.length - 1;

                      return (
                        <li
                          key={`${it.type}-${it.date}-${idx}`}
                          className={`tl-item ${isDone ? "is-done" : "is-pending"} ${isLast ? "is-last" : ""}`}
                          role="listitem"
                        >
                          <div className="tl-line" aria-hidden />
                          <div className="tl-dot" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                              <circle cx="8" cy="8" r="8" />
                              {isDone && (
                                <path
                                  d="M4 8.5l2.2 2.2L12 4.9"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}
                            </svg>
                          </div>
                          <div className="tl-content">
                            <div className="tl-title">{labelMap[it.type] ?? it.type}</div>
                            <div className="tl-date">{dateText}</div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <div className="timeline-empty">Timeline will be provided soon.</div>
              )}
            </div>

            <Title level={4} className="section-title">About</Title>
            <p>{data.translation?.description}</p>

            <Title level={4} className="section-title">Regulatory information</Title>
            {/* ===== REGULATORY SECTION (NEW) ===== */}
            <div className="regulatory-info">
              {data?.regulatory_info ? (
                <>
                  {/* LEFT: table */}
                  <div className="reg-table" role="table" aria-label="Regulatory information">
                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">DLD Permit Number:</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.permit_number ?? "—"}</div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">Broker License</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.broker_license ?? "—"}</div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">RERA</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.rera ?? "—"}</div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">DED</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.ded ?? "—"}</div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">Listed</div>
                      <div className="reg-cell" role="cell">
                        {formatRelativeTime(data.regulatory_info.listed_at)}
                      </div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">Zone name</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.zone_name ?? "—"}</div>
                    </div>

                    <div className="reg-row" role="row">
                      <div className="reg-cell reg-cell--label" role="cell">Agency name</div>
                      <div className="reg-cell" role="cell">{data.regulatory_info.agency_name ?? "—"}</div>
                    </div>
                  </div>

                  {/* RIGHT: QR */}
                  <div className="reg-qr">
                    <div className="reg-qr__title">Scan to verify this property listing</div>
                    <div className="reg-qr__box">
                      <Image
                        src={buildQRCodeUrl(
                          data.regulatory_info.link ||
                          (typeof window !== "undefined" ? window.location.href : "")
                        )}
                        alt="Verify listing QR"
                        width={260}
                        height={260}
                        loading="lazy"
                        // external src üçün custom loader
                        loader={({ src }) => src}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="reg-empty">Regulatory information will be provided soon.</div>
              )}
            </div>
            {/* ===== END REGULATORY SECTION ===== */}

            <Title level={4} className="section-title">Video tour</Title>
            {data.video_url ? (
              <div className="video_tour">
                {(() => {
                  const v = getVideoEmbed(data.video_url);
                  if (!v) return null;

                  if (v.kind === "html5") {
                    return (
                      <div className="video-wrap">
                        <video
                          className="video-el"
                          src={v.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={v.title}
                          controlsList="nodownload noplaybackrate noremoteplayback"
                          disablePictureInPicture
                        />
                      </div>
                    );
                  }

                  return (
                    <div className="video-wrap">
                      <iframe
                        className="video-el"
                        src={v.src}
                        title={v.title}
                        loading="lazy"
                        allow="autoplay; encrypted-media; clipboard-write; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen={false}
                      />
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="video_tour video-empty">Video will be provided soon.</div>
            )}

            <LocationNearby
              address={data.address}
              center={[Number(data.lat), Number(data.long)]}
              landmarks={data.landmarks}
            />
          </Col>
        </Row>

        <h1 className="txt-center">Similar Properties</h1>
      </Container>
    </div>
  );
};

export default PropertyInner;
