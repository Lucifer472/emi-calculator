import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const NoArticleFound = () => {
  return (
    <div className="w-full min-h-[700px] flex flex-col items-center justify-center gap-y-4 sm:gap-y-8">
      <h2 className={cn("text-lg md:text-xl lg:text-4xl", poppins.className)}>
        No Article Found
      </h2>
      <Link
        href={"/"}
        className="flex items-center justify-center px-12 py-2 bg-[#0072aa] rounded-md hover:bg-green-700 text-white"
      >
        GO BACK
      </Link>
    </div>
  );
};

export default NoArticleFound;
