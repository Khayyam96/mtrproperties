"use client";

import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import LatestBlogSection from "../Home/LatestBlogSection";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import AboutMTRSection from "./AboutMTRSection";
import BenefitsSection from "./BenefitsSection";
import CommissionCalculatorSection from "./CommissionCalculator";
import CommissionPlansSection from "./CommissionPlansSection";
import HeroCommission from "./HeroCommission";
import HowItWorksSection from "./HowItWorksSection";
import StatsSection from "./StatsSection";
import TestimonialsCarouselSection from "./TestimonialsCarouselSection";

export default function BrokersPage() {
    return (
        <div className="brokers-page">
            <HeroCommission />
            <CommissionCalculatorSection />
            <BenefitsSection onCta={() => console.log("Contact clicked")} />
            <HowItWorksSection />
            <CommissionPlansSection />
            <StatsSection />
            <TestimonialsCarouselSection />
            <AboutMTRSection />
            <SubscribeSection />
            <LatestBlogSection />
            <RealEstateFaqSection />
        </div>
    );
}
