import Image from "next/image";
import styles from "./page.module.scss";
import BlogsSection from "../BlogsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import BreadcrumbBar from "../../../components/BreadcrumbBar/BreadcrumbBar";
import { fetchAPI } from "@/utils";
import type { LastBlogListItem } from "@/models/LastBlog.mode";

type MaybePromise<T> = T | Promise<T>;

const BLOG_IMAGE_BASE =
  process.env.NEXT_PUBLIC_BLOG_IMAGE_BASE ??
  "https://api.dubaiyachts.com/uploads/blogs";

function resolveImage(src?: string | null) {
  if (!src) return "/placeholder.png";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return `${BLOG_IMAGE_BASE}${src}`;
  return `${BLOG_IMAGE_BASE}/${src}`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function BlogInner(props: {
  params: MaybePromise<{ slug: string }>;
}) {
  const { slug } = await props.params; 

  const blogData = await fetchAPI<LastBlogListItem>(
    "/client/blogPosts/slug/" + slug
  );

  const heroSrc = resolveImage(blogData.mainImage ?? blogData.gallery?.[0]);
  const innerSrc = resolveImage(blogData.gallery?.[1]);
  const published = formatDate(blogData.publishedAt);

  return (
    <>
      <BreadcrumbBar
        className={styles.breadcrumb}
        backLabel="Back to Blog"
        backHref="/blog"
        items={[
          { label: "Blog", href: "/blog" },
          { label: blogData.title },
        ]}
      />

      <div className={styles.blogInner}>
        <header className={styles.header}>
          <h5 className={styles.meta}>
            {blogData.category?.name} <span>{published}</span>
          </h5>
          <h2 className={styles.title}>{blogData.title}</h2>
        </header>

        <div className={styles.hero}>
          <Image
            src={heroSrc}
            alt={blogData.title}
            width={1200}
            height={640}
            priority
            className={styles.heroImg}
          />
        </div>

        <h3
          className={styles.h5}
          style={{ fontSize: 20, lineHeight: "28px", color: "#000", fontWeight: 800 }}
        >
          {blogData.title}
        </h3>

        <div
          style={{ marginTop: 13, fontSize: 16, lineHeight: "24px", color: "#000" }}
          dangerouslySetInnerHTML={{ __html: blogData.content ?? "" }}
        />

        <figure
          className={styles.imageBlock}
          style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
        >
          <Image
            src={innerSrc}
            alt={blogData.title}
            width={700}
            height={300}
            className={styles.innerImg}
          />
        </figure>

        {blogData.seoTitle && (
          <h4
            className={styles.h4}
            style={{ fontSize: 20, lineHeight: "28px", color: "#000", fontWeight: 800 }}
          >
            {blogData.seoTitle}
          </h4>
        )}

        {blogData.seoDescription && (
          <p style={{ marginTop: 13, fontSize: 16, lineHeight: "24px", color: "#000" }}>
            {blogData.seoDescription}
          </p>
        )}
      </div>

      <BlogsSection />
      <SubscribeSection />
    </>
  );
}
