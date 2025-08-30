"use client";

import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import PrivacyContent from "./PrivacyContent";
import PrivacyStrip from "./privacypolicy";


export default function AboutPage() {
    return (
        <div className="privacy-page">
            <PrivacyStrip />
            <PrivacyContent />
            <SubscribeSection />
        </div>
    );
}
