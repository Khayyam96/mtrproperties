"use client";

import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import LatestBlogSection from "../Home/LatestBlogSection";
import RealEstateFaqSection from "../Home/RealEstateFaqSection";
import AdditionalBenefits from "./AdditionalBenefits";
import DocumentRequirements from "./DocumentRequirements";
import GovRegulated from "./GovRegulated";
import HowItWorks from "./HowItWorks";
import HowToInvest from "./HowToInvest";
import LegalConsultation from "./LegalConsultation";
import OwnershipSimple from "./OwnershipSimple";
import RegulatoryOversight from "./RegulatoryOversight";
import TechnicalIntegration from "./TechnicalIntegration";
import TokenizationHero from "./TokenizationHero";
import TokenizationInfoSection from "./TokenizationInfoSection";
import WhyTokenized from "./WhyTokenized";


export default function BrokersPage() {
    return (
        <div className="estate-page">
            <TokenizationHero />
            <TokenizationInfoSection/>
            <HowItWorks />
            <TechnicalIntegration />
            <OwnershipSimple />
            <WhyTokenized />
            <AdditionalBenefits />
            <GovRegulated />
            <RegulatoryOversight />
            <LegalConsultation
                downloadHref="/docs/legal-pack.pdf" 
                onContact={() => console.log("contact")}
            />
            <HowToInvest onCTA={() => console.log("Contact clicked")} />
            <DocumentRequirements />
            <RealEstateFaqSection />
            <SubscribeSection />
        </div>
    );
}
