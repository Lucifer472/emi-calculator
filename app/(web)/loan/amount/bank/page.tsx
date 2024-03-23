import ArticleView from "@/components/views/article-view";
import SelectBank from "@/components/views/select-bank";
import { getBlogFromUrl } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const BankPage = async () => {
  const data = await getBlogFromUrl("new-car-loan-emi-calculator");
  return (
    <div className="w-full h-full">
      <div className="min-w-[320px] w-full sm:w-[90%] max-w-[1024px] px-2 mx-auto flex items-center justify-center flex-col">
        <h2
          className={cn(
            "text-base xx:text-lg sm:text-xl font-[600] mb-4 text-center px-4 py-2 w-full bg-gray-700 text-white rounded",
            poppins.className
          )}
        >
          Please Select Bank
        </h2>
        <SelectBank />
        {data && (
          <ArticleView
            blogData={data.blog as string}
            faqData={data.faq as string}
          />
        )}
      </div>
    </div>
  );
};

export default BankPage;
