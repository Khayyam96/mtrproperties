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
    name_EN: string;
};

export type BlogAPIItem = {
    id: number;
    created_at: string;
    slug: string;
    author_name: string | null;
    main_image: string | null;
    translations: BlogAPITranslation[];
    category: BlogAPICategory | null;
};

export type BlogListResponse = {
    data: BlogAPIItem[];
    page: number;
    per_page: number;
    total: number;
};


export default async function AboutPage() {
  const bloglist = await fetchAPI<BlogListResponse>("/client/blogs");
    return (
        <div className="blog-page">
            <BlogHero image={"/iiii.png"} title={"Heading of the blog"} excerpt={"Many desktop publishing packages and web page editors now."} category={"Category"} dateISO={"04 Jan 2023"} />
            <BlogsSection data={bloglist} />
            <SubscribeSection />
        </div>
    );
}
