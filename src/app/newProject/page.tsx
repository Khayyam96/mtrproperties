import "react-phone-input-2/lib/style.css";
import "./index.scss";
import Banner from "./Banner";
import PropertyFilter from "./PropertyFilter";
import ProjectListingSection from "./ProjectListingSection";
import ReasonToInvest from "./ReasonToInvest";
import OffPlanContact from "./OffPlanContact";
import RealestateInfoCard from "../Home/RealestateInfoCard";
import { fetchAPI } from "@/utils";
import { RealEstate } from "@/models/RealEstate.model";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import { FaqListResponse } from "@/models/Faq.model";

export default async function AboutPage() {

  const realestateRes = await fetchAPI<RealEstate>("/realEstateAgencyDubai/active")
  const faqData = await fetchAPI<FaqListResponse>('/client/faq')
  
  return (
    <div className="about-page">
      <Banner />
      <PropertyFilter />
      <ProjectListingSection />
      <ReasonToInvest />
      <OffPlanContact />
      <RealestateInfoCard data={realestateRes}/>
      <RealEstateFaqSection data={faqData} />
    </div>
  );
}
