import HeroSection from "./Home/HeroSection"
import ProductSection from "./Home/ProductList";
import MortgageCalculator from "./Home/MortgageCalculator";
import LuxuryProperties from "./Home/LuxuryProperties";
import ContactAgentSection from "./Home/ContactAgentSection";
import ProjectDubai from "./Home/ProjectDubai";
import StatsSection from "./Home/StatsSection";
import AboutSection from "./Home/AboutSection";
import SearchTrendsSection from "./Home/SearchTrendsSection";
import LatestBlogSection from "./Home/LatestBlogSection";
import RealEstateFaqSection from "./Home/RealEstateFaqSection";
import { GetDiscountSection } from "./Home/GetDiscountSection";
import { TrendingProjectsSection } from "./Home/TrendingProjectsSection";
import { PremiumLandSection } from "./Home/PremiumLandSection";
import CommissionSection from "./Home/CommissionSection";
import { MostPopularPlacesSection } from "./Home/MostPopularPlacesSection";
import { GoogleReviewsSection } from "./Home/GoogleReviewsSection";
import RealestateInfoCard from "./Home/RealestateInfoCard";
import { IReviewResp } from "@/models/Review.model";
import { fetchAPI } from "@/utils";
import { FaqListResponse } from "@/models/Faq.model";
import { Partner } from "@/models/Partner.model";
import { ClientMostPopularListResponse } from "@/models/MostPopular.model";
import { LastBlogListResponse } from "@/models/LastBlog.mode";
import "../app/page.scss";
import { OffPlanListResponse } from "@/models/OffPlan.model";
import { HeroBanner } from "@/models/HeroBanner.model";
import { RealEstate } from "@/models/RealEstate.model";

export default async function Home() {

  const reviewData = await fetchAPI<IReviewResp>('/client/reviews')
  const faqData = await fetchAPI<FaqListResponse>('/client/faq')
  const partneryData = await fetchAPI<Partner>('/client/forms/block/active')
  const popularPlacesRes = await fetchAPI<ClientMostPopularListResponse>('/client/popularPlaces');
  const blogRes = await fetchAPI<LastBlogListResponse>('/client/blogPosts/latest')
  const offPlanRes = await fetchAPI<OffPlanListResponse>("/off-plan-new");
  const heroBannerRes = await fetchAPI<HeroBanner>("/hero/web");
  const realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active")

  return (
    <div className="home-page">
      <main>
        <HeroSection data={heroBannerRes} />
        <ProjectDubai data={offPlanRes.data} />
        <GetDiscountSection />
        <ProductSection />
        <MortgageCalculator />
        <TrendingProjectsSection />
        <PremiumLandSection />
        <StatsSection />
        <CommissionSection />
        <LuxuryProperties />
        <AboutSection />
        <ContactAgentSection data={partneryData} />
        <MostPopularPlacesSection data={popularPlacesRes.items} />
        <SearchTrendsSection />
        <LatestBlogSection data={blogRes} />
        <RealestateInfoCard data={realestateRes} />
        <GoogleReviewsSection data={reviewData} />
        <RealEstateFaqSection data={faqData} />
      </main>
    </div>
  );
}
