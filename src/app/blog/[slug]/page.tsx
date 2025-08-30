"use client";

import Image from "next/image";
import { Typography, Divider } from "antd";
import styles from "./page.module.scss";
import BlogsSection from "../BlogsSection";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import BreadcrumbBar from "../../../components/BreadcrumbBar/BreadcrumbBar"

const { Title, Paragraph, Text } = Typography;

type TextBlock = { type: "text"; heading: string; body: string };
type ImageBlock = { type: "image"; src: string; alt?: string; width?: number; height?: number };
type SubHeadingBlock = { type: "subheading"; heading: string; body: string };
type ContentBlock = TextBlock | ImageBlock | SubHeadingBlock;

type Blog = {
  title: string;
  category: string;
  date: string;
  image: string;
  content: ContentBlock[];
};

export default function BlogInner({ params }: { params: { slug: string } }) {
  const blog: Blog = {
    title: "Thinking of Buying a Property in Dubai? Read our Guide First",
    category: "Category",
    date: "04 Jan 2023",
    image: "/inner3.png",
    content: [
      {
        type: "text",
        heading:
          "It is a long established fact that a reader will be distracted by the readable content of a page.",
        body:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites.\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed."
      },
      { type: "image", src: "/inner1.png", alt: "Living room", width: 760, height: 480 },
      {
        type: "subheading",
        heading: "Sub heading",
        body:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites.\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed."
      },
      {
        type: "subheading",
        heading: "Sub heading",
        body:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed."
      }
    ]
  };

  const heroSrc = blog.image || "/placeholder.png";

  const renderBody = (text: string) =>
    text.split("\n").map((p, i) => (
      <Paragraph key={i} className={styles.p}>
        {p}
      </Paragraph>
    ));

  return (
    <>
    <BreadcrumbBar
          className={styles.breadcrumb}
          backLabel="Back to Blog"
          backHref="/blog"
          items={[
            { label: "Blog", href: "/blog" },
            { label: blog.title } 
          ]}
        />
      <div className={styles.blogInner}>
        <header className={styles.header}>
          <Text className={styles.meta}>
            {blog.category} <span>{blog.date}</span>
          </Text>
          <Title level={2} className={styles.title}>
            {blog.title}
          </Title>
        </header>

        <div className={styles.hero}>
          <Image
            src={heroSrc}
            alt={blog.title}
            width={1200}
            height={640}
            priority
            className={styles.heroImg}
          />
        </div>

        <Divider className={styles.sep} />

        <section className={styles.content}>
          {blog.content.map((block, i) => {
            if (block.type === "text") {
              return (
                <div key={i} className={styles.textBlock}>
                  <Title level={5} className={styles.h5}>
                    {block.heading}
                  </Title>
                  {renderBody(block.body)}
                </div>
              );
            }
            if (block.type === "image") {
              const w = block.width ?? 800;
              const h = block.height ?? 500;
              return (
                <figure key={i} className={styles.imageBlock}>
                  <Image
                    src={block.src || "/placeholder.png"}
                    alt={block.alt || ""}
                    width={w}
                    height={h}
                    className={styles.innerImg}
                  />
                </figure>
              );
            }
            return (
              <div key={i} className={styles.subHeadingBlock}>
                <Title level={4} className={styles.h4}>
                  {block.heading}
                </Title>
                {renderBody(block.body)}
              </div>
            );
          })}
        </section>


      </div>
      <BlogsSection />
      <SubscribeSection />
    </>
  );
}
