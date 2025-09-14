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
import { fetchAPI } from "@/utils";
import { LastBlogListResponse } from "@/models/LastBlog.mode";
import { FaqListResponse } from "@/models/Faq.model";

export default async function BrokersPage() {
    const blogRes = await fetchAPI<LastBlogListResponse>('/client/blogPosts/latest')
    const faqData = await fetchAPI<FaqListResponse>('/client/faq')


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
            <LatestBlogSection data={blogRes} />
            <RealEstateFaqSection data={faqData} />
        </div>
    );
}
