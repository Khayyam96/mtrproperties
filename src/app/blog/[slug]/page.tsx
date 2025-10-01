

import Image from "next/image";
import styles from "./page.module.scss";
// import {BlogsSection} from "../BlogsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import BreadcrumbBar from "../../../components/BreadcrumbBar/BreadcrumbBar"
import { fetchAPI } from "@/utils";
import { Blog } from "@/models/Blog.model";
import moment from "moment";
// import { BlogListResponse } from "@/models/BlogList.model";


export default async function BlogInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blogData = await fetchAPI<Blog>('/client/blogs/' + slug);



  console.log(blogData, "blogDatablogDatablogDatablogData")

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
          { label: blogData.translation.title }
        ]}
      />
      <div className={styles.blogInner}>
        <header className={styles.header}>
          <h5 className={styles.meta}>
            {blogData.category?.name}{" "}
            <span>{moment(blogData.created_at).format("DD MMM, YYYY")}</span>
          </h5>
          <h2 className={styles.title}>
            {blogData.translation.title}
          </h2>
        </header>

        <div className={styles.hero}>
          <Image
            src={blogData.main_image ? `https://api.dubaiyachts.com/uploads/properties/${blogData.main_image}` : "/placeholder.png"}
            alt={blogData.title}
            width={1200}
            height={640}
            priority
            className={styles.heroImg}
          />
        </div>

        <p style={{ marginTop: "13px", fontSize: "16px", lineHeight: "24px", color: "#000000" }}>{blogData.content_1}</p>

        <figure className={styles.imageBlock} style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Image
            src={blogData.main_image ? `https://api.dubaiyachts.com/uploads/properties/${blogData.content_image}` : "/placeholder.png"}
            alt={blogData.title}
            width={700}
            height={300}
            className={styles.innerImg}

          />
        </figure>

        <p style={{ marginTop: "13px", fontSize: "16px", lineHeight: "24px", color: "#000000" }}>{blogData.content_2}</p>


      </div>


      {/* <BlogsSection/> */}
      <SubscribeSection />
    </>
  );
}
