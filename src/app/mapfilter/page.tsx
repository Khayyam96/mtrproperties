"use client";

import { useState } from "react";
import SearchFilter from "../../components/Lib/Filter/SearchFilter";
import { MapWithList } from "../../components/Lib/MapWithList/MapWithList";

type FilterValues = {
  purpose: string;
  type: string;
  bedBath: string;
  price: string;
  more: string;
  location: string;
};

export default function MapFilterPage() {
  const [filters, setFilters] = useState<FilterValues>({
    purpose: "Buy",
    type: "Any",
    bedBath: "Any",
    price: "Any",
    more: "Any",
    location: "",
  });

  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleSearch = (values: FilterValues) => {
    setFilters(values);
    setIsMapOpen(true);
  };

  return (
    <div className="map-page">
      <SearchFilter onSearch={handleSearch} />
      <MapWithList
        filters={filters}
        isMapOpen={isMapOpen}
        onToggleMap={setIsMapOpen}
      />
    </div>
  );
}
