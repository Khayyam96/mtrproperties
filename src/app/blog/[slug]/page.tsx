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

// --- remove your local `PageProps` alias completely ---

type BlogTranslation = {
  lang?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

type BlogListItemLike = {
  slug: string;
  translation?: BlogTranslation | null;
  translations?: BlogTranslation[] | null;
};

function getBlogTitle<T extends BlogListItemLike>(item: T): string {
  if (item?.translation) {
    return item.translation.title || item.translation.subtitle || item.slug;
  }
  const translations = item?.translations ?? [];
  if (Array.isArray(translations) && translations.length > 0) {
    const preferred: BlogTranslation | undefined =
      translations.find((t) => t?.lang === "EN") ?? translations[0];
    return preferred?.title || preferred?.subtitle || item.slug;
  }
  return item?.slug || "";
}

export const metadata = {
  title: "Blog inner — MTR Properties",
};

export default async function BlogInnerPage({
  // 👇 params is a Promise in your generated types
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 await it

  let bloginner: BlogInnerResponse | null = null;
  try {
    bloginner = await fetchAPI<BlogInnerResponse>("/client/blogs/" + encodeURIComponent(slug));
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

  const recentBlogs =
    (bloglist?.data || [])
      .filter((b) => b.slug !== slug)
      .slice(0, 6)
      .map((b) => ({
        title: getBlogTitle({
          ...b,
          translations: Array.isArray(b.translations) ? b.translations : [],
        }),
        slug: b.slug,
      }));

  const currentPage = bloglist?.page ?? 1;

  return (
    <div className="blog-inner-page">
      <BlogInnerAntd
        data={bloginner}
        latestProjects={latestProjects}
        faqData={faqData}
        recentBlogs={recentBlogs}
      />
      <BlogsSection data={bloglist} currentPage={currentPage} />
      <SubscribeSection />
    </div>
  );
}
