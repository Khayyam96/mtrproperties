"use client";

import SearchFilter from "../../components/Lib/Filter/SearchFilter";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import SearchTrendsSection from "../Home/SearchTrendsSection";
import PopularProperties from "./PopularProperties";
import PropertiesSection from "./PropertiesSection";

export default function BuyListing() {
  interface SearchFilterValues {
    location?: string;
    priceMin?: number;
    priceMax?: number;
    bedrooms?: number;
    [key: string]: unknown;
  }

  const handleSearch = (values: SearchFilterValues) => {
    console.log("Searching with filters:", values);
  };

  return (
    <div className="buylisting-page">
        <SearchFilter onSearch={handleSearch} />
        <PropertiesSection />
        <PopularProperties/>
        <SearchTrendsSection/>
        <RealEstateFaqSection/>
    </div>
  );
}
