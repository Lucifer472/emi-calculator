import { CategoryBox } from "@/components/etc/category-box";
import { getBlogsByCat } from "@/lib/blog";
import NoArticleFound from "@/components/views/no-article";
import ArticleListView from "@/components/views/article-list-view";
import { Pagination } from "@/components/etc/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Loan - Categories",
  robots: {
    index: true,
    follow: true,
  },
};

const ArticlePage = async ({ searchParams }: { searchParams: any }) => {
  const searchPage = parseInt(searchParams.page);
  const page = isNaN(searchPage) ? 1 : searchPage;
  const category = "personal";

  const data = await getBlogsByCat(category, page);
  if (!data) return;

  return (
    <div className="min-w-[340px] w-[90%] max-w-[1024px] mx-auto flex flex-col items-start justify-start">
      <div className="flex items-center justify-between w-full pb-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold">Articles</h2>
        <CategoryBox category={category} />
      </div>
      <div className="w-full flex flex-col items-start gap-y-4 my-2">
        {data.length > 0 ? (
          data.map((item, index) => <ArticleListView key={index} item={item} />)
        ) : (
          <NoArticleFound />
        )}
        {data.length > 0 && (
          <Pagination isBack={page > 1} isNext={data.length < 10} page={page} />
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
