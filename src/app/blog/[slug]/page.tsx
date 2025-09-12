

import Image from "next/image";
import styles from "./page.module.scss";
import BlogsSection from "../BlogsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import BreadcrumbBar from "../../../components/BreadcrumbBar/BreadcrumbBar"
import { fetchAPI } from "@/utils";
import { LastBlogListItem } from "@/models/LastBlog.mode";

export default async function BlogInnerPage({params}: {params: Promise<{ slug: string }>}) {
  const { slug } = await params;

  const blogData = await fetchAPI<LastBlogListItem>('/client/blogPosts/slug/' + slug);

  if (!blogData) {
    return <div>Blog post not found</div>;
  }
  return (
    <>
      <BreadcrumbBar
        className={styles.breadcrumb}
        backLabel="Back to Blog"
        backHref="/blog"
        items={[
          { label: "Blog", href: "/blog" },
          { label: blogData.title }
        ]}
      />
      <div className={styles.blogInner}>
        <header className={styles.header}>
          <h5 className={styles.meta}>
            {blogData.category?.name} <span>{blogData.publishedAt}</span>
          </h5>
          <h2 className={styles.title}>
            {blogData.title}
          </h2>
        </header>

        <div className={styles.hero}>
          <Image
            src={blogData.mainImage ? `https://api.dubaiyachts.com/uploads/properties/${blogData.mainImage}` : "/placeholder.png"}
            alt={blogData.title}
            width={1200}
            height={640}
            priority
            className={styles.heroImg}
          />
        </div>

        <h3 style={{ fontSize: "20px", lineHeight: "28px", color:"#000000", fontWeight: "800"}} className={styles.h5}>
          {blogData.title}
        </h3>

        <p style={{marginTop:"13px", fontSize: "16px", lineHeight: "24px", color:"#000000"}}>{blogData.content}</p>

        <figure className={styles.imageBlock} style={{marginTop:"20px", display: "flex", justifyContent: "center"}}>
          <Image
            src={blogData.mainImage ? `https://api.dubaiyachts.com/uploads/properties/${blogData.mainImage}` : "/placeholder.png"}
            alt={blogData.title}
            width={700}
            height={300}
            className={styles.innerImg}
            
          />
        </figure>

        <h4 className={styles.h4} style={{ fontSize: "20px", lineHeight: "28px", color:"#000000", fontWeight: "800"}}>
          {blogData.seoTitle}
        </h4>

        <p  style={{marginTop:"13px", fontSize: "16px", lineHeight: "24px", color:"#000000"}}>{blogData.seoDescription}</p>


      </div>
      <BlogsSection />
      <SubscribeSection />
    </>
  );
}
