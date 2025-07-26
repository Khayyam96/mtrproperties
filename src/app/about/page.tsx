"use client";

import "react-phone-input-2/lib/style.css";
import "./index.scss";
import AboutBanner from "./AboutBanner";
import { OurServices } from "./OurServices";
import { OurVision } from "./OurVision";
import { OurTeam } from "./OurTeam";


export default function AboutPage() {
    return (
        <div className="about-page">
            <AboutBanner/>
            <OurServices />
            <OurVision />
            <OurTeam/>
        </div>
    );
}
