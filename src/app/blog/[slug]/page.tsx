// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchAPI } from "@/utils";
import BlogInnerAntd from "./BlogInnerAntd";
import "./index.scss";
import type { BlogInnerResponse } from "@/models/BlogInner.model";
import type { LandProjectResponse } from "@/models/LatesProject.model";
import type { FaqResponse } from "@/models/Faq.model";
import { BlogsSection } from "../BlogsSection";
import type { BlogListResponse } from "../page";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";

export default async function BlogInnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let bloginner: BlogInnerResponse | null = null;

  try {
    bloginner = await fetchAPI<BlogInnerResponse>(
      "/client/blogs/" + encodeURIComponent(slug)
    );
  } catch (e) {
    console.error("Error fetching blog inner:", e);
    return notFound();
  }

  if (!bloginner) return notFound();

  const [latestProjects, faqData, bloglist] = await Promise.all([
    fetchAPI<LandProjectResponse>("/client/properties/latest-project"),
    fetchAPI<FaqResponse>("/client/faq"),
    fetchAPI<BlogListResponse>("/client/blogs"),
  ]);

  return (
    <div className="blog-inner-page">
      <BlogInnerAntd
        data={bloginner}
        latestProjects={latestProjects}
        faqData={faqData}
      />
      <BlogsSection data={bloglist} />
      <SubscribeSection />
    </div>
  );
}
