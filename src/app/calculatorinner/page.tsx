"use client";

import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
// import GoogleReviewsSection from "../Home/GoogleReviewsSection";
import MortgageCalculator from "../Home/MortgageCalculator";
// import { MostPopularPlacesSection } from "../Home/MostPopularPlacesSection";
import BankOffersCompareSection from "./BankOffersCompareSection";
import BanksCarouselSection from "./BanksCarouselSection";
import DocumentsRequiredSection from "./DocumentsRequiredSection";
import MortgageHero from "./MortgageHero";
import ResidentsVsNonResidents from "./ResidentsVsNonResidents";
import SalaryEligibilitySection from "./SalaryEligibilitySection";
import SpecialOffersSection from "./SpecialOffersSection";
// import LatestBlogSection from "../Home/LatestBlogSection";
// import RealEstateFaqSection from "../Home/RealEstateFaqSection";


export default function BrokersPage() {
    return (
        <div className="calculatorinner-page">
            <MortgageHero
                image="/hero.png"   
                height={260}
                overlay={0.5}
            />
            <MortgageCalculator />
            <SpecialOffersSection />
            {/* <MostPopularPlacesSection /> */}
            <DocumentsRequiredSection />
            <ResidentsVsNonResidents />
            <SalaryEligibilitySection />
            <BankOffersCompareSection />
            <BanksCarouselSection />
            {/* <GoogleReviewsSection /> */}
            <SubscribeSection />
            {/* <LatestBlogSection />
            <RealEstateFaqSection /> */}
        </div>
    );
}
