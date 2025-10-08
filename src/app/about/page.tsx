import "react-phone-input-2/lib/style.css";
import AboutBanner from "./AboutBanner";
import { OurServices } from "./OurServices";
import { OurVision } from "./OurVision";
import { OurTeam } from "./OurTeam";
import { PartnersCarousel } from "./PartnersCarousel";
import TestimonialsCarousel from "./TestimonialsCarousel";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import { fetchAPI } from "@/utils";
import type { OurServicesResponse } from "@/models/OurServices.model";
import type { OurVisionResponse } from "@/models/OurVision.model";
import type { PartnerListResponse } from "@/models/PartnerList.model";
import type { TestimonialsResponse } from "@/models/Testimonials.model";
import { TeamListResponse } from "@/models/Team.model";
import "./index.scss";

export const metadata = {
  title: "About Us — MTR Properties",
};

export default async function AboutPage() {
  const ourserviceslist = await fetchAPI<OurServicesResponse>("/client/our-services");
  const ourvisionlist = await fetchAPI<OurVisionResponse>("/client/our-vision");
  const partnerlist = await fetchAPI<PartnerListResponse>("/client/developers");
  const testimonials = await fetchAPI<TestimonialsResponse>("/client/testimonials");
  const teamList = await fetchAPI<TeamListResponse>("/client/agents");

  return (
    <div className="about-page">
      <AboutBanner />
      <OurServices data={ourserviceslist} />
      <OurVision data={ourvisionlist} />
      <OurTeam data={teamList}/>
      <PartnersCarousel data={partnerlist} />
      <TestimonialsCarousel data={testimonials} />
      <SubscribeSection />
    </div>
  );
}
