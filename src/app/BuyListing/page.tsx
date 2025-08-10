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
      <PopularProperties />
      <SearchTrendsSection />
      <LatestBlogSection />
      <RealestateInfoCard
        title="Realestate agency in dubai"
        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        moreDesc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      />
      <GoogleReviewsSection />
      <SubscribeSection />
      <RealEstateFaqSection />
    </div>
  );
}
