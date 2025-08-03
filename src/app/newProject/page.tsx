"use client";

import "react-phone-input-2/lib/style.css";
import "./index.scss";
import Banner from "./Banner";
import PropertyFilter from "./PropertyFilter"; 
import ProjectListingSection from "./ProjectListingSection";
import ReasonToInvest from "./ReasonToInvest";
import OffPlanContact from "./OffPlanContact";

export default function AboutPage() {
  return (
    <div className="about-page">
      <Banner />
      <PropertyFilter />
      <ProjectListingSection />
      <ReasonToInvest />
      <OffPlanContact />
    </div>
  );
}
