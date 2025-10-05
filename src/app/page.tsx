
import { fetchAPI } from "@/utils";
import HeroSection from "./Home/HeroSection"
import { HeroBanner } from "@/models/HeroBanner.model";
import ProjectDubai from "./Home/ProjectDubai";
import { OffPlanListResponse } from "@/models/OffPlan.model";
import ProductSection from "./Home/ProductList";
import { GetDiscountSection } from "./Home/GetDiscountSection";
import MortgageCalculator from "./Home/MortgageCalculator";
import { TrendingProjectsSection } from "./Home/TrendingProjectsSection";
import { PremiumLandSection } from "./Home/PremiumLandSection";
import StatsSection from "./Home/StatsSection";
import { LandPropertiesResponse } from "@/models/LandProperties.model";
import CommissionSection from "./Home/CommissionSection";
import LuxuryProperties from "./Home/LuxuryProperties";
import AboutSection from "./Home/AboutSection";
import { LandProjectResponse } from "@/models/LatesProject.model";
import { MostPopularPlacesSection } from "./Home/MostPopularPlacesSection";
import { MostTrendingResponse } from "@/models/MostTrending.model";
import { LuxuryTabResponse } from "@/models/LuxuryTab.model";
import { MostPopularResponse } from "@/models/MostPopular.model";
import SearchTrendsSection from "./Home/SearchTrendsSection";
import LatestBlogSection from "./Home/LatestBlogSection";
import RealestateInfoCard from "./Home/RealestateInfoCard";
import { RealEstate } from "@/models/RealEstate.model";
import { GoogleReviewsSection } from "./Home/GoogleReviewsSection";
import { ReviewResponse } from "@/models/Review.model";
import RealEstateFaqSection from "./Home/RealEstateFaqSection";
import { FaqResponse } from "@/models/Faq.model";
import ContactAgentSection from "./Home/ContactAgentSection";
import { LastBlogResponse } from "@/models/LastBlog.model";
import { LuxuryListResponse } from "@/models/LuxuryCard.mode";
import "../app/page.scss";
import { SectionKey, SectionTitleResponse } from "@/models/SectionTitle.mode";

export default async function Home() {

  const sectionContent = await fetchAPI<SectionTitleResponse>("/client/sections");

  const offPlanSection = sectionContent.find(
    (s) => s.key === SectionKey.OFF_PLAN || s.key === "OFF_PLAN"
  );

  const latestProjectsSection = sectionContent.find(
    (s) => s.key === SectionKey.LATEST_PROJECTS || s.key === "LATEST_PROJECTS"
  );

  const mostTrendingSection = sectionContent.find(
    (s) => s.key === SectionKey.MOST_TRENDING_PROJECTS || s.key === "MOST_TRENDING_PROJECTS"
  );

  const landSection = sectionContent.find(
    (s) => s.key === SectionKey.LAND || s.key === "LAND"
  );

  const maximizeSection = sectionContent.find(
    (s) => s.key === SectionKey.MAXIMIZE_COMMISSION || s.key === "MAXIMIZE_COMMISSION"
  );

  const luxurySection = sectionContent.find(
    (s) => s.key === SectionKey.LUXURY_PROPERTIES || s.key === "LUXURY_PROPERTIES"
  );
  const aboutSection = sectionContent.find(
    (s) => s.key === SectionKey.ABOUT_MTR_PROPERTIES || s.key === "ABOUT_MTR_PROPERTIES"
  );

  const popularplaceSection = sectionContent.find(
    (s) => s.key === SectionKey.POPULAR_PLACES || s.key === "POPULAR_PLACES"
  );

  const heroBannerRes = await fetchAPI<HeroBanner>("/client/hero-banner");
  const offPlanRes = await fetchAPI<OffPlanListResponse>("/client/properties/off-plan");
  const landPropertiesRes = await fetchAPI<LandPropertiesResponse>("/client/properties/land");
  const latesProject = await fetchAPI<LandProjectResponse>("/client/properties/latest-project");
  const mostTrending = await fetchAPI<MostTrendingResponse>("/client/most-trending");
  const luxuryTab = await fetchAPI<LuxuryTabResponse>("/shared/property-types");
  const mostPopular = await fetchAPI<MostPopularResponse>("/client/landmarks?is_most_popular=true");
  const blogRes = await fetchAPI<LastBlogResponse>('/client/blogs')
  const realestateRes = await fetchAPI<RealEstate>("/client/real-estate-agency")
  const reviewData = await fetchAPI<ReviewResponse>('/client/google-reviews')
  const faqData = await fetchAPI<FaqResponse>('/client/faq')
  const firstTypeId = luxuryTab?.data?.[0]?.id;
  const initialData = firstTypeId
    ? await fetchAPI<LuxuryListResponse>(
      `/client/properties/luxury?property_type_id=${firstTypeId}`
    )
    : { data: [], page: 1, per_page: 0, total: 0 };

  return (
    <div className="home-page">
      <main>
        <HeroSection data={heroBannerRes} />
        <ProjectDubai
          data={offPlanRes.data}
          title={offPlanSection?.title_EN ?? "New Off Plan Projects In Dubai"}
          subtitle={offPlanSection?.subtitle_EN ?? ""}
        />
        <GetDiscountSection />
        <ProductSection
          data={latesProject}
          title={latestProjectsSection?.title_EN ?? "Latest Projects in the UAE"}
          subtitle={latestProjectsSection?.subtitle_EN ?? ""}
        />
        <MortgageCalculator />
        <TrendingProjectsSection
          data={mostTrending}
          title={mostTrendingSection?.title_EN ?? "Most Trending Projects in DubaI"}
          subtitle={mostTrendingSection?.subtitle_EN ?? ""}
        />
        <PremiumLandSection
          data={landPropertiesRes}
          title={landSection?.title_EN ?? "Most Trending Projects in DubaI"}
          subtitle={landSection?.subtitle_EN ?? ""}
        />
        <StatsSection />
        <CommissionSection
          title={maximizeSection?.title_EN ?? "Maximize Your Commission"}
          subtitle={maximizeSection?.subtitle_EN ?? ""}
        />
        <LuxuryProperties
          tab={luxuryTab} initial={initialData}
          title={luxurySection?.title_EN ?? ""}
          subtitle={luxurySection?.subtitle_EN ?? ""}
        />
        <AboutSection
          title={aboutSection?.title_EN ?? ""}
          subtitle={aboutSection?.subtitle_EN ?? ""}
        />
        <ContactAgentSection />
        <MostPopularPlacesSection
          data={mostPopular}
          title={popularplaceSection?.title_EN ?? ""}
          subtitle={popularplaceSection?.subtitle_EN ?? ""}
        />
        <SearchTrendsSection />
        <LatestBlogSection data={blogRes} />
        <RealestateInfoCard data={realestateRes} />
        <GoogleReviewsSection data={reviewData} />
        <RealEstateFaqSection data={faqData} />
      </main>
    </div>
  );
}
