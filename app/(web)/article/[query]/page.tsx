import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Article, FAQPage, WithContext } from "schema-dts";

import TableContent from "@/components/etc/table-content";
import { Separator } from "@/components/ui/separator";
import ArticleView from "@/components/views/article-view";

import { getBlogFromUrl } from "@/lib/blog";
import Script from "next/script";

export const generateMetadata = async ({
  params,
}: {
  params: { query: string };
}): Promise<Metadata> => {
  const query = params.query;

  const blog = await getBlogFromUrl(query);
  if (!blog) return {};

  // const { blocks } = JSON.parse(blog.blog as string);

  // const imgMeta: {
  //   url: string;
  // }[] = blocks.map((b: any) => {
  //   if (b.type === "image") {
  //     return {
  //       url: b.data.file.url,
  //     };
  //   }
  // });

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    openGraph: {
      images: [
        {
          url: blog.img,
        },
        // ...imgMeta,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const BlogPostPage = async ({ params }: { params: { query: string } }) => {
  const query = params.query;

  const blog = await getBlogFromUrl(query);

  if (!blog) return redirect("/");
  const { blocks } = JSON.parse(blog.blog as string);

  const blogHeadings = blocks.filter((b: any) => b.type === "header");
  const imgMeta: string[] = blocks.map((b: any) => {
    if (b.type === "image") {
      return b.data.file.url;
    }
  });

  const articleSchema: Article = {
    "@type": "NewsArticle",
    "@id": `${blog.id}`,
    headline: blog.title,
    image: imgMeta,
    description: blog.description,
    dateCreated: `${blog.createdAt}`,
    dateModified: `${blog.updatedAt}`,
    datePublished: `${blog.createdAt}`,
    author: [
      {
        "@type": "Person",
        name: "Hardik Sadhu",
      },
    ],
  };

  const faqEntry = blog.faq
    ? JSON.parse(blog.faq as string).map((f: any) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      }))
    : [];

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntry,
  };

  return (
    <div className="bg-white mx-auto min-w-[340px] w-[90%] max-w-[1024px] h-full">
      <Script
        id="Article Schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>{" "}
      <Script
        id="Faq Schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
      <div className="w-full px-4 py-2 border-b border-gray-300/30 flex flex-wrap items-center justify-start">
        <Link href={"/"} className="text-xs text-gray-500 underline">
          Home
        </Link>
        <span className="text-xs mx-1">/</span>
        <Link
          href={`/article/${query}`}
          className="text-xs text-gray-500 underline"
        >
          {blog.title}
        </Link>
      </div>
      <div>
        <div className="padding">
          <h1 className="text-xl leading-[1.2em] sm:text-3xl md:text-4xl md:leading-[1.5em] font-bold text-left text-gray-700 py-4">
            {blog.title}
          </h1>
        </div>
        <Separator />
        <TableContent headings={blogHeadings as any} />
        <ArticleView
          blogData={blog.blog as string}
          faqData={blog.faq as string}
        />
      </div>
    </div>
  );
};

export default BlogPostPage;
