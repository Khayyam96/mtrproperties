"use client";

import "react-phone-input-2/lib/style.css";
import "./index.scss";
import SellBanner from "./SellBanner";
import SellStepsSection from "./SellStepsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";

export default function AboutPage() {
    return (
        <div className="about-page">
            <SellBanner/>
            <SellStepsSection />
            <SubscribeSection />
        </div>
    );
}
