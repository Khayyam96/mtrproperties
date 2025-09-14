import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import LatestBlogSection from "../Home/LatestBlogSection";
import ApplySection from "./ApplySection";
import AreaTeamsSection from "./AreaTeamsSection";
import Banner from "./Banner";
import EarningPotentialSection from "./EarningPotentialSection";
import StoriesAndTrendSection from "./StoriesAndTrendSection";
import SuccessFrameworkSection from "./SuccessFrameworkSection";
import SuccessMetricsSection from "./SuccessMetricsSection";
import TeamDetailsSection from "./TeamDetailsSection";
import { fetchAPI } from "@/utils";
import { LastBlogListResponse } from "@/models/LastBlog.mode";


export default async function BrokersPage() {
    const blogRes = await fetchAPI<LastBlogListResponse>('/client/blogPosts/latest')

    return (
        <div className="hiring-page">
            <Banner
                image="/hero.png"
                ctaHref="/careers/apply"
            />
            <SuccessFrameworkSection />
            <EarningPotentialSection onCta={() => console.log("View more")} />
            <AreaTeamsSection positionsCount={5} />
            <TeamDetailsSection
                ctaHref="/careers/apply/downtown-dubai"
            />
            <ApplySection
                onSubmit={(data) => {
                    console.log("Submit payload:", data);
                }}
            />
            <SuccessMetricsSection />
            <StoriesAndTrendSection />
            <LatestBlogSection data={blogRes} />
            <SubscribeSection />
        </div>
    );
}
