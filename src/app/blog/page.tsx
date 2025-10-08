// app/blog/page.tsx
import { fetchAPI } from "@/utils";
import { BlogsSection } from "./BlogsSection";
import BlogHero from "./BlogHero";
import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";

export type BlogAPITranslation = {
  id: number;
  title: string;
  subtitle: string;
};

export type BlogAPICategory = {
  id: number;
  name_EN?: string;
  name?: string;
};

export type BlogAPIItem = {
  id: number;
  created_at: string;
  slug: string;
  author_name: string | null;
  main_image: string | null;
  translation?: BlogAPITranslation | null;
  translations?: BlogAPITranslation[] | null;
  category?: BlogAPICategory | null;
};

export type BlogListResponse = {
  data: BlogAPIItem[];
  page: number;
  per_page: number;
  total: number;
};

export const metadata = {
  title: "Blog list — MTR Properties",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page ?? 1));

  const bloglist = await fetchAPI<BlogListResponse>(`/client/blogs?page=${currentPage}`);

  return (
    <div className="blog-page">
      <BlogHero
        image={"/iiii.png"}
        title={"Heading of the blog"}
        excerpt={"Many desktop publishing packages and web page editors now."}
        category={"Category"}
        dateISO={"2023-01-04T00:00:00.000Z"}
      />
      <BlogsSection data={bloglist} currentPage={currentPage} />
      <SubscribeSection />
    </div>
  );
}
