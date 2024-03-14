import { redirect } from "next/navigation";
import { getBlogFromUrl } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import TableContent from "@/components/etc/table-content";
import { Separator } from "@/components/ui/separator";
import ArticleView from "@/components/views/article-view";

const BlogPostPage = async ({ params }: { params: { query: string } }) => {
  const query = params.query;

  const blog = await getBlogFromUrl(query);

  if (!blog) return redirect("/");
  const { blocks } = JSON.parse(blog.blog as string);

  const blogHeadings = blocks.filter((b: any) => b.type === "header");

  return (
    <div className="bg-white mx-auto min-w-[340px] w-[90%] max-w-[1024px] h-full">
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
