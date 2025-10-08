"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Typography, Segmented, Spin, Empty, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { Container } from "@/components/Lib/ProContainer/Container";
import type { LuxuryTabResponse } from "@/models/LuxuryTab.model";
import type { LuxuryListResponse, LuxuryItem } from "@/models/LuxuryCard.mode";
import { fetchAPI } from "@/utils";
import "./index.scss";

const { Title, Text } = Typography;

type TProps = {
  tab: LuxuryTabResponse;
  initial?: LuxuryListResponse;
  title?: string;
  subtitle?: string;
};

const IMAGE_BASE = "https://api.dubaiyachts.com/uploads/properties/";
const VISIBLE_COUNT = 4;

const LuxuryProperties: FC<TProps> = ({ tab, initial, title, subtitle }) => {
  // const router = useRouter();

  const categories = useMemo(
    () => (tab?.data ?? []).map((i) => ({ id: i.id, name: i.name })),
    [tab]
  );

  const [visibleIds, setVisibleIds] = useState<number[]>(
    () => categories.slice(0, VISIBLE_COUNT).map((c) => c.id)
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    categories[0]?.id ?? 0
  );

  const [properties, setProperties] = useState<LuxuryItem[]>(initial?.data ?? []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const firstFour = categories.slice(0, VISIBLE_COUNT).map((c) => c.id);
    if (
      visibleIds.length === 0 ||
      !visibleIds.every((id) => categories.some((c) => c.id === id))
    ) {
      setVisibleIds(firstFour);
    }
    if (!selectedCategoryId && categories.length) {
      setSelectedCategoryId(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const visibleCats = useMemo(
    () =>
      visibleIds
        .map((id) => categories.find((c) => c.id === id))
        .filter(Boolean) as { id: number; name: string }[],
    [visibleIds, categories]
  );
  const overflowCats = useMemo(
    () => categories.filter((c) => !visibleIds.includes(c.id)),
    [categories, visibleIds]
  );

  const fetchProperties = useCallback(async (property_type_id: number) => {
    setLoading(true);
    try {
      const res = await fetchAPI<LuxuryListResponse>(
        `/client/properties/luxury?property_type_id=${property_type_id}`
      );
      setProperties(res.data ?? []);
    } catch (err) {
      console.error("Error fetching luxury properties:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;
    const firstId = categories[0]?.id ?? 0;
    const hasInitialForThisType =
      Boolean(initial?.data?.length) && selectedCategoryId === firstId;
    if (hasInitialForThisType && properties.length) return;
    void fetchProperties(selectedCategoryId);
  }, [selectedCategoryId, categories, initial, properties.length, fetchProperties]);

  // Segmented options — LABEL və VALUE həmişə STRING
  const segmentedOptions = useMemo(
    () =>
      visibleCats.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
    [visibleCats]
  );

  // Segmented üçün aktiv dəyər (STRING)
  const isSelectedVisible = visibleCats.some((c) => c.id === selectedCategoryId);
  const segmentedValue: string =
    isSelectedVisible
      ? String(selectedCategoryId)
      : (visibleCats[0] ? String(visibleCats[0].id) : "");

  // Dropdown menyusu (OVERFLOW)
  const overflowMenu: MenuProps = {
    items: overflowCats.map((c) => ({ key: String(c.id), label: c.name })),
    selectable: true,
    selectedKeys: [String(selectedCategoryId)],
    onClick: ({ key }) => {
      const id = Number(key);
      // seçilən overflow item-i 1-ci pilə gətir
      setVisibleIds((prev) => {
        const withoutId = prev.filter((x) => x !== id);
        const next = [id, ...withoutId.slice(0, VISIBLE_COUNT - 1)];
        return next.length >= VISIBLE_COUNT
          ? next.slice(0, VISIBLE_COUNT)
          : [
            ...next,
            ...categories
              .map((c) => c.id)
              .filter((x) => !next.includes(x))
              .slice(0, VISIBLE_COUNT - next.length),
          ];
      });
      setSelectedCategoryId(id);
    },
  };

  return (
    <section className="luxury-properties">
      <Container>
        <div className="luxury-properties__header">
          {title ? <Title level={2} className="luxury-properties__title">{title}</Title> : null}
          {subtitle ? <Text className="luxury-properties__subtitle">{subtitle}</Text> : null}

          <div className="luxury-segmented__wrap">
            <Segmented
              key={visibleIds.join(",")}         // sıradakı dəyişikliklərdə remount
              size="large"
              options={segmentedOptions}
              value={segmentedValue}             // həmişə string
              onChange={(val) => {
                const id = parseInt(String(val), 10);
                if (!Number.isNaN(id)) setSelectedCategoryId(id);
              }}
              className="luxury-segmented"
            />


            {overflowCats.length > 0 && (
              <Dropdown
                menu={overflowMenu}
                trigger={["click"]}
                overlayClassName="luxury-segmented__dropdown"
              >
                <button
                  type="button"
                  className="luxury-segmented__more"
                  aria-haspopup="menu"
                >
                 
                  <span>Other types</span>
                   <Image
                    src="/blackup.png"   
                    alt=""
                    width={16}
                    height={16}
                    className="luxury-segmented__more-icon"
                    aria-hidden
                  />
                </button>
              </Dropdown>
            )}

          </div>
        </div>

        {loading ? (
          <div className="luxury-properties__loading"><Spin size="large" /></div>
        ) : properties.length === 0 ? (
          <Empty description="No properties found" style={{ padding: 40 }} />
        ) : (
          <Row gutter={[24, 24]} justify="start">
            {properties.map((p) => {
              const coverFile = p.property?.media?.gallery?.[0];
              const cover = coverFile ? `${IMAGE_BASE}${coverFile}` : "/luxury.png";
              const titleTxt = p.property?.title ?? "Property Full Name";
              const seg = (p.property?.segment ?? "LUXURY").toUpperCase();
              const slug = p.property?.slug ?? "";

              return (
                <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                  <Link href={`/properties/${encodeURIComponent(slug)}`} className="property-card">
                    <div className="property-card__media">
                      <Image
                        src={cover}
                        alt={titleTxt}
                        fill
                        className="property-card__img"
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                      />
                      <div className="property-card__overlay">
                        <div className="property-card__badge">{seg}</div>
                        <h4 className="property-card__title">{titleTxt}</h4>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}

        {/* <div className="luxury-properties__cta">
          <Button
            type="primary"
            size="large"
            icon={<AppstoreOutlined />}
            className="luxury-properties__btn"
            onClick={() => router.push(`/properties/luxury?type=${selectedCategoryId}`)}
          >
            View More
          </Button>
        </div> */}
      </Container>
    </section>
  );
};

export default LuxuryProperties;
