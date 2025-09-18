
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








// import { Partner } from "@/models/Partner.model";
// import { ClientMostPopularListResponse } from "@/models/MostPopular.model";
// import { LastBlogListResponse } from "@/models/LastBlog.mode";
import "../app/page.scss";
import { LastBlogResponse } from "@/models/LastBlog.mode";





// import { RealEstate } from "@/models/RealEstate.model";

export default async function Home() {

  const offPlanRes = await fetchAPI<OffPlanListResponse>("/client/off-plans");
  const heroBannerRes = await fetchAPI<HeroBanner>("/client/hero-banner");
  const landPropertiesRes = await fetchAPI<LandPropertiesResponse>("/client/lands");
  const latesProject = await fetchAPI<LandProjectResponse>("/client/lands");
  const mostTrending = await fetchAPI<MostTrendingResponse>("/client/most-trending");
  const luxuryTab = await fetchAPI<LuxuryTabResponse>("/shared/property-types");
  const mostPopular = await fetchAPI<MostPopularResponse>("/client/areas?is_most_popular=true&per_page=6");
  const blogRes = await fetchAPI<LastBlogResponse>('/client/blogs')
  const realestateRes = await fetchAPI<RealEstate>("/client/real-estate-agency")
  const reviewData = await fetchAPI<ReviewResponse>('/client/google-reviews')
  const faqData = await fetchAPI<FaqResponse>('/client/faq')


  console.log(realestateRes, "realestateResrealestateResrealestateRes")




  
  // const partneryData = await fetchAPI<Partner>('/client/forms/block/active')
  // const popularPlacesRes = await fetchAPI<ClientMostPopularListResponse>('/client/popularPlaces');






  return (
    <div className="home-page">
      <main>
        <HeroSection data={heroBannerRes} />
        <ProjectDubai data={offPlanRes.data} />
        <GetDiscountSection />
        <ProductSection data={latesProject} />
        <MortgageCalculator />
        <TrendingProjectsSection data={mostTrending} />
        <PremiumLandSection data={landPropertiesRes} />
        <StatsSection />
        <CommissionSection />
        <LuxuryProperties tab={luxuryTab} />
        <AboutSection />
        <ContactAgentSection />
        <MostPopularPlacesSection data={mostPopular} />
        <SearchTrendsSection />


        <LatestBlogSection data={blogRes} />
        <RealestateInfoCard data={realestateRes} />

        <GoogleReviewsSection data={reviewData} />
        <RealEstateFaqSection data={faqData} />
      </main>
    </div>
  );
}
