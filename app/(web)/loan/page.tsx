import { Poppins } from "next/font/google";

import ArticleView from "@/components/views/article-view";

import { getBlogFromUrl } from "@/lib/blog";
import { cn } from "@/lib/utils";
import SelectLoanType from "@/components/views/select-loan";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LoanPage = async () => {
  const data = await getBlogFromUrl("new-car-loan-emi-calculator");
  return (
    <div className="w-full h-full pb-4">
      <div className="min-w-[320px] w-full sm:w-[90%] max-w-[1024px] mx-auto flex items-center justify-center flex-col px-2">
        <h2
          className={cn(
            "text-base xx:text-lg sm:text-xl font-[600] mb-4 text-center px-4 py-2 w-full bg-gray-700 text-white rounded",
            poppins.className
          )}
        >
          Please Select Loan Type
        </h2>
        <SelectLoanType />
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

export default LoanPage;
