import { getAllBlogs } from "@/lib/blog";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = await getAllBlogs();

  const blogEntries: MetadataRoute.Sitemap = blogs
    ? blogs.map((b) => ({
        url: `${process.env.NEXTAUTH_URL}/article/${b.url}`,
        lastModified: new Date(b.updatedAt),
        changeFrequency: "weekly",
        priority: 0.9,
      }))
    : [];

  return [
    {
      url: `${process.env.NEXTAUTH_URL}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/car`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/personal`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/article/car`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/article/personal`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/article/home`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/terms`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/policy`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
};
export default sitemap;
