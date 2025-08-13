"use client";

import { useMemo, useState, useEffect, type FC } from "react";
import { Select, Typography, Divider, Row, Col } from "antd";
import { properties } from "@/data/propertiesMap";
import { LeafletMap } from "./LeafletMap";
import { PropertyListCard } from "./PropertyListCard";
import "./index.scss";
import Image from "next/image";

const { Option } = Select;
const { Text, Title } = Typography;

type Filters = {
  purpose: string;
  type: string;
  bedBath: string;
  price: string;
  more: string;
  location: string;
};

type Props = {
  filters: Filters;
  isMapOpen: boolean;
  onToggleMap: (open: boolean) => void;
};

const LeafletPreloader: FC = () => {
  useEffect(() => {
    import("react-leaflet");
    import("leaflet");
    import("leaflet.markercluster");
    import("react-leaflet-markercluster");
  }, []);
  return null;
};

export const MapWithList: FC<Props> = ({ filters, isMapOpen, onToggleMap }) => {
  const [sort, setSort] = useState<"newest" | "low" | "high">("newest");
  const [activeId, setActiveId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return properties
      .filter((p) => (filters.purpose ? p.purpose === filters.purpose : true))
      .filter((p) => (filters.type !== "Any" ? p.type === filters.type : true))
      .filter((p) => {
        if (filters.bedBath === "Any") return true;
        const n = Number(filters.bedBath);
        return p.bedrooms >= n && p.bathrooms >= n;
      })
      .filter((p) => {
        if (filters.price === "Any") return true;
        if (filters.price === "Below 500K") return p.price < 500_000;
        if (filters.price === "500K - 1M") return p.price >= 500_000 && p.price <= 1_000_000;
        return p.price > 1_000_000;
      })
      .filter((p) =>
        filters.more === "Any" ? true : filters.more === "Furnished" ? p.furnished : !p.furnished
      )
      .filter((p) =>
        filters.location ? p.locationName.toLowerCase().includes(filters.location.toLowerCase()) : true
      );
  }, [filters]);

  const sorted = useMemo(() => {
    if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
    return [...filtered].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [filtered, sort]);

  const collapsed = !isMapOpen || sorted.length === 0;

  const titleText = `${filters.type !== "Any" ? filters.type + "s" : "Properties"} for ${
    filters.purpose === "Rent" ? "Rent" : "Buy"
  }${filters.location ? ` in ${filters.location}` : ""}`;

  const gridWhenClosed = { xs: 24, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }; // 4 sütun
  const gridWhenOpen   = { xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 }; // 2 sütun

  const handleToggleMap = () => {
    if (!isMapOpen && sorted.length === 0) return;
    onToggleMap(!isMapOpen);
  };

  const handleCardClick = (id: number) => {
    setActiveId(id);
    if (!isMapOpen) onToggleMap(true); 
  };

  return (
    <div className={`map-with-list ${collapsed ? "collapsed" : ""}`}>
      <LeafletPreloader />

      <div className="map-column">
        <LeafletMap items={sorted} isVisible={!collapsed} activeId={activeId} />
        <button className="exit-map" onClick={() => onToggleMap(false)}>Exit Map</button>
      </div>

      <div className="list-column">
        <div className="list-toolbar">
          <a className="return-link" onClick={handleToggleMap}>
            <Image
                src="/view-grid.png"
                alt="Back"
                width={20}
                height={20}
                style={{ marginRight: 8, verticalAlign: "middle" }}
            />
            {isMapOpen ? "Return to List View" : "Show Map View"}
          </a>
          <div className="sort-wrap">
            <Text className="sort-txt">Sort by:&nbsp;</Text>
            <Select value={sort} onChange={(v) => setSort(v)} size="middle" style={{ minWidth: 180 }}>
              <Option value="newest">Newest</Option>
              <Option value="low">Price: Low to High</Option>
              <Option value="high">Price: High to Low</Option>
            </Select>
          </div>
        </div>

        <Title level={4} className="list-title">{titleText}</Title>
        

        <Row gutter={[16, 16]}>
          {sorted.map((p) => (
            <Col key={p.id} {...(collapsed ? gridWhenClosed : gridWhenOpen)}>
              <PropertyListCard
                item={p}
                active={activeId === p.id}
                onClick={() => handleCardClick(p.id)}
              />
            </Col>
          ))}
          {sorted.length === 0 && (
            <Col span={24}><div className="empty-note">No results found. Try adjusting filters.</div></Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default MapWithList;
