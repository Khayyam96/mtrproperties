"use client";

import SearchFilter from "../../components/Lib/Filter/SearchFilter";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import SearchTrendsSection from "../Home/SearchTrendsSection";
import PopularProperties from "./PopularProperties";
import PropertiesSection from "./PropertiesSection";

export default function BuyListing() {
  const handleSearch = (values: any) => {
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
