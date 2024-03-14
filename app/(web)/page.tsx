import dynamic from "next/dynamic";

import ArticleView from "@/components/views/article-view";
import { getBlogFromUrl } from "@/lib/blog";
import PageTitle from "@/components/etc/title";
import { principleStopPoints1 } from "@/constant";

export default async function Home() {
  const EmiCalculator = dynamic(
    () => import("@/components/views/emi-calculator"),
    {
      ssr: false,
    }
  );

  const EmiBreakdown = dynamic(() => import("@/components/views/breakdown"), {
    ssr: false,
  });

  const EmiYearWiseData = dynamic(
    () => import("@/components/views/emi-year-wise-table"),
    {
      ssr: false,
    }
  );

  const data = await getBlogFromUrl("how-to-use-loan-emi-calcaluator");

  if (!data) {
    return;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-4">
      <div className="min-w-[340px] w-[90%] max-w-[1024px] bg-background mx-auto border-border border p-2 sm:px-4 sm:py-6 rounded-md bg-gray-100 mb-6">
        <PageTitle title="EMI Calculator for Home Loan in India" />
        <EmiCalculator maxPri={30000000} marks={principleStopPoints1} />
        <EmiBreakdown />
        <EmiYearWiseData />
      </div>
      {data && (
        <ArticleView
          blogData={data.blog as string}
          faqData={data.faq as string}
        />
      )}
    </div>
  );
}