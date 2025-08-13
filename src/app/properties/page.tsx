"use client";

import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import SearchFilter from "../../components/Lib/Filter/SearchFilter";
import GoogleReviewsSection from "../Home/GoogleReviewsSection";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import SearchTrendsSection from "../Home/SearchTrendsSection";
import PopularProperties from "./PopularProperties";
import PropertiesSection from "./PropertiesSection";
import LatestBlogSection from "../Home/LatestBlogSection";

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
    </div>
  );
}
