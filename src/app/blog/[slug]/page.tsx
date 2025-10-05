// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchAPI } from "@/utils";
import BlogInnerAntd from "./BlogInnerAntd";
import "./index.scss";
import type { BlogInnerResponse } from "@/models/BlogInner.model";

export default async function BlogInnerPage({
  params,
}: {
  // In some Next versions the generated types make `params` a Promise
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

  return (
    <div className="blog-inner-page">
      <BlogInnerAntd data={bloginner} />
    </div>
  );
}
