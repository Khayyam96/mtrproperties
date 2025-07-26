import "./page.scss";

import  HeroSection from "./Home/HeroSection"
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

export default function Home() {
  return (
    <div className="home-page">
      <main>
        <HeroSection />
        <ProductSection/>
        <MortgageCalculator/>
        <LuxuryProperties/>
        <ContactAgentSection/>
        <ProjectDubai/>
        <StatsSection/>
        <AboutSection/>
        <SearchTrendsSection/>
        <LatestBlogSection/>
        <RealEstateFaqSection/>
      </main>
    </div>
  );
}
