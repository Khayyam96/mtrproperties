"use client";

import "react-phone-input-2/lib/style.css";
import "./index.scss";
import Banner from "./Banner";
import PropertyFilter from "./PropertyFilter";
import ProjectListingSection from "./ProjectListingSection";
import ReasonToInvest from "./ReasonToInvest";
import OffPlanContact from "./OffPlanContact";
import RealestateInfoCard from "../Home/RealestateInfoCard";
// import RealEstateFaqSection from "../Home/RealEstateFaqSection";

export default function AboutPage() {
  return (
    <div className="about-page">
      <Banner />
      <PropertyFilter />
      <ProjectListingSection />
      <ReasonToInvest />
      <OffPlanContact />
      <RealestateInfoCard
        title="Realestate agency in dubai"
        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        moreDesc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      />
      {/* <RealEstateFaqSection /> */}
    </div>
  );
}
