"use client";

import BlogHero from "./BlogHero";
import BlogsSection from "./BlogsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";


export default function AboutPage() {
    return (
        <div className="blog-page">
            <BlogHero image={"/iiii.png"} title={"Heading of the blog"} excerpt={"Many desktop publishing packages and web page editors now."} category={"Category"} dateISO={"04 Jan 2023"} />
            <BlogsSection />
            <SubscribeSection />
        </div>
    );
}
