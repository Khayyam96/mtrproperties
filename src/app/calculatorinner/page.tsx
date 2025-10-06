import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
// import GoogleReviewsSection from "../Home/GoogleReviewsSection";
import MortgageCalculator from "../Home/MortgageCalculator";
import { MostPopularPlacesSection } from "../Home/MostPopularPlacesSection";
// import BankOffersCompareSection from "./BankOffersCompareSection";
// import BanksCarouselSection from "./BanksCarouselSection";
import DocumentsRequiredSection from "./DocumentsRequiredSection";
import MortgageHero from "./MortgageHero";
import ResidentsVsNonResidents from "./ResidentsVsNonResidents";
import SalaryEligibilitySection from "./SalaryEligibilitySection";
import SpecialOffersSection from "./SpecialOffersSection";
import { fetchAPI } from "@/utils";
// import { ClientMostPopularListResponse } from "@/models/MostPopular.model";
// import { IReviewResp } from "@/models/Review.model";
// import { LastBlogListResponse } from "@/models/LastBlog.mode";
// import LatestBlogSection from "../Home/LatestBlogSection";
// import RealEstateFaqSection from "../Home/RealEstateFaqSection";
// import { FaqListResponse } from "@/models/Faq.model";
// import { BankListResponse } from "@/models/Bank.model";
import { MostPopularResponse } from "@/models/MostPopular.mode";
import { SectionKey, SectionTitleResponse } from "@/models/SectionTitle.mode";


export default async function BrokersPage() {
    // const popularPlacesRes = await fetchAPI<ClientMostPopularListResponse>('/client/popularPlaces');
    // const reviewData = await fetchAPI<IReviewResp>('/client/reviews')
    // const blogRes = await fetchAPI<LastBlogListResponse>('/client/blogPosts/latest')
    // const faqData = await fetchAPI<FaqListResponse>('/client/faq')
    // const bankRes = await fetchAPI<BankListResponse>('/banks/client')






    const sectionContent = await fetchAPI<SectionTitleResponse>("/client/sections");

    const popularplaceSection = sectionContent.find(
        (s) => s.key === SectionKey.POPULAR_PLACES || s.key === "POPULAR_PLACES"
    );

    const mostPopular = await fetchAPI<MostPopularResponse>("/client/landmarks?is_most_popular=true");

    return (
        <div className="calculatorinner-page">
            <MortgageHero
                image="/hero.png"
                height={260}
                overlay={0.5}
            />
            <MortgageCalculator />
            <SpecialOffersSection />
            <MostPopularPlacesSection
                data={mostPopular}
                title={popularplaceSection?.title_EN ?? ""}
                subtitle={popularplaceSection?.subtitle_EN ?? ""}
            />
            <DocumentsRequiredSection />
            <ResidentsVsNonResidents />
            <SalaryEligibilitySection />
            {/* <BankOffersCompareSection bankRes={bankRes} />
            <BanksCarouselSection bankRes={bankRes} /> */}
            {/* <GoogleReviewsSection data={reviewData} /> */}
            <SubscribeSection />
            {/* <LatestBlogSection data={blogRes} /> */}
            {/* <RealEstateFaqSection data={faqData} /> */}
        </div>
    );
}
