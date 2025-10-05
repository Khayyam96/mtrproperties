"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Typography, Button, Segmented, Spin, Empty } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const LuxuryProperties: FC<TProps> = ({ tab, initial, title, subtitle }) => {
  const router = useRouter();

  const categories = useMemo(
    () => (tab?.data ?? []).map((i) => ({ id: i.id, name: i.name })),
    [tab]
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    categories[0]?.id ?? 0
  );
  const [properties, setProperties] = useState<LuxuryItem[]>(initial?.data ?? []);
  const [loading, setLoading] = useState(false);

  // Ensure selected category is initialized when categories arrive/refresh
  useEffect(() => {
    if (!selectedCategoryId && categories.length) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

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

    // If we already have initial data for the first tab and properties are filled, skip fetch.
    if (hasInitialForThisType && properties.length) return;

    void fetchProperties(selectedCategoryId);
  }, [
    selectedCategoryId,
    categories,
    initial,
    properties.length,
    fetchProperties,
  ]);

  return (
    <section className="luxury-properties">
      <Container>
        <div className="luxury-properties__header">
          {title ? (
            <Title level={2} className="luxury-properties__title">
              {title}
            </Title>
          ) : null}

          {subtitle ? (
            <Text className="luxury-properties__subtitle">{subtitle}</Text>
          ) : null}

          <Segmented
            size="large"
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            value={selectedCategoryId}
            onChange={(val) => {
              const id = typeof val === "string" ? Number(val) : (val as number);
              setSelectedCategoryId(id);
            }}
            className="luxury-properties__segmented"
          />
        </div>

        {loading ? (
          <div className="luxury-properties__loading">
            <Spin size="large" />
          </div>
        ) : properties.length === 0 ? (
          <Empty description="No properties found" style={{ padding: 40 }} />
        ) : (
          <Row gutter={[24, 24]} justify="start">
            {properties.map((p) => {
              const coverFile = p.property?.media?.gallery?.[0];
              const cover = coverFile ? `${IMAGE_BASE}${coverFile}` : "/luxury.png";

              const title = p.property?.title ?? "Property Full Name";
              const seg = (p.property?.segment ?? "LUXURY").toUpperCase();
              const slug = p.property?.slug ?? "";

              return (
                <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                  <Link
                    href={`/properties/${encodeURIComponent(slug)}`}
                    className="property-card"
                  >
                    <div className="property-card__media">
                      <Image
                        src={cover}
                        alt={title}
                        fill
                        className="property-card__img"
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                      />
                      <div className="property-card__overlay">
                        <div className="property-card__badge">{seg}</div>
                        <h4 className="property-card__title">{title}</h4>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}

        <div className="luxury-properties__cta">
          <Button
            type="primary"
            size="large"
            icon={<AppstoreOutlined />}
            className="luxury-properties__btn"
            onClick={() => {
              router.push(`/properties/luxury?type=${selectedCategoryId}`);
            }}
          >
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LuxuryProperties;
