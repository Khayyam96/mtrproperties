"use client";

import MortgageHero from "./Banner";
import ContactAgentSection from "../Home/ContactAgentSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import ScrollableInfoSection from "./ScrollableInfoSection";
import SEOContentSection from "./SEOContentSection";
import CalcCtaSection from "./CalcCtaSection";
import SeoImageTextSection from "./SeoImageTextSection";


export default function BrokersPage() {
    return (
        <div className="calculatorinner-page">
            <MortgageHero
                image="/hero.png"
                height={260}
                overlay={0.5}
            />
            <ScrollableInfoSection />
            <ContactAgentSection />
            <SEOContentSection />
            <CalcCtaSection
                image="/images/mortgage-calc.jpg"  // place in /public/images/
                ctaHref="/mortgage-calculator"
            />
            <SeoImageTextSection
                image="/luxury2.png"
                imageHeight={320}
            />
            <SubscribeSection />

        </div>
    );
}
