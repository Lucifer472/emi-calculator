import Link from "next/link";
import dynamic from "next/dynamic";

import ArticleView from "@/components/views/article-view";
import EmiBreakdown from "@/components/views/breakdown";
import { getBlogFromUrl } from "@/lib/blog";

import { Button } from "@/components/ui/button";

const EmploymentSelectPage = async () => {
  const data = await getBlogFromUrl("new-car-loan-emi-calculator");

  const EmiYearWiseData = dynamic(
    () => import("@/components/views/emi-year-wise-table"),
    {
      ssr: false,
    }
  );

  return (
    <div className="w-full h-full">
      <div className="min-w-[320px] w-full sm:w-[90%] max-w-[1024px] px-2 mx-auto flex items-center justify-center flex-col">
        <EmiBreakdown />
        <Button className="w-full mt-2" asChild>
          <Link href={"/loan/amount/bank"}>Confirm Loan info</Link>
        </Button>
        <EmiYearWiseData isOpen />
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
export default EmploymentSelectPage;
