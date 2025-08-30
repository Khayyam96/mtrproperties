"use client";

import { MapSection } from "@/components/Lib/Map/MapSection";
import ContactSection from "./ContactSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";


export default function ContactPage() {
    return (
        <div className="contact-page">
            <MapSection />
            <ContactSection />
            <SubscribeSection />
        </div>
    );
}
